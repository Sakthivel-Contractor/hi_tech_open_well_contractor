<script setup>
import { computed, reactive, ref, useId } from 'vue'
import { t, pick } from '../i18n.js'
import { states } from '../data/areas.js'
import { business, primaryPhone, formatPhone, telLink } from '../data/business.js'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  // English district name to preselect, e.g. "Coimbatore"
  district: { type: String, default: '' },
})

const WORK_TYPES = ['borewell', 'openwell', 'repair', 'survey']
const OTHER = 'Other Tamil Nadu district'
const ENDPOINT = 'https://api.web3forms.com/submit'
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

const id = useId()
const form = reactive({
  name: '',
  phone: '',
  district: props.district,
  work: 'borewell',
  message: '',
})
const errors = reactive({ name: '', phone: '', district: '' })
const status = ref('idle') // idle | sending | success | error | notConfigured

const subject = computed(
  () => `New enquiry - ${business.name} website - ${form.district || 'District not selected'}`,
)
const phoneDisplay = formatPhone(primaryPhone)

// Accepts "98765 43210", "+91 9876543210", "09876543210". Returns 10 digits or ''.
function normalizePhone(value) {
  let digits = value.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return /^[6-9]\d{9}$/.test(digits) ? digits : ''
}

function validate() {
  errors.name = form.name.trim() ? '' : t('form.errNameRequired')
  errors.phone = normalizePhone(form.phone) ? '' : t('form.errPhone')
  errors.district = form.district ? '' : t('form.errDistrict')
  return !errors.name && !errors.phone && !errors.district
}

async function onSubmit(event) {
  if (status.value === 'sending') return
  if (!validate()) {
    const firstInvalid = event.target.querySelector('[aria-invalid="true"]')
    firstInvalid?.focus()
    return
  }

  const data = new FormData(event.target)
  // Honeypot: real people never tick this hidden box.
  if (data.get('botcheck')) {
    status.value = 'success'
    return
  }
  if (!accessKey) {
    status.value = 'notConfigured'
    return
  }

  status.value = 'sending'
  const payload = {
    access_key: accessKey,
    subject: subject.value,
    from_name: `${business.name} website`,
    name: form.name.trim(),
    phone: `+91 ${normalizePhone(form.phone)}`,
    district: form.district,
    work_type: WORK_EN[form.work],
    message: form.message.trim() || '-',
    page: typeof window !== 'undefined' ? window.location.href : '',
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json().catch(() => ({}))
    if (res.ok && json.success) {
      status.value = 'success'
      Object.assign(form, { name: '', phone: '', message: '', work: 'borewell' })
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  }
}

// Emails always go out in English so the office reads one format.
const WORK_EN = {
  borewell: 'New borewell',
  openwell: 'Open well',
  repair: 'Repair',
  survey: 'Water survey',
}
</script>

<template>
  <div class="enquiry">
    <div v-if="status === 'success'" class="notice notice-success" role="status" aria-live="polite">
      <AppIcon name="check" :size="28" />
      <div>
        <p class="notice-title">{{ t('form.success') }}</p>
        <button type="button" class="link-btn" @click="status = 'idle'">
          {{ t('form.another') }}
        </button>
      </div>
    </div>

    <form v-else novalidate @submit.prevent="onSubmit">
      <!-- Web3Forms fields -->
      <input type="hidden" name="subject" :value="subject" />
      <input
        type="checkbox"
        name="botcheck"
        class="hp"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />

      <div class="field">
        <label :for="`${id}-name`">{{ t('form.name') }} <span aria-hidden="true">*</span></label>
        <input
          :id="`${id}-name`"
          v-model="form.name"
          name="name"
          type="text"
          autocomplete="name"
          required
          :placeholder="t('form.namePlaceholder')"
          :aria-invalid="errors.name ? 'true' : 'false'"
          :aria-describedby="errors.name ? `${id}-name-err` : undefined"
        />
        <p v-if="errors.name" :id="`${id}-name-err`" class="field-error">{{ errors.name }}</p>
      </div>

      <div class="field">
        <label :for="`${id}-phone`">{{ t('form.phone') }} <span aria-hidden="true">*</span></label>
        <div class="phone-wrap">
          <span class="phone-prefix" aria-hidden="true">+91</span>
          <input
            :id="`${id}-phone`"
            v-model="form.phone"
            name="phone"
            type="tel"
            inputmode="numeric"
            autocomplete="tel-national"
            maxlength="14"
            required
            :placeholder="t('form.phonePlaceholder')"
            :aria-invalid="errors.phone ? 'true' : 'false'"
            :aria-describedby="errors.phone ? `${id}-phone-err` : undefined"
          />
        </div>
        <p v-if="errors.phone" :id="`${id}-phone-err`" class="field-error">{{ errors.phone }}</p>
      </div>

      <div class="field">
        <label :for="`${id}-district`">{{ t('form.district') }} <span aria-hidden="true">*</span></label>
        <select
          :id="`${id}-district`"
          v-model="form.district"
          name="district"
          required
          :aria-invalid="errors.district ? 'true' : 'false'"
          :aria-describedby="errors.district ? `${id}-district-err` : undefined"
        >
          <option value="" disabled>{{ t('form.districtPlaceholder') }}</option>
          <optgroup v-for="s in states" :key="s.slug" :label="pick(s.name)">
            <option v-for="d in s.districts" :key="d.slug" :value="d.name.en">
              {{ pick(d.name) }}
            </option>
          </optgroup>
          <option :value="OTHER">{{ t('form.otherDistrict') }}</option>
        </select>
        <p v-if="errors.district" :id="`${id}-district-err`" class="field-error">
          {{ errors.district }}
        </p>
      </div>

      <fieldset class="field">
        <legend>{{ t('form.work') }}</legend>
        <div class="work-options">
          <label v-for="w in WORK_TYPES" :key="w" class="work-option">
            <input v-model="form.work" type="radio" :name="`${id}-work`" :value="w" />
            <span>{{ t('form.works.' + w) }}</span>
          </label>
        </div>
      </fieldset>

      <div class="field">
        <label :for="`${id}-message`">{{ t('form.message') }}</label>
        <textarea
          :id="`${id}-message`"
          v-model="form.message"
          name="message"
          rows="3"
          :placeholder="t('form.messagePlaceholder')"
        ></textarea>
      </div>

      <div
        v-if="status === 'error' || status === 'notConfigured'"
        class="notice notice-error"
        role="alert"
      >
        <AppIcon name="alert" :size="24" />
        <div>
          <p class="notice-title">
            {{ t(status === 'error' ? 'form.error' : 'form.notConfigured', { phone: phoneDisplay }) }}
          </p>
          <a :href="telLink()" class="btn btn-small btn-blue">
            <AppIcon name="phone" :size="18" />
            {{ phoneDisplay }}
          </a>
        </div>
      </div>

      <button type="submit" class="btn btn-red btn-block" :disabled="status === 'sending'">
        <span v-if="status === 'sending'" class="spinner" aria-hidden="true"></span>
        {{ status === 'sending' ? t('form.sending') : t('form.submit') }}
      </button>
      <p class="privacy-line">{{ t('form.privacyLine') }}</p>
    </form>
  </div>
</template>

<style scoped>
.enquiry {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}
.field {
  margin: 0 0 18px;
  padding: 0;
  border: 0;
  min-width: 0;
}
label,
legend {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  padding: 0;
}
input[type='text'],
input[type='tel'],
select,
textarea {
  width: 100%;
  min-height: 52px;
  padding: 12px 14px;
  border: 1.5px solid #c9bda9;
  border-radius: 10px;
  background: #fff;
  color: var(--ink);
  font: inherit;
  font-size: 1.05rem;
}
textarea {
  min-height: 96px;
  resize: vertical;
}
input:focus,
select:focus,
textarea:focus {
  outline: 3px solid rgba(23, 83, 122, 0.25);
  border-color: var(--blue);
}
[aria-invalid='true'] {
  border-color: var(--red) !important;
}
.phone-wrap {
  display: flex;
  align-items: stretch;
}
.phone-prefix {
  display: grid;
  place-items: center;
  padding: 0 12px;
  border: 1.5px solid #c9bda9;
  border-right: 0;
  border-radius: 10px 0 0 10px;
  background: var(--sand);
  font-weight: 600;
}
.phone-wrap input {
  border-radius: 0 10px 10px 0;
}
.field-error {
  margin: 6px 0 0;
  color: var(--red);
  font-weight: 500;
  font-size: 0.95rem;
}
.work-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.work-option {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  margin: 0;
  padding: 8px 12px;
  border: 1.5px solid #c9bda9;
  border-radius: 10px;
  background: #fff;
  font-weight: 500;
  cursor: pointer;
  line-height: 1.25;
}
.work-option:has(input:checked) {
  border-color: var(--blue);
  background: #e6eff5;
}
.work-option input {
  flex: none;
  width: 20px;
  height: 20px;
  accent-color: var(--blue);
  margin: 0;
}
.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.privacy-line {
  margin: 10px 0 0;
  text-align: center;
  font-size: 0.92rem;
  color: var(--muted);
}
.notice {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  border-radius: 10px;
}
.notice-title {
  margin: 0 0 10px;
  font-weight: 600;
}
.notice-success {
  background: #e3f0e6;
  color: #1d5a2c;
}
.notice-error {
  margin-bottom: 16px;
  background: #f7e4dc;
  color: #6e2f13;
}
.link-btn {
  min-height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
}
.spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@media (min-width: 560px) {
  .enquiry {
    padding: 28px;
  }
}
</style>
