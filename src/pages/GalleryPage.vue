<script setup>
// /gallery: every work-*.jpg photo from public/images/ (same set as the home page gallery),
// with links to the services. New photos added to public/images/ appear here automatically.
import { t, tMeta } from '../i18n.js'
import { telLink, waLink, primaryPhone, formatPhone } from '../data/business.js'
import { workPhotos } from '../data/photos.js'
import { services, servicePath } from '../data/services.js'
import { usePageMeta } from '../composables/usePageMeta.js'
import AppIcon from '../components/AppIcon.vue'
import WorkGallery from '../components/WorkGallery.vue'

usePageMeta({
  title: tMeta('meta.galleryTitle'),
  description: tMeta('meta.galleryDesc'),
  path: '/gallery',
  breadcrumbName: tMeta('nav.gallery'),
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h1>{{ t('galleryPage.title') }}</h1>
      <p class="lead">{{ t('galleryPage.intro') }}</p>
      <WorkGallery v-if="workPhotos.length" />
      <p v-else class="lead">{{ t('galleryPage.empty') }}</p>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container narrow">
      <h2 v-reveal>{{ t('galleryPage.servicesTitle') }}</h2>
      <ul class="service-links">
        <li v-for="s in services" :key="s.key">
          <RouterLink :to="servicePath(s)">{{ t(`services.${s.key}.name`) }}</RouterLink>
        </li>
      </ul>
      <h2 v-reveal class="cta-title">{{ t('about.contactTitle') }}</h2>
      <div class="actions">
        <a :href="telLink()" class="btn btn-red">
          <AppIcon name="phone" :size="20" />
          {{ formatPhone(primaryPhone) }}
        </a>
        <a :href="waLink()" class="btn btn-outline" target="_blank" rel="noopener">
          <AppIcon name="whatsapp" :size="20" />
          {{ t('footer.whatsapp') }}
        </a>
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
.lead {
  max-width: 68ch;
  margin: 0 0 24px;
  font-size: 1.1rem;
  line-height: 1.7;
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
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  background: var(--surface);
  color: var(--red);
  font-weight: 600;
  text-decoration: none;
}
.cta-title {
  margin-top: 36px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
