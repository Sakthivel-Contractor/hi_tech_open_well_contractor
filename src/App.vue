<script setup>
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { initLang, lang, t } from './i18n.js'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import CtaBand from './components/CtaBand.vue'
import MobileBar from './components/MobileBar.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'

// <html lang> follows the language switch; pre-rendered pages get the default (ta).
useHead({ htmlAttrs: { lang } })

onMounted(initLang)
</script>

<template>
  <div :class="['app', `lang-${lang}`]">
    <a class="skip-link" href="#main">{{ t('skipToContent') }}</a>
    <SiteHeader />
    <main id="main">
      <!-- keyed by path so district pages remount (and update their meta) when switching districts -->
      <RouterView :key="$route.path" />
    </main>
    <CtaBand v-if="$route.name !== 'not-found'" />
    <SiteFooter />
    <MobileBar />
    <WhatsAppFloat />
  </div>
</template>
