<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { lang, t, tEn, tMeta, pick } from '../i18n.js'
import { business, telLink, primaryPhone, formatPhone } from '../data/business.js'
import { states } from '../data/areas.js'
import { heroPhoto, ogImage, workPhotos, photoAlt } from '../data/photos.js'
import { usePageMeta } from '../composables/usePageMeta.js'
import { registerHero, unregisterHero } from '../motion.js'
import AppIcon from '../components/AppIcon.vue'
import ServiceCards from '../components/ServiceCards.vue'
import WorkGallery from '../components/WorkGallery.vue'
import ReviewsSection from '../components/ReviewsSection.vue'
import AreaList from '../components/AreaList.vue'
import EnquiryForm from '../components/EnquiryForm.vue'

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${business.siteUrl}/#business`,
  name: business.name,
  description: tEn('meta.homeDesc'),
  url: `${business.siteUrl}/`,
  image: `${business.siteUrl}${ogImage ?? '/logo.png'}`,
  logo: `${business.siteUrl}/logo.png`,
  telephone: business.phones.map((p) => `+91${p}`),
  email: business.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    addressCountry: business.address.country,
  },
  // A state we cover widely is listed as a State; a single city (Bengaluru) as a City.
  areaServed: states.flatMap((s) =>
    s.districts.length > 1
      ? [{ '@type': 'State', name: s.name.en }]
      : s.districts.map((d) => ({ '@type': 'City', name: d.name.en })),
  ),
}

usePageMeta({
  title: tMeta('meta.homeTitle'),
  description: tMeta('meta.homeDesc'),
  path: '/',
  extra: {
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(localBusiness) }],
  },
})

const stats = [
  { value: business.years, key: 'years' },
  { value: business.wells, key: 'wells' },
  { value: business.states, key: 'states' },
]

const hero = ref(null)
onMounted(() => registerHero(hero.value))
onBeforeUnmount(unregisterHero)
</script>

<template>
  <!-- Hero -->
  <section ref="hero" class="hero">
    <img
      v-if="heroPhoto"
      :src="heroPhoto.src"
      :alt="pick(photoAlt('hero'))"
      :width="heroPhoto.width"
      :height="heroPhoto.height"
      fetchpriority="high"
      decoding="async"
      class="hero-img"
    />
    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="badge hero-in" style="--in: 0">
          <AppIcon name="check" :size="18" />
          {{ t('heroBadge') }}
        </p>
        <h1 class="hero-in" style="--in: 1">{{ t('heroTitle') }}</h1>
        <p class="hero-tamil hero-in" style="--in: 2" :lang="lang === 'en' ? 'ta' : 'en'">
          {{ t('heroTamilLine') }}
        </p>
        <p class="hero-text hero-in" style="--in: 3">{{ t('heroText') }}</p>
        <div class="hero-actions hero-in" style="--in: 4">
          <a href="#enquiry" class="btn btn-red">
            {{ t('heroCta') }}
            <AppIcon name="arrow" :size="20" />
          </a>
          <a :href="telLink()" class="btn btn-ghost">
            <AppIcon name="phone" :size="20" />
            {{ formatPhone(primaryPhone) }}
          </a>
        </div>
      </div>
    </div>
    <!-- decorative scroll hint (desktop only) -->
    <span class="scroll-hint" aria-hidden="true"><span></span></span>
  </section>

  <!-- Stats -->
  <section class="stats" :aria-label="t('a11y.keyFacts')">
    <div class="container">
      <ul class="stats-grid">
        <li v-for="(s, i) in stats" :key="s.key" v-reveal="i">
          <span v-count-up class="stat-value">{{ s.value }}</span>
          <span class="stat-label">{{ t(`stats.${s.key}`) }}</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- Services -->
  <section class="section" id="services">
    <div class="container">
      <h2 v-reveal>{{ t('servicesTitle') }}</h2>
      <p v-reveal class="section-intro">{{ t('servicesIntro') }}</p>
      <ServiceCards />
    </div>
  </section>

  <!-- Areas -->
  <section class="section section-alt" id="areas">
    <div class="container">
      <h2 v-reveal>{{ t('areasTitle') }}</h2>
      <p v-reveal class="section-intro">{{ t('areasIntro') }}</p>
      <AreaList />
    </div>
  </section>

  <!-- Gallery -->
  <section v-if="workPhotos.length" class="section" id="gallery">
    <div class="container">
      <h2 v-reveal>{{ t('galleryTitle') }}</h2>
      <WorkGallery />
    </div>
  </section>

  <!-- Reviews -->
  <ReviewsSection class="section-alt" />

  <!-- Enquiry -->
  <section class="section" id="enquiry">
    <div class="container narrow">
      <h2 v-reveal>{{ t('enquiryTitle') }}</h2>
      <p v-reveal class="section-intro">{{ t('enquiryIntro') }}</p>
      <EnquiryForm v-reveal />
    </div>
  </section>
</template>

<style scoped>
/* The hero slides up under the sticky (transparent) header. */
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: min(82vh, 640px);
  margin-top: calc(-1 * var(--header-h));
  padding: calc(56px + var(--header-h)) 0 64px;
  background: var(--ink);
  color: #fff;
}
.hero-img {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* slow zoom-out on load */
  animation: hero-zoom 1.5s var(--ease) both;
}
@keyframes hero-zoom {
  from {
    transform: scale(1.08);
  }
}
/* badge, headline, Tamil line, text, buttons: one after another */
.hero-in {
  animation: hero-rise var(--dur-slow) var(--ease) both;
  animation-delay: calc(150ms + var(--in, 0) * 80ms);
}
@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}
.scroll-hint {
  display: none;
}
/* dark overlay, heavier on the text side, so the copy stays readable on any photo */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg, rgba(20, 16, 12, 0.86) 0%, rgba(20, 16, 12, 0.68) 55%, rgba(20, 16, 12, 0.4) 100%),
    linear-gradient(0deg, rgba(20, 16, 12, 0.5), transparent 40%);
}
.hero-inner {
  position: relative;
}
.hero-copy {
  max-width: 660px;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.3;
  backdrop-filter: blur(4px);
}
.badge svg {
  color: var(--accent-light);
}
h1 {
  margin: 0;
  color: #fff;
  font-size: var(--fs-hero);
  line-height: 1.1;
  letter-spacing: -0.01em;
}
.lang-ta h1 {
  font-size: var(--fs-hero-ta);
  line-height: 1.35;
  letter-spacing: 0;
}
.hero-tamil {
  margin: 12px 0 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--accent-light);
}
.hero-text {
  margin: 16px 0 28px;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.88);
  max-width: 54ch;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.hero-actions .btn {
  flex: 1 1 240px;
}

.stats {
  background: var(--blue);
  color: #fff;
  padding: 24px 0;
}
.stats-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  text-align: center;
}
.stat-value {
  display: block;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: clamp(1.9rem, 8vw, 2.8rem);
  line-height: 1.1;
}
.stat-label {
  display: block;
  margin-top: 4px;
  font-size: 0.95rem;
  color: #d4e3ee;
  line-height: 1.3;
}

@media (min-width: 900px) {
  .hero {
    padding: calc(88px + var(--header-h)) 0 96px;
  }
  .scroll-hint {
    position: absolute;
    left: 50%;
    bottom: 22px;
    display: block;
    width: 26px;
    height: 42px;
    margin-left: -13px;
    border: 2px solid rgba(255, 255, 255, 0.55);
    border-radius: var(--radius-pill);
    opacity: 0;
    animation: hero-fade var(--dur-slow) var(--ease) 900ms forwards;
  }
  .scroll-hint span {
    position: absolute;
    left: 50%;
    top: 8px;
    width: 4px;
    height: 8px;
    margin-left: -2px;
    border-radius: 2px;
    background: #fff;
    animation: hint-bounce 2s var(--ease) 1.5s infinite;
  }
  .hero-actions .btn {
    flex: 0 0 auto;
  }
}
@keyframes hero-fade {
  to {
    opacity: 1;
  }
}
@keyframes hint-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(12px);
    opacity: 0.3;
  }
}
.stat-value {
  font-variant-numeric: tabular-nums;
}
</style>
