<script setup>
import { ref, watch, onMounted } from 'vue'
import { t } from '../i18n.js'
import { telLink, waLink } from '../data/business.js'
import { useScrollState, heroVisible } from '../motion.js'
import AppIcon from './AppIcon.vue'

// Slides up once the hero is scrolled past (straight away on pages without one),
// tucks away while scrolling down fast, and comes back on any scroll up.
const { scrollDelta } = useScrollState()
const tucked = ref(false)
const ready = ref(false)
onMounted(() => (ready.value = true))
watch(scrollDelta, (d) => {
  if (d > 24) tucked.value = true // ~1400 px/s
  else if (d < -4) tucked.value = false
})
</script>

<template>
  <!-- hidden only via html.js, so without scripts the bar simply stays visible -->
  <div :class="['mobile-bar', { 'is-ready': ready, 'is-hidden': heroVisible || tucked }]">
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
  box-shadow: 0 -6px 20px rgba(31, 26, 20, 0.08);
  transition:
    transform var(--dur-slow) var(--ease),
    opacity var(--dur-slow) var(--ease);
}
/* The hidden state depends on html.js / .has-hero, so it lives in main.css. */
.bar-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  color: #fff;
  -webkit-tap-highlight-color: transparent;
  transition: transform var(--dur-fast) var(--ease);
}
.bar-btn:active {
  transform: scale(0.97);
}
.bar-call {
  background: var(--blue);
}
.bar-wa {
  background: var(--wa);
}
/* soft pulse ring every few seconds */
.bar-wa::after {
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
@media (min-width: 768px) {
  .mobile-bar {
    display: none;
  }
}
</style>
