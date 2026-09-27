<script setup>
import { computed } from 'vue'
import { lang, setLang, t } from '../i18n.js'
import { business, telLink, primaryPhone, formatPhone } from '../data/business.js'
import { useScrollState, prefersReducedMotion } from '../motion.js'
import { logo } from '../data/photos.js'
import AppIcon from './AppIcon.vue'
import SectionLink from './SectionLink.vue'

// ~2.5 KB WebP inlined into the page (no extra request); the PNG only if it was not built.
const logoSrc = logo?.src ?? '/logo.png'

const props = defineProps({
  // true on pages that open with a dark photo hero (home, district pages)
  overHero: { type: Boolean, default: false },
})

const { scrollY } = useScrollState()
const scrolled = computed(() => scrollY.value > 24)
// Transparent only while resting on top of a hero; solid everywhere else.
const transparent = computed(() => props.overHero && !scrolled.value)

// Page text dips out, switches language, and fades back in.
let switching = false
function switchLang(value) {
  if (value === lang.value || switching) return
  const root = document.documentElement
  if (prefersReducedMotion()) return setLang(value)
  switching = true
  root.classList.add('lang-fade')
  setTimeout(() => {
    setLang(value)
    requestAnimationFrame(() => {
      root.classList.remove('lang-fade')
      switching = false
    })
  }, 160)
}
</script>

<template>
  <header :class="['site-header', { 'is-transparent': transparent, 'is-condensed': scrolled }]">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">
        <img
          :src="logoSrc"
          alt="HI Tech Open Well Contractor logo"
          class="logo-img"
          width="40"
          height="40"
        />
        <span class="logo-text">{{ business.name }}</span>
      </RouterLink>

      <nav class="header-nav" :aria-label="t('a11y.mainNav')">
        <SectionLink section="areas" class="nav-link">{{ t('nav.areas') }}</SectionLink>
        <RouterLink to="/contact" class="nav-link">{{ t('nav.contact') }}</RouterLink>
        <a :href="telLink()" class="nav-link header-phone">
          <AppIcon name="phone" :size="18" />
          {{ formatPhone(primaryPhone) }}
        </a>
      </nav>

      <div
        :class="['lang-toggle', { 'is-ta': lang === 'ta' }]"
        role="group"
        :aria-label="t('langToggleLabel')"
      >
        <span class="lang-pill" aria-hidden="true"></span>
        <button type="button" :aria-pressed="lang === 'en'" lang="en" @click="switchLang('en')">
          EN
        </button>
        <button type="button" :aria-pressed="lang === 'ta'" lang="ta" @click="switchLang('ta')">
          தமிழ்
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* The header box never changes size (no layout shift). The solid background is a layer
   that fades in and shrinks from the bottom, and the content moves up with it. */
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  height: var(--header-h);
  color: var(--ink);
}
.site-header::before,
.site-header::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  transform-origin: top;
  transition:
    opacity var(--dur-fast) var(--ease),
    transform var(--dur-slow) var(--ease);
}
.site-header::before {
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}
/* soft shadow, only once scrolled */
.site-header::after {
  box-shadow: var(--shadow-md);
  opacity: 0;
}
.site-header.is-condensed::before,
.site-header.is-condensed::after {
  transform: scaleY(var(--header-shrink));
}
.site-header.is-condensed::after {
  opacity: 1;
}
.site-header.is-transparent::before {
  opacity: 0;
}
.header-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
  transition: transform var(--dur-slow) var(--ease);
}
.is-condensed .header-inner {
  /* centre the content in the shrunk bar */
  transform: translateY(calc(var(--header-h) * (var(--header-shrink) - 1) / 2));
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit;
  text-decoration: none;
  font-family: var(--font-head);
  font-weight: 700;
  line-height: 1.15;
  min-height: 44px;
  margin-right: auto;
  transition: color var(--dur-fast) var(--ease);
}
.logo-img {
  flex: none;
  display: block;
  height: 40px;
  width: auto;
  border-radius: var(--radius-xs);
  transform-origin: left center;
  transition: transform var(--dur-slow) var(--ease);
}
.is-condensed .logo-img {
  transform: scale(0.9);
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
.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 12px;
  color: var(--ink);
  text-decoration: none;
  font-weight: 500;
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease);
}
/* underline grows left to right */
.nav-link::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 8px;
  height: 2px;
  border-radius: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-fast) var(--ease);
}
.nav-link:hover {
  color: var(--blue);
}
.nav-link:hover::after {
  transform: scaleX(1);
}
.header-phone {
  color: var(--blue);
  font-weight: 600;
}

/* Language switch: equal halves, a pill slides under the active one. */
.lang-toggle {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: none;
  border: 1.5px solid var(--blue);
  border-radius: var(--radius-pill);
  overflow: hidden;
  isolation: isolate;
  transition: border-color var(--dur-fast) var(--ease);
}
.lang-pill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 50%;
  border-radius: var(--radius-pill);
  background: var(--blue);
  transition:
    transform var(--dur-slow) var(--ease),
    background-color var(--dur-fast) var(--ease);
}
.lang-toggle.is-ta .lang-pill {
  transform: translateX(100%);
}
.lang-toggle button {
  min-height: 40px;
  min-width: 60px;
  padding: 0 12px;
  border: 0;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--blue);
  font: inherit;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color var(--dur-slow) var(--ease);
}
.lang-toggle button[aria-pressed='true'] {
  color: #fff;
}

/* Transparent over the dark hero photo: light text, light switch. */
.is-transparent .logo,
.is-transparent .nav-link,
.is-transparent .header-phone {
  color: #fff;
}
.is-transparent .nav-link:hover {
  color: var(--accent-light);
}
.is-transparent .lang-toggle {
  border-color: rgba(255, 255, 255, 0.85);
}
.is-transparent .lang-pill {
  background: #fff;
}
.is-transparent .lang-toggle button {
  color: #fff;
}
.is-transparent .lang-toggle button[aria-pressed='true'] {
  color: var(--blue);
}
.is-transparent :focus-visible {
  outline-color: var(--accent-light);
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
