<script setup>
import { computed, reactive, ref, useId } from 'vue'
import { t, pick } from '../i18n.js'
import { states } from '../data/areas.js'
import { business, primaryPhone, formatPhone, telLink } from '../data/business.js'
import { prefersReducedMotion } from '../motion.js'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  // English district name to preselect, e.g. "Coimbatore"
  district: { type: String, default: '' },
})

const WORK_TYPES = ['openwell', 'deepening', 'wall', 'cleaning', 'survey']
const OTHER = 'Other Tamil Nadu district'
const ENDPOINT = 'https://api.web3forms.com/submit'
const TIMEOUT_MS = 10000
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

const id = useId()
const form = reactive({
  name: '',
  phone: '',
  district: props.district,
  work: 'openwell',
  message: '',
})
const errors = reactive({ name: '', phone: '', district: '' })
const status = ref('idle') // idle | sending | success | error | timeout | notConfigured
// Brief "sent" state: the submit button turns into a green tick before the thank-you note.
const sent = ref(false)

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

  // Give up after 10 s (slow or overloaded network) and show the phone number instead.
  // The filled-in fields are kept, so the visitor can simply press send again.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    const json = await res.json().catch(() => ({}))
    if (res.ok && json.success) {
      sent.value = true
      setTimeout(
        () => {
          sent.value = false
          status.value = 'success'
          Object.assign(form, { name: '', phone: '', message: '', work: 'openwell' })
        },
        prefersReducedMotion() ? 0 : 900,
      )
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = controller.signal.aborted ? 'timeout' : 'error'
  } finally {
    clearTimeout(timer)
  }
}

// Open the connection to Web3Forms once the visitor starts filling the form, so sending
// does not wait for DNS + TLS on a slow network. Not on page load: most visitors never send.
let warmed = false
function warmUp() {
  if (warmed) return
  warmed = true
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = new URL(ENDPOINT).origin
  link.crossOrigin = ''
  document.head.appendChild(link)
}

// Emails always go out in English so the office reads one format.
const WORK_EN = {
  openwell: 'New open well digging',
  deepening: 'Well deepening',
  wall: 'Well wall construction',
  cleaning: 'Old well cleaning & desilting',
  survey: 'Water point survey',
}
</script>

<template>
  <div class="enquiry">
    <Transition name="swap" mode="out-in">
    <div v-if="status === 'success'" class="notice notice-success" role="status" aria-live="polite">
      <AppIcon name="check" :size="28" />
      <div>
        <p class="notice-title">{{ t('form.success') }}</p>
        <button type="button" class="link-btn" @click="status = 'idle'">
          {{ t('form.another') }}
        </button>
      </div>
    </div>

    <form v-else novalidate @submit.prevent="onSubmit" @focusin.once="warmUp">
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

      <div :class="['field', 'float', { 'has-error': errors.name }]">
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
        <label :for="`${id}-name`" class="float-label">
          {{ t('form.name') }} <span aria-hidden="true">*</span>
        </label>
        <Transition name="drop">
          <p v-if="errors.name" :id="`${id}-name-err`" class="field-error">{{ errors.name }}</p>
        </Transition>
      </div>

      <div :class="['field', 'float', { 'has-error': errors.phone }]">
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
          <label :for="`${id}-phone`" class="float-label">
            {{ t('form.phone') }} <span aria-hidden="true">*</span>
          </label>
        </div>
        <Transition name="drop">
          <p v-if="errors.phone" :id="`${id}-phone-err`" class="field-error">{{ errors.phone }}</p>
        </Transition>
      </div>

      <div :class="['field', 'float', { 'has-error': errors.district }]">
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
        <label :for="`${id}-district`" class="float-label">
          {{ t('form.district') }} <span aria-hidden="true">*</span>
        </label>
        <Transition name="drop">
          <p v-if="errors.district" :id="`${id}-district-err`" class="field-error">
            {{ errors.district }}
          </p>
        </Transition>
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

      <div class="field float">
        <textarea
          :id="`${id}-message`"
          v-model="form.message"
          name="message"
          rows="3"
          :placeholder="t('form.messagePlaceholder')"
        ></textarea>
        <label :for="`${id}-message`" class="float-label">{{ t('form.message') }}</label>
      </div>

      <Transition name="drop">
      <div
        v-if="status === 'error' || status === 'timeout' || status === 'notConfigured'"
        class="notice notice-error"
        role="alert"
      >
        <AppIcon name="alert" :size="24" />
        <div>
          <p class="notice-title">
            {{ t(`form.${status}`, { phone: phoneDisplay }) }}
          </p>
          <a :href="telLink()" class="btn btn-small btn-blue">
            <AppIcon name="phone" :size="18" />
            {{ phoneDisplay }}
          </a>
        </div>
      </div>
      </Transition>

      <button
        type="submit"
        :class="['btn', 'btn-red', 'btn-block', 'submit-btn', { 'is-sent': sent }]"
        :disabled="status === 'sending' || sent"
      >
        <span class="submit-label">
          <span v-if="status === 'sending'" class="spinner" aria-hidden="true"></span>
          {{ status === 'sending' ? t('form.sending') : t('form.submit') }}
        </span>
        <span class="submit-tick" aria-hidden="true"><AppIcon name="check" :size="28" /></span>
      </button>
      <p class="privacy-line">{{ t('form.privacyLine') }}</p>
    </form>
    </Transition>
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
  border-radius: var(--radius-md);
  background: #fff;
  color: var(--ink);
  font: inherit;
  font-size: 1.05rem;
  outline: 3px solid transparent;
  outline-offset: 0;
  transition:
    border-color var(--dur-fast) var(--ease),
    outline-color var(--dur-fast) var(--ease);
}
textarea {
  min-height: 96px;
  resize: vertical;
}
input:focus,
select:focus,
textarea:focus {
  outline: 3px solid rgba(23, 83, 122, 0.25);
  outline-offset: 0;
  border-color: var(--blue);
  animation: none;
}

/* Floating labels: the label rests inside the empty field and floats up onto the border
   on focus or once filled. Pure CSS (:placeholder-shown), so it works before JS loads. */
.float {
  position: relative;
}
.float-label {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  max-width: calc(100% - 24px);
  margin: 0;
  padding: 0 6px;
  border-radius: 4px;
  background: #fff;
  color: var(--muted);
  font-weight: 500;
  font-size: 1.05rem;
  line-height: 26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  transform-origin: left top;
  transform: translate(var(--label-x, 9px), 13px);
  transition:
    transform var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease);
}
.float input::placeholder,
.float textarea::placeholder {
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease);
}
.float input:focus::placeholder,
.float textarea:focus::placeholder {
  opacity: 1;
}
.float :is(input, textarea):focus + .float-label,
.float :is(input, textarea):not(:placeholder-shown) + .float-label,
.float select + .float-label {
  transform: translate(calc(var(--label-x, 9px) - 2px), -12px) scale(0.82);
  font-weight: 600;
  color: var(--ink);
}
.float :is(input, textarea, select):focus + .float-label {
  color: var(--blue);
}
.float [aria-invalid='true'] + .float-label {
  color: var(--red);
}

/* invalid field: one small horizontal shake */
.has-error {
  animation: shake 420ms var(--ease);
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-6px);
  }
  40% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(2px);
  }
}

/* error / notice messages slide down and fade in */
.drop-enter-active {
  transition:
    opacity var(--dur-slow) var(--ease),
    transform var(--dur-slow) var(--ease);
}
.drop-leave-active {
  transition: opacity var(--dur-fast) var(--ease);
}
.drop-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.drop-leave-to {
  opacity: 0;
}
/* form <-> thank-you note */
.swap-enter-active,
.swap-leave-active {
  transition:
    opacity var(--dur-fast) var(--ease),
    transform var(--dur-fast) var(--ease);
}
.swap-enter-active {
  transition-duration: var(--dur-slow);
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.swap-leave-to {
  opacity: 0;
}

/* submit: spinner while sending, then a green tick */
.submit-btn {
  overflow: hidden;
}
.submit-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition:
    opacity var(--dur-fast) var(--ease),
    transform var(--dur-fast) var(--ease);
}
.submit-tick {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: scale(0.4);
  transition:
    opacity var(--dur-fast) var(--ease),
    transform var(--dur-slow) var(--ease);
}
.submit-btn.is-sent {
  background: var(--wa);
  opacity: 1;
  cursor: default;
}
.submit-btn.is-sent .submit-label {
  opacity: 0;
  transform: translateY(-12px);
}
.submit-btn.is-sent .submit-tick {
  opacity: 1;
  transform: scale(1);
}
[aria-invalid='true'] {
  border-color: var(--red) !important;
}
.phone-wrap {
  display: flex;
  align-items: stretch;
}
.phone-wrap {
  position: relative;
  --label-x: 67px; /* clear the +91 box */
}
.phone-prefix {
  display: grid;
  place-items: center;
  flex: none;
  width: 58px;
  padding: 0;
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
  /* one column on narrow phones: the Tamil work names are single long words */
  grid-template-columns: minmax(0, 1fr);
  gap: 8px;
}
.work-option {
  transition:
    border-color var(--dur-fast) var(--ease),
    background-color var(--dur-fast) var(--ease);
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
  min-width: 0;
}
.work-option:hover {
  border-color: var(--blue);
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
  border-radius: var(--radius-md);
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
@media (min-width: 480px) {
  .work-options {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 560px) {
  .enquiry {
    padding: 28px;
  }
}
</style>
