<script setup>
import { t } from '../i18n.js'
import { waLink } from '../data/business.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <a :href="waLink()" class="wa-float" target="_blank" rel="noopener" :aria-label="t('whatsappFloat')">
    <AppIcon name="whatsapp" :size="28" />
    <span class="wa-label">{{ t('whatsappFloat') }}</span>
  </a>
</template>

<style scoped>
.wa-float {
  display: none;
}
@media (min-width: 768px) {
  .wa-float {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 30;
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 56px;
    padding: 0 20px 0 16px;
    border-radius: 999px;
    background: var(--wa);
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 6px 18px rgba(31, 26, 20, 0.22);
  }
  .wa-float:hover {
    background: var(--wa-dark);
  }
}
</style>
