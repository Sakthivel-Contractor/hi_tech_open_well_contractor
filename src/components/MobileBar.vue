<script setup>
import { t } from '../i18n.js'
import { telLink, waLink } from '../data/business.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <div class="mobile-bar">
    <a :href="telLink()" class="bar-btn bar-call">
      <AppIcon name="phone" :size="22" />
      {{ t('mobileBar.call') }}
    </a>
    <a :href="waLink()" class="bar-btn bar-wa" target="_blank" rel="noopener">
      <AppIcon name="whatsapp" :size="22" />
      {{ t('mobileBar.whatsapp') }}
    </a>
  </div>
</template>

<style scoped>
.mobile-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 8px 12px calc(8px + env(safe-area-inset-bottom));
  background: var(--surface);
  border-top: 1px solid var(--line);
}
.bar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  color: #fff;
}
.bar-call {
  background: var(--blue);
}
.bar-wa {
  background: var(--wa);
}
@media (min-width: 768px) {
  .mobile-bar {
    display: none;
  }
}
</style>
