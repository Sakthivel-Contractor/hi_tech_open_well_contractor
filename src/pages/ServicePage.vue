<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { lang, t, tMeta, pick, messages } from '../i18n.js'
import { findService, servicePath } from '../data/services.js'
import { states } from '../data/areas.js'
import { business, telLink, waLink, primaryPhone, formatPhone } from '../data/business.js'
import { usePageMeta } from '../composables/usePageMeta.js'
import AppIcon from '../components/AppIcon.vue'
import ServiceCards from '../components/ServiceCards.vue'
import AreaList from '../components/AreaList.vue'
import EnquiryForm from '../components/EnquiryForm.vue'
import FaqList from '../components/FaqList.vue'
import { faqsFor } from '../data/faqs.js'
import NotFound from './NotFound.vue'

const route = useRoute()
const service = computed(() => findService(route.params.service))
const name = computed(() => (service.value ? t(`services.${service.value.key}.name`) : ''))
// The other language's name under the heading, as on the service cards.
const altName = computed(() =>
  service.value ? messages[lang.value === 'en' ? 'ta' : 'en'].services[service.value.key].name : '',
)
const factorsTitle = computed(() =>
  service.value?.factorsTitle ? pick(service.value.factorsTitle) : t('servicePage.factorsTitle'),
)

if (service.value) {
  const s = service.value
  const nameTa = messages.ta.services[s.key].name
  const nameEn = messages.en.services[s.key].name
  const url = `${business.siteUrl}${servicePath(s)}`
  usePageMeta({
    title: tMeta('meta.serviceTitle', { name: nameTa, nameEn }),
    description: `${s.metaDesc.ta} ${tMeta('meta.callSuffix')}`,
    path: servicePath(s),
    breadcrumbName: nameEn,
    extra: {
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${url}#service`,
            name: nameEn,
            alternateName: nameTa,
            serviceType: nameEn,
            description: s.metaDesc.en,
            url,
            provider: { '@id': `${business.siteUrl}/#business`, name: business.name },
            areaServed: states.flatMap((st) =>
              st.districts.length > 1
                ? [{ '@type': 'State', name: st.name.en }]
                : st.districts.map((d) => ({ '@type': 'City', name: d.name.en })),
            ),
          }),
        },
      ],
    },
  })
}
// Unknown service: <NotFound> sets its own noindex title.
</script>

<template>
  <NotFound v-if="!service" />
  <template v-else>
    <section class="section service-head">
      <div class="container">
        <nav class="crumbs" :aria-label="t('a11y.breadcrumb')">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ name }}</span>
        </nav>
        <h1>{{ name }}</h1>
        <p class="alt-title" :lang="lang === 'en' ? 'ta' : 'en'">{{ altName }}</p>
        <div class="actions">
          <a :href="telLink()" class="btn btn-red">
            <AppIcon name="phone" :size="20" />
            {{ formatPhone(primaryPhone) }}
          </a>
          <a :href="waLink(undefined, name)" class="btn btn-outline" target="_blank" rel="noopener">
            <AppIcon name="whatsapp" :size="20" />
            {{ t('footer.whatsapp') }}
          </a>
          <a href="#enquiry" class="btn btn-outline">
            {{ t('heroCta') }}
            <AppIcon name="arrow" :size="20" />
          </a>
        </div>
        <p v-for="(para, i) in service.intro" :key="i" class="intro">{{ pick(para) }}</p>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container service-columns">
        <div>
          <h2 v-reveal>{{ t('servicePage.whenTitle') }}</h2>
          <ul class="points">
            <li v-for="(item, i) in service.when" :key="i" v-reveal="i">
              <AppIcon name="check" :size="20" />
              <span>{{ pick(item) }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 v-reveal>{{ factorsTitle }}</h2>
          <ul class="points">
            <li v-for="(item, i) in service.factors" :key="i" v-reveal="i">
              <AppIcon name="check" :size="20" />
              <span>{{ pick(item) }}</span>
            </li>
          </ul>
          <p v-if="!service.factorsTitle" v-reveal class="note">{{ t('servicePage.factorsNote') }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container narrow">
        <h2 v-reveal>{{ t('servicePage.startTitle') }}</h2>
        <p v-reveal class="section-intro">{{ t('servicePage.startText') }}</p>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2 v-reveal>{{ t('servicePage.areasTitle') }}</h2>
        <p v-reveal class="section-intro">{{ t('areasIntro') }}</p>
        <AreaList />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 v-reveal>{{ t('servicePage.otherServices') }}</h2>
        <ServiceCards :exclude="service.key" />
      </div>
    </section>

    <section v-if="faqsFor(service.key).length" class="section">
      <div class="container narrow">
        <h2 v-reveal>{{ t('faq.title') }}</h2>
        <FaqList :page="service.key" />
        <p v-reveal class="note">
          <RouterLink to="/cost-guide">{{ t('nav.cost') }}</RouterLink>
        </p>
      </div>
    </section>

    <section class="section section-alt" id="enquiry">
      <div class="container narrow">
        <h2 v-reveal>{{ t('servicePage.enquiry', { service: name }) }}</h2>
        <p v-reveal class="section-intro">{{ t('enquiryIntro') }}</p>
        <EnquiryForm v-reveal :key="service.key" :work="service.key" />
      </div>
    </section>
  </template>
</template>

<style scoped>
.service-head {
  padding-bottom: 32px;
}
.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 0.95rem;
  color: var(--muted);
}
.crumbs a {
  color: inherit;
}
h1 {
  margin: 0 0 6px;
  font-size: var(--fs-h1);
}
.lang-ta h1 {
  font-size: var(--fs-h1-ta);
}
.alt-title {
  margin: 0 0 20px;
  color: var(--muted);
  font-weight: 600;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}
.intro {
  max-width: 68ch;
  margin: 0 0 14px;
  font-size: 1.05rem;
  line-height: 1.7;
}
.service-columns {
  display: grid;
  gap: 32px;
}
@media (min-width: 860px) {
  .service-columns {
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }
}
.points {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
.points li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  line-height: 1.6;
}
.points li :deep(svg) {
  flex: none;
  margin-top: 3px;
  color: var(--wa);
}
.note {
  margin: 16px 0 0;
  color: var(--muted);
}
</style>
