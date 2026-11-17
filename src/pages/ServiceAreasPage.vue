<script setup>
// /service-areas: every state and district from src/data/areas.js, with each district's towns,
// its local note and a link to its page. Districts marked noindex are still listed (visitors
// can use them); search engines follow the links but skip those pages.
import { t, tMeta, pick } from '../i18n.js'
import { business } from '../data/business.js'
import { states } from '../data/areas.js'
import { usePageMeta } from '../composables/usePageMeta.js'
import AppIcon from '../components/AppIcon.vue'
import EnquiryForm from '../components/EnquiryForm.vue'

usePageMeta({
  title: tMeta('meta.areasTitle'),
  description: tMeta('meta.areasDesc'),
  path: '/service-areas',
  breadcrumbName: tMeta('nav.areas'),
  extra: {
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Service areas',
          itemListElement: states.flatMap((s) => s.districts).map((d, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: d.name.en,
            url: `${business.siteUrl}/${states.find((s) => s.districts.includes(d)).slug}/${d.slug}`,
          })),
        }),
      },
    ],
  },
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h1>{{ t('areasPage.title') }}</h1>
      <p class="lead">{{ t('areasIntro') }}</p>

      <section v-for="s in states" :key="s.slug" class="state">
        <h2>
          <AppIcon name="pin" :size="22" />
          {{ pick(s.name) }}
        </h2>
        <ul class="districts">
          <li v-for="(d, i) in s.districts" :key="d.slug" v-reveal="i % 3" class="district">
            <h3>
              <RouterLink :to="`/${s.slug}/${d.slug}`" class="district-link">{{ pick(d.name) }}</RouterLink>
            </h3>
            <p class="note">{{ pick(d.note) }}</p>
            <p class="towns">
              <span class="towns-label">{{ t('areasPage.towns') }}:</span>
              {{ d.towns.map(pick).join(', ') }}
            </p>
            <span class="more" aria-hidden="true">{{ t('services.more') }} <AppIcon name="arrow" :size="16" /></span>
          </li>
        </ul>
      </section>

      <p class="area-more">
        <AppIcon name="check" :size="20" />
        {{ t('areasMore') }}
      </p>
    </div>
  </section>

  <section class="section section-alt" id="enquiry">
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
  max-width: 68ch;
  margin: 0 0 8px;
  font-size: 1.1rem;
  line-height: 1.7;
}
.state h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 36px 0 16px;
}
.districts {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
.district {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}
.district h3 {
  margin: 0 0 8px;
  font-size: 1.15rem;
}
.district-link {
  color: inherit;
  text-decoration: none;
}
/* the whole card is the link */
.district-link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}
.district:has(.district-link:focus-visible) {
  outline: 3px solid var(--focus);
  outline-offset: 2px;
}
.district-link:focus-visible {
  outline: none;
}
.note {
  margin: 0 0 10px;
  line-height: 1.65;
}
.towns {
  margin: 0 0 12px;
  color: var(--muted);
  line-height: 1.6;
}
.towns-label {
  font-weight: 600;
}
.more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  font-weight: 600;
  color: var(--red);
}
.area-more {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin: 28px 0 0;
  font-weight: 600;
}
</style>
