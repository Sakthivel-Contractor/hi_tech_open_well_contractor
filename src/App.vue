<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { initLang, lang, t } from './i18n.js'
import { findDistrict } from './data/areas.js'
import { pageEntered, scanReveals } from './motion.js'
import tamil600 from './assets/fonts/hind-madurai-600-tamil.woff2?url'
import tamil400 from './assets/fonts/hind-madurai-400-tamil.woff2?url'
import latin600 from './assets/fonts/hind-madurai-600-latin.woff2?url'
import logoFont from './assets/fonts/bricolage-700-latin.woff2?url'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import CtaBand from './components/CtaBand.vue'
import MobileBar from './components/MobileBar.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'

// <html lang> follows the language switch; pre-rendered pages get the default (ta).
useHead({
  htmlAttrs: { lang },
  // Preload only the fonts on the first screen (Tamil hero heading + text, the phone number,
  // the logo), so the first layout already has them: laying out Tamil text in a system
  // fallback first and again after the swap measurably delayed the first paint. The other
  // weights (Tamil/Latin 500, Latin 400) are below the fold and load on demand via fonts.css.
  link: [tamil600, tamil400, latin600, logoFont].map((href) => ({
    rel: 'preload',
    as: 'font',
    type: 'font/woff2',
    href,
    crossorigin: '',
  })),
})

const route = useRoute()
// Pages that open with a dark photo hero: the header sits transparent on top of it.
const hasHero = computed(
  () =>
    route.name === 'home' ||
    (route.name === 'district' && !!findDistrict(route.params.state, route.params.district)),
)

onMounted(() => {
  initLang()
  scanReveals()
  window.__appReady = true
})
</script>

<template>
  <div :class="['app', `lang-${lang}`, { 'has-hero': hasHero }]">
    <a class="skip-link" href="#main">{{ t('skipToContent') }}</a>
    <SiteHeader :over-hero="hasHero" />
    <main id="main">
      <RouterView v-slot="{ Component, route: viewRoute }">
        <Transition name="page" mode="out-in" @enter="pageEntered">
          <!-- keyed by path so district pages remount (and update their meta) when switching districts -->
          <div :key="viewRoute.path" class="page">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
    </main>
    <CtaBand v-if="$route.name !== 'not-found'" />
    <SiteFooter />
    <MobileBar />
    <WhatsAppFloat />
  </div>
</template>
