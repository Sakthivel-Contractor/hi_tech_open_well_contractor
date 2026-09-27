<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { initLang, lang, t } from './i18n.js'
import { findDistrict } from './data/areas.js'
import { pageEntered } from './motion.js'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import CtaBand from './components/CtaBand.vue'
import MobileBar from './components/MobileBar.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'

// <html lang> follows the language switch; pre-rendered pages get the default (ta).
useHead({ htmlAttrs: { lang } })

const route = useRoute()
// Pages that open with a dark photo hero: the header sits transparent on top of it.
const hasHero = computed(
  () =>
    route.name === 'home' ||
    (route.name === 'district' && !!findDistrict(route.params.state, route.params.district)),
)

onMounted(() => {
  initLang()
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
