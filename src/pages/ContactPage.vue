<script setup>
import { t, tMeta, pick } from '../i18n.js'
import { business, telLink, waLink, formatPhone } from '../data/business.js'
import { usePageMeta } from '../composables/usePageMeta.js'
import AppIcon from '../components/AppIcon.vue'
import EnquiryForm from '../components/EnquiryForm.vue'

usePageMeta({
  title: tMeta('meta.contactTitle'),
  description: tMeta('meta.contactDesc'),
  path: '/contact',
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h1>{{ t('contact.title') }}</h1>
      <p class="section-intro">{{ t('contact.intro') }}</p>

      <div class="contact-grid">
        <ul class="contact-list">
          <li v-for="(num, i) in business.phones" :key="`tel-${num}`" v-reveal="i">
            <a :href="telLink(num)" class="contact-card">
              <span class="icon icon-blue"><AppIcon name="phone" /></span>
              <span>
                <span class="label">{{ t('footer.phone') }}</span>
                <span class="value">{{ formatPhone(num) }}</span>
              </span>
            </a>
          </li>
          <li v-for="(num, i) in business.whatsapp" :key="`wa-${num}`" v-reveal="business.phones.length + i">
            <a :href="waLink(num)" class="contact-card" target="_blank" rel="noopener">
              <span class="icon icon-wa"><AppIcon name="whatsapp" /></span>
              <span>
                <span class="label">{{ t('footer.whatsapp') }}</span>
                <span class="value">{{ formatPhone(num) }}</span>
              </span>
            </a>
          </li>
          <li v-reveal="business.phones.length + business.whatsapp.length">
            <a :href="`mailto:${business.email}`" class="contact-card">
              <span class="icon icon-red"><AppIcon name="mail" /></span>
              <span>
                <span class="label">{{ t('footer.email') }}</span>
                <span class="value value-small">{{ business.email }}</span>
              </span>
            </a>
          </li>
          <li v-reveal="business.phones.length + business.whatsapp.length + 1">
            <a :href="business.mapUrl" class="contact-card" target="_blank" rel="noopener">
              <span class="icon icon-red"><AppIcon name="map" /></span>
              <span>
                <span class="label">{{ t('contact.office') }}</span>
                <span class="value value-small">{{ pick(business.address) }}</span>
                <span class="map-link">{{ t('contact.map') }}</span>
              </span>
            </a>
          </li>
        </ul>

        <div v-reveal="2">
          <h2 class="form-title">{{ t('enquiryTitle') }}</h2>
          <EnquiryForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 {
  margin: 0 0 8px;
  font-size: var(--fs-h1);
}
.lang-ta h1 {
  font-size: var(--fs-h1-ta);
}
.contact-grid {
  display: grid;
  gap: 32px;
}
.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  align-content: start;
}
.contact-card {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 72px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--ink);
  text-decoration: none;
  position: relative;
  isolation: isolate;
  -webkit-tap-highlight-color: transparent;
  transition:
    border-color var(--dur-fast) var(--ease),
    transform var(--dur-fast) var(--ease);
}
/* hover shadow on its own layer, faded in */
.contact-card::after {
  content: '';
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  box-shadow: var(--shadow-md);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-fast) var(--ease);
}
.contact-card:hover {
  border-color: var(--blue);
  transform: translateY(-2px);
}
.contact-card:hover::after {
  opacity: 1;
}
.contact-card:active {
  transform: scale(0.98);
}
.icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  color: #fff;
}
.icon-blue {
  background: var(--blue);
}
.icon-wa {
  background: var(--wa);
}
.icon-red {
  background: var(--red);
}
.label {
  display: block;
  font-size: 0.9rem;
  color: var(--muted);
}
.value {
  display: block;
  font-weight: 600;
  font-size: 1.2rem;
  word-break: break-word;
}
.value-small {
  font-size: 1.02rem;
}
.map-link {
  display: block;
  margin-top: 2px;
  color: var(--blue);
  text-decoration: underline;
  font-size: 0.95rem;
}
.form-title {
  font-size: 1.5rem;
  margin: 0 0 16px;
}
@media (min-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr 1.2fr;
    gap: 48px;
  }
}
</style>
