<script setup>
import { lang, setLang, t } from '../i18n.js'
import { business, telLink, primaryPhone, formatPhone } from '../data/business.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">
        <img
          src="/logo.png"
          alt="HI Tech Open Well Contractor logo"
          class="logo-img"
          width="40"
          height="40"
        />
        <span class="logo-text">{{ business.name }}</span>
      </RouterLink>

      <nav class="header-nav" :aria-label="t('a11y.mainNav')">
        <RouterLink to="/#areas">{{ t('nav.areas') }}</RouterLink>
        <RouterLink to="/contact">{{ t('nav.contact') }}</RouterLink>
        <a :href="telLink()" class="header-phone">
          <AppIcon name="phone" :size="18" />
          {{ formatPhone(primaryPhone) }}
        </a>
      </nav>

      <div class="lang-toggle" role="group" :aria-label="t('langToggleLabel')">
        <button type="button" :aria-pressed="lang === 'en'" lang="en" @click="setLang('en')">
          EN
        </button>
        <button type="button" :aria-pressed="lang === 'ta'" lang="ta" @click="setLang('ta')">
          தமிழ்
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 1px 8px rgba(31, 26, 20, 0.06);
  position: sticky;
  top: 0;
  z-index: 20;
}
.header-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 64px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  text-decoration: none;
  font-family: var(--font-head);
  font-weight: 700;
  line-height: 1.15;
  min-height: 44px;
  margin-right: auto;
}
.logo-img {
  flex: none;
  display: block;
  height: 40px;
  width: auto;
  border-radius: 6px;
}
.logo-text {
  font-size: 1rem;
  max-width: 13ch;
}
.header-nav {
  display: none;
  align-items: center;
  gap: 4px;
}
.header-nav a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 12px;
  color: var(--ink);
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.header-nav a:hover {
  background: var(--sand);
  color: var(--blue);
}
.header-phone {
  color: var(--blue) !important;
  font-weight: 600 !important;
}
.lang-toggle {
  display: flex;
  border: 1.5px solid var(--blue);
  border-radius: 999px;
  overflow: hidden;
  flex: none;
}
.lang-toggle button {
  min-height: 40px;
  min-width: 52px;
  padding: 0 12px;
  border: 0;
  background: transparent;
  color: var(--blue);
  font: inherit;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
}
.lang-toggle button[aria-pressed='true'] {
  background: var(--blue);
  color: #fff;
}
@media (min-width: 560px) {
  .logo-text {
    max-width: none;
    font-size: 1.1rem;
  }
}
@media (min-width: 900px) {
  .logo-img {
    height: 48px;
  }
  .header-nav {
    display: flex;
  }
}
</style>
