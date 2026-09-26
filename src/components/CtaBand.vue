<script setup>
import { t } from '../i18n.js'
import { telLink, waLink, primaryPhone, formatPhone } from '../data/business.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section class="cta-band">
    <div class="container cta-inner">
      <div class="cta-copy">
        <h2>{{ t('cta.title') }}</h2>
        <p>{{ t('cta.text') }}</p>
      </div>
      <div class="cta-actions">
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
  background: linear-gradient(120deg, var(--red) 0%, var(--red-dark) 100%);
  color: #fff;
  padding: 48px 0;
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
