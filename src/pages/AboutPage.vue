<script setup>
// /about-us. Shows what the site already states about the business, plus owner-confirmed
// details from business.js (story, founder, founding year, team, credentials) once filled in.
// (/about is taken by another Frappe page on the server, hence /about-us.)
import { t, tMeta, pick } from '../i18n.js'
import { business, telLink, waLink, primaryPhone, formatPhone } from '../data/business.js'
import { services, servicePath } from '../data/services.js'
import { usePageMeta } from '../composables/usePageMeta.js'
import AppIcon from '../components/AppIcon.vue'
import ProcessSteps from '../components/ProcessSteps.vue'
import AreaList from '../components/AreaList.vue'

const story = pick(business.aboutStory) ? business.aboutStory : null
const facts = [
  business.founder && { label: 'about.founder', value: business.founder },
  business.foundingYear && { label: 'about.since', value: business.foundingYear },
].filter(Boolean)

usePageMeta({
  title: tMeta('meta.aboutTitle'),
  description: tMeta('meta.aboutDesc'),
  path: '/about-us',
  breadcrumbName: tMeta('nav.about'),
  extra: {
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${business.siteUrl}/about-us#page`,
          url: `${business.siteUrl}/about-us`,
          name: tMeta('meta.aboutTitle'),
          inLanguage: 'ta-IN',
          about: { '@id': `${business.siteUrl}/#business` },
        }),
      },
    ],
  },
})
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <h1>{{ t('about.title') }}</h1>
      <p class="lead">{{ t('about.intro') }}</p>
      <p v-if="story" class="lead">{{ pick(story) }}</p>

      <dl v-if="facts.length" class="facts">
        <div v-for="f in facts" :key="f.label">
          <dt>{{ t(f.label) }}</dt>
          <dd>{{ f.value }}</dd>
        </div>
      </dl>

      <h2>{{ t('about.servicesTitle') }}</h2>
      <ul class="links">
        <li v-for="s in services" :key="s.key">
          <RouterLink :to="servicePath(s)">{{ t(`services.${s.key}.name`) }}</RouterLink>
          – {{ t(`services.${s.key}.desc`) }}
        </li>
      </ul>

      <h2>{{ t('about.equipmentTitle') }}</h2>
      <p>{{ t('about.equipment') }}</p>

      <template v-if="business.team.length">
        <h2>{{ t('about.teamTitle') }}</h2>
        <ul class="links">
          <li v-for="m in business.team" :key="m.name">
            <strong>{{ m.name }}</strong><template v-if="pick(m.role)"> – {{ pick(m.role) }}</template>
          </li>
        </ul>
      </template>

      <template v-if="business.credentials.length">
        <h2>{{ t('about.credentialsTitle') }}</h2>
        <ul class="links">
          <li v-for="(c, i) in business.credentials" :key="i">{{ pick(c) }}</li>
        </ul>
      </template>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2 v-reveal>{{ t('process.title') }}</h2>
      <ProcessSteps />
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 v-reveal>{{ t('areasTitle') }}</h2>
      <p v-reveal class="section-intro">{{ t('areasIntro') }}</p>
      <AreaList />
    </div>
  </section>

  <section class="section section-alt">
    <div class="container narrow">
      <h2 v-reveal>{{ t('about.contactTitle') }}</h2>
      <p v-reveal class="section-intro">{{ t('contact.intro') }}</p>
      <div class="actions">
        <a :href="telLink()" class="btn btn-red">
          <AppIcon name="phone" :size="20" />
          {{ formatPhone(primaryPhone) }}
        </a>
        <a :href="waLink()" class="btn btn-outline" target="_blank" rel="noopener">
          <AppIcon name="whatsapp" :size="20" />
          {{ t('footer.whatsapp') }}
        </a>
        <RouterLink to="/contact" class="btn btn-outline">{{ t('nav.contact') }}</RouterLink>
      </div>
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
h2 {
  margin: 32px 0 12px;
}
.lead {
  font-size: 1.1rem;
  line-height: 1.7;
}
.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 32px;
  margin: 20px 0 0;
}
.facts dt {
  color: var(--muted);
  font-size: 0.9rem;
}
.facts dd {
  margin: 0;
  font-weight: 700;
  font-size: 1.2rem;
}
.links {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 8px;
  line-height: 1.6;
}
.links a {
  color: var(--red);
  font-weight: 600;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
