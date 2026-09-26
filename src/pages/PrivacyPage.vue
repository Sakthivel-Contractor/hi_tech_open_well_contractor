<script setup>
import { t, tMeta, pick } from '../i18n.js'
import { business, telLink, formatPhone } from '../data/business.js'
import { usePageMeta } from '../composables/usePageMeta.js'

usePageMeta({
  title: tMeta('meta.privacyTitle'),
  description: tMeta('meta.privacyDesc'),
  path: '/privacy',
})
</script>

<template>
  <section class="section">
    <div class="container narrow prose">
      <h1>{{ t('privacy.title') }}</h1>
      <p class="updated">{{ t('privacy.updated') }}</p>
      <p v-for="(para, i) in t('privacy.body')" :key="i">{{ para }}</p>
      <address>
        <strong>{{ business.name }}</strong><br />
        {{ pick(business.address) }}<br />
        <template v-for="num in business.phones" :key="num">
          <a :href="telLink(num)">{{ formatPhone(num) }}</a><br />
        </template>
        <a :href="`mailto:${business.email}`">{{ business.email }}</a>
      </address>
    </div>
  </section>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: var(--fs-h1);
}
.lang-ta h1 {
  font-size: var(--fs-h1-ta);
}
.updated {
  color: var(--muted);
  margin-top: 6px;
}
.prose p {
  font-size: 1.06rem;
  max-width: 65ch;
}
address {
  margin-top: 24px;
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  font-style: normal;
  line-height: 1.9;
}
address a {
  color: var(--blue);
}
</style>
