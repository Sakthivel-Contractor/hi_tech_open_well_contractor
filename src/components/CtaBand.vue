<script setup>
import { t } from '../i18n.js'
import { telLink, waLink, primaryPhone, formatPhone } from '../data/business.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section class="cta-band">
    <div class="container cta-inner">
      <div v-reveal class="cta-copy">
        <h2>{{ t('cta.title') }}</h2>
        <p>{{ t('cta.text') }}</p>
      </div>
      <div v-reveal="2" class="cta-actions">
        <a :href="telLink()" class="btn btn-light">
          <AppIcon name="phone" :size="20" />
          {{ formatPhone(primaryPhone) }}
        </a>
        <a :href="waLink()" class="btn btn-ghost" target="_blank" rel="noopener">
          <AppIcon name="whatsapp" :size="20" />
          {{ t('cta.whatsapp') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-band {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: linear-gradient(120deg, var(--red) 0%, var(--red-dark) 100%);
  color: #fff;
  padding: 48px 0;
}
/* Very subtle water ripples: two rings patterns drifting slowly (transform only). */
.cta-band::before,
.cta-band::after {
  content: '';
  position: absolute;
  z-index: -1;
  width: 900px;
  height: 900px;
  border-radius: 50%;
  background: repeating-radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0) 0 22px,
    rgba(255, 255, 255, 0.07) 23px 25px,
    rgba(255, 255, 255, 0) 26px 46px
  );
  -webkit-mask-image: radial-gradient(circle, #000 20%, transparent 70%);
  mask-image: radial-gradient(circle, #000 20%, transparent 70%);
  pointer-events: none;
  animation: ripple 18s linear infinite;
}
.cta-band::before {
  left: -300px;
  top: -420px;
}
.cta-band::after {
  right: -360px;
  bottom: -520px;
  animation-duration: 24s;
  animation-direction: reverse;
}
@keyframes ripple {
  from {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.12) rotate(8deg);
  }
  to {
    transform: scale(1) rotate(0deg);
  }
}
.cta-inner {
  display: grid;
  gap: 24px;
  align-items: center;
}
h2 {
  margin: 0 0 8px;
  color: #fff;
  font-size: var(--fs-h2);
  line-height: 1.25;
}
.cta-copy p {
  margin: 0;
  max-width: 56ch;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.08rem;
}
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.cta-actions .btn {
  flex: 1 1 220px;
}
@media (min-width: 900px) {
  .cta-band {
    padding: 64px 0;
  }
  .cta-inner {
    grid-template-columns: 1fr auto;
    gap: 48px;
  }
  .cta-actions .btn {
    flex: 0 0 auto;
  }
}
</style>
