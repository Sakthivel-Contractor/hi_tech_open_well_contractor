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
    transition:
      background-color var(--dur-fast) var(--ease),
      transform var(--dur-fast) var(--ease),
      opacity 160ms var(--ease);
  }
  .wa-float:hover {
    background: var(--wa-dark);
    transform: translateY(-2px);
  }
  .wa-float:active {
    transform: scale(0.97);
  }
  /* soft pulse ring every few seconds */
  .wa-float::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 0 0 2px var(--wa);
    opacity: 0;
    pointer-events: none;
    animation: wa-pulse 4s var(--ease) 2s infinite;
  }
  @keyframes wa-pulse {
    0% {
      opacity: 0.7;
      transform: scale(1);
    }
    35%,
    100% {
      opacity: 0;
      transform: scale(1.12, 1.35);
    }
  }
}
</style>
