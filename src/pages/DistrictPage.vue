<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { lang, t, tMeta, pick } from '../i18n.js'
import { findDistrict } from '../data/areas.js'
import { business, telLink, waLink, primaryPhone, formatPhone } from '../data/business.js'
import { heroPhoto } from '../data/photos.js'
import { usePageMeta } from '../composables/usePageMeta.js'
import AppIcon from '../components/AppIcon.vue'
import ServiceCards from '../components/ServiceCards.vue'
import AreaList from '../components/AreaList.vue'
import EnquiryForm from '../components/EnquiryForm.vue'
import ReviewsSection from '../components/ReviewsSection.vue'
import NotFound from './NotFound.vue'

const route = useRoute()
const district = computed(() => findDistrict(route.params.state, route.params.district))

const vars = computed(() => {
  const d = district.value
  if (!d) return {}
  return {
    district: d.name.en,
    districtTa: d.name.ta,
    state: d.state.name.en,
    stateTa: d.state.name.ta,
    towns: d.towns.slice(0, 3).map((x) => x.en).join(', '),
    townsTa: d.towns.slice(0, 3).map((x) => x.ta).join(', '),
  }
})

if (district.value) {
  const v = vars.value
  usePageMeta({
    title: tMeta('meta.districtTitle', v),
    description: tMeta('meta.districtDesc', v),
    path: district.value.path,
    extra: {
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Borewell drilling and open well digging',
            provider: { '@id': `${business.siteUrl}/#business`, name: business.name },
            areaServed: { '@type': 'AdministrativeArea', name: `${v.district}, ${v.state}` },
          }),
        },
      ],
    },
  })
}
// Unknown district: <NotFound> sets its own noindex title.
</script>

<template>
  <NotFound v-if="!district" />
  <template v-else>
    <section
      class="district-hero"
      :style="heroPhoto ? { '--hero-photo': `url('${heroPhoto.src}')` } : undefined"
    >
      <div class="container">
        <nav class="crumbs" :aria-label="t('a11y.breadcrumb')">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <RouterLink to="/#areas">{{ pick(district.state.name) }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ pick(district.name) }}</span>
        </nav>
        <h1>{{ t('district.title', vars) }}</h1>
        <p class="alt-title" :lang="lang === 'en' ? 'ta' : 'en'">{{ t('district.tamilTitle', vars) }}</p>
        <p class="intro">{{ t('district.intro', vars) }}</p>
        <p class="intro">{{ pick(district.note) }}</p>
        <p class="badge">
          <AppIcon name="check" :size="18" />
          {{ t('heroBadge') }}
        </p>
        <div class="actions">
          <a href="#enquiry" class="btn btn-red">
            {{ t('heroCta') }}
            <AppIcon name="arrow" :size="20" />
          </a>
          <a :href="telLink()" class="btn btn-ghost">
            <AppIcon name="phone" :size="20" />
            {{ formatPhone(primaryPhone) }}
          </a>
          <a :href="waLink()" class="btn btn-ghost" target="_blank" rel="noopener">
            <AppIcon name="whatsapp" :size="20" />
            {{ t('footer.whatsapp') }}
          </a>
        </div>
      </div>
    </section>

    <!-- only this district's reviews; renders nothing when there are none -->
    <ReviewsSection :district="district" />

    <section class="section section-alt">
      <div class="container">
        <h2>{{ t('district.nearby', vars) }}</h2>
        <ul class="towns">
          <li v-for="town in district.towns" :key="town.en">
            <AppIcon name="pin" :size="18" />
            {{ pick(town) }}
          </li>
        </ul>
      </div>
    </section>

    <section class="section" id="enquiry">
      <div class="container narrow">
        <h2>{{ t('district.enquiry', vars) }}</h2>
        <p class="section-intro">{{ t('enquiryIntro') }}</p>
        <EnquiryForm :key="district.path" :district="district.name.en" />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2>{{ t('district.servicesHere', vars) }}</h2>
        <ServiceCards />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>{{ t('district.otherAreas') }}</h2>
        <AreaList :current="district.path" />
      </div>
    </section>
  </template>
</template>

<style scoped>
/* same photo + dark overlay treatment as the home hero */
.district-hero {
  padding: 20px 0 44px;
  color: #fff;
  background:
    linear-gradient(90deg, rgba(20, 16, 12, 0.9) 0%, rgba(20, 16, 12, 0.72) 60%, rgba(20, 16, 12, 0.5) 100%),
    var(--hero-photo, none) center / cover no-repeat,
    var(--ink);
}
.crumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  margin-bottom: 16px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}
.crumbs a {
  color: #fff;
  display: inline-block;
  padding: 10px 0;
  text-underline-offset: 3px;
}
h1 {
  margin: 0;
  color: #fff;
  font-size: var(--fs-h1);
  line-height: 1.12;
}
.lang-ta h1 {
  font-size: var(--fs-h1-ta);
  line-height: 1.35;
}
.alt-title {
  margin: 10px 0 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--accent-light);
}
.intro {
  margin: 14px 0 0;
  max-width: 64ch;
  font-size: 1.06rem;
  color: rgba(255, 255, 255, 0.88);
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 22px 0 0;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
}
.badge svg {
  color: var(--accent-light);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}
.actions .btn {
  flex: 1 1 220px;
}
.towns {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.towns li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--line);
  font-weight: 500;
}
.towns svg {
  color: var(--red);
}
@media (min-width: 900px) {
  .district-hero {
    padding: 32px 0 72px;
  }
  .actions .btn {
    flex: 0 0 auto;
  }
}
</style>
