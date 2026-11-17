<script setup>
// /cost-guide: what changes the cost of open well work. No rupee figures unless the owner adds
// real ones to `priceRanges` in src/data/costGuide.js.
import { t, tMeta, pick } from '../i18n.js'
import { telLink, waLink, primaryPhone, formatPhone } from '../data/business.js'
import { costFactors, priceRanges } from '../data/costGuide.js'
import { services, servicePath, serviceByKey } from '../data/services.js'
import { usePageMeta } from '../composables/usePageMeta.js'
import AppIcon from '../components/AppIcon.vue'
import ProcessSteps from '../components/ProcessSteps.vue'
import FaqList from '../components/FaqList.vue'
import EnquiryForm from '../components/EnquiryForm.vue'

usePageMeta({
  title: tMeta('meta.costTitle'),
  description: tMeta('meta.costDesc'),
  path: '/cost-guide',
  breadcrumbName: tMeta('nav.cost'),
})
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <h1>{{ t('cost.title') }}</h1>
      <p class="lead">{{ t('cost.intro') }}</p>
      <div class="actions">
        <a :href="telLink()" class="btn btn-red">
          <AppIcon name="phone" :size="20" />
          {{ formatPhone(primaryPhone) }}
        </a>
        <a :href="waLink(undefined, t('nav.cost'))" class="btn btn-outline" target="_blank" rel="noopener">
          <AppIcon name="whatsapp" :size="20" />
          {{ t('footer.whatsapp') }}
        </a>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2 v-reveal>{{ t('cost.factorsTitle') }}</h2>
      <ul class="factors">
        <li v-for="(f, i) in costFactors" :key="i" v-reveal="i % 3" class="factor">
          <h3>{{ pick(f.title) }}</h3>
          <p>{{ pick(f.text) }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section v-if="priceRanges.length" class="section">
    <div class="container narrow">
      <h2 v-reveal>{{ t('cost.pricesTitle') }}</h2>
      <ul class="prices">
        <li v-for="(p, i) in priceRanges" :key="i">
          <strong v-if="serviceByKey(p.work)">{{ t(`services.${p.work}.name`) }}: </strong>{{ pick(p.text) }}
        </li>
      </ul>
      <p class="note">{{ t('cost.pricesNote') }}</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 v-reveal>{{ t('cost.howTitle') }}</h2>
      <p v-reveal class="section-intro">{{ t('cost.how') }}</p>
      <ProcessSteps />
    </div>
  </section>

  <section class="section section-alt">
    <div class="container narrow">
      <h2 v-reveal>{{ t('faq.title') }}</h2>
      <FaqList page="cost" />
      <h2 class="more-title">{{ t('cost.byService') }}</h2>
      <ul class="service-links">
        <li v-for="s in services" :key="s.key">
          <RouterLink :to="servicePath(s)">{{ t(`services.${s.key}.name`) }}</RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <section class="section" id="enquiry">
    <div class="container narrow">
      <h2 v-reveal>{{ t('enquiryTitle') }}</h2>
      <p v-reveal class="section-intro">{{ t('enquiryIntro') }}</p>
      <EnquiryForm v-reveal />
    </div>
  </section>
</template>

<style scoped>
h1 {
  margin: 0 0 12px;
  font-size: var(--fs-h1);
}
.lang-ta h1 {
  font-size: var(--fs-h1-ta);
}
.lead {
  font-size: 1.1rem;
  line-height: 1.7;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}
.factors {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
.factor {
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}
.factor h3 {
  margin: 0 0 6px;
  font-size: 1.1rem;
}
.factor p {
  margin: 0;
  line-height: 1.7;
}
.prices {
  padding-left: 20px;
  line-height: 1.7;
}
.note {
  color: var(--muted);
}
.more-title {
  margin-top: 32px;
}
.service-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.service-links a {
  display: inline-block;
  padding: 10px 14px;
  min-height: 48px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  background: var(--surface);
  color: var(--red);
  font-weight: 600;
  text-decoration: none;
}
</style>
