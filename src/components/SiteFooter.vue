<script setup>
import { t, pick } from '../i18n.js'
import { business, telLink, waLink, formatPhone } from '../data/business.js'
import AppIcon from './AppIcon.vue'

const year = new Date().getFullYear()
const services = ['openwell', 'deepening', 'wall', 'cleaning', 'survey']
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <span class="footer-logo">
          <img
            src="/logo.png"
            alt="HI Tech Open Well Contractor logo"
            width="48"
            height="48"
            loading="lazy"
          />
        </span>
        <p class="footer-name">{{ business.name }}</p>
        <p class="footer-tagline">{{ t('tagline') }}</p>
        <p class="footer-address">
          <AppIcon name="pin" :size="18" />
          <a :href="business.mapUrl" target="_blank" rel="noopener" class="link-grow">{{ pick(business.address) }}</a>
        </p>
      </div>

      <nav class="footer-col" :aria-label="t('footer.quickLinks')">
        <p class="footer-heading">{{ t('footer.quickLinks') }}</p>
        <ul>
          <li><RouterLink to="/" class="link-grow">{{ t('nav.home') }}</RouterLink></li>
          <li><RouterLink to="/#services" class="link-grow">{{ t('nav.services') }}</RouterLink></li>
          <li><RouterLink to="/#areas" class="link-grow">{{ t('nav.areas') }}</RouterLink></li>
          <li><RouterLink to="/contact" class="link-grow">{{ t('nav.contact') }}</RouterLink></li>
          <li><RouterLink to="/privacy" class="link-grow">{{ t('footer.privacy') }}</RouterLink></li>
        </ul>
      </nav>

      <div class="footer-col">
        <p class="footer-heading">{{ t('footer.services') }}</p>
        <ul>
          <li v-for="key in services" :key="key">
            <RouterLink to="/#services" class="link-grow">{{ t(`services.${key}.name`) }}</RouterLink>
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <p class="footer-heading">{{ t('footer.contact') }}</p>
        <ul class="footer-contact">
          <li>
            <AppIcon name="phone" :size="18" />
            <span>
              <span class="label">{{ t('footer.phone') }}</span>
              <template v-for="(num, i) in business.phones" :key="num">
                <a :href="telLink(num)" class="link-grow">{{ formatPhone(num) }}</a><br v-if="i < business.phones.length - 1" />
              </template>
            </span>
          </li>
          <li>
            <AppIcon name="whatsapp" :size="18" />
            <span>
              <span class="label">{{ t('footer.whatsapp') }}</span>
              <template v-for="(num, i) in business.whatsapp" :key="num">
                <a :href="waLink(num)" target="_blank" rel="noopener" class="link-grow">{{ formatPhone(num) }}</a><br v-if="i < business.whatsapp.length - 1" />
              </template>
            </span>
          </li>
          <li>
            <AppIcon name="mail" :size="18" />
            <span>
              <span class="label">{{ t('footer.email') }}</span>
              <a :href="`mailto:${business.email}`" class="email link-grow">{{ business.email }}</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; {{ year }} {{ business.name }}. {{ t('footer.rights') }}</span>
      <RouterLink to="/privacy" class="link-grow">{{ t('footer.privacy') }}</RouterLink>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--ink);
  color: #e9e2d6;
  padding: 56px 0 96px;
}
.footer-grid {
  display: grid;
  gap: 36px;
}
.footer-name {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25;
  color: #fff;
  margin: 0 0 12px;
}
/* White rounded box so the logo's white background reads cleanly on the dark footer. */
.footer-logo {
  display: inline-block;
  padding: 4px;
  margin-bottom: 12px;
  background: #fff;
  border-radius: 8px;
}
.footer-logo img {
  display: block;
  height: 48px;
  width: auto;
}
.footer-tagline {
  margin: 0 0 16px;
  color: #c9bfae;
  max-width: 36ch;
}
.footer-address {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin: 0;
}
.footer-heading {
  margin: 0 0 14px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent-light);
}
.lang-ta .footer-heading {
  text-transform: none;
  letter-spacing: 0;
  font-size: 1rem;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
}
.footer-contact {
  gap: 14px;
}
.footer-contact li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.site-footer svg {
  flex: none;
  margin-top: 5px;
  color: var(--accent-light);
}
.label {
  display: block;
  font-size: 0.85rem;
  color: #a99e8c;
}
.site-footer a {
  color: #fff;
  text-decoration: none;
  display: inline-block;
  padding: 4px 0;
  transition: color var(--dur-fast) var(--ease);
}
.site-footer a:hover {
  color: var(--accent-light);
}
.email {
  word-break: break-all;
}
.footer-bottom {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #3a332a;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #a99e8c;
}
.footer-bottom a {
  color: #c9bfae;
}
@media (min-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 768px) {
  .site-footer {
    padding-bottom: 40px;
  }
}
@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
    gap: 40px;
  }
}
</style>
