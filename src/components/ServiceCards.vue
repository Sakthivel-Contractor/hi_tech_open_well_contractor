<script setup>
import { lang, t, messages, pick } from '../i18n.js'
import { servicePhoto, photoAlt } from '../data/photos.js'
import AppIcon from './AppIcon.vue'

// Order matters: public/images/service-1.jpg is the first card, service-2.jpg the second...
const services = ['borewell', 'openwell', 'repair', 'survey']
// The "other language" name is shown under the main name, so farmers see both.
const altName = (key) => messages[lang.value === 'en' ? 'ta' : 'en'].services[key].name
</script>

<template>
  <ul class="service-grid">
    <li v-for="(key, i) in services" :key="key" class="service-card">
      <img
        v-if="servicePhoto(i)"
        :src="servicePhoto(i).src"
        :alt="pick(photoAlt(`service-${i + 1}`))"
        :width="servicePhoto(i).width"
        :height="servicePhoto(i).height"
        loading="lazy"
        decoding="async"
        class="service-img"
      />
      <!-- no photo yet: plain colour box with the service icon -->
      <div v-else class="service-img service-img-empty">
        <AppIcon :name="key" :size="64" />
      </div>
      <div class="service-body">
        <span class="service-icon"><AppIcon :name="key" :size="26" /></span>
        <h3>{{ t(`services.${key}.name`) }}</h3>
        <p class="service-alt" :lang="lang === 'en' ? 'ta' : 'en'">{{ altName(key) }}</p>
        <p>{{ t(`services.${key}.desc`) }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.service-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 20px;
  /* every card gets the same height, whatever the text length */
  grid-auto-rows: 1fr;
}
.service-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.service-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: #d3c6b1;
}
.service-img {
  flex: none;
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  background: #d9cfbf;
}
.service-img-empty {
  display: grid;
  place-items: center;
  background: var(--sand);
  color: var(--blue);
}
.service-body {
  position: relative;
  flex: 1;
  padding: 32px 20px 24px;
}
.service-icon {
  position: absolute;
  top: -24px;
  left: 18px;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--red);
  color: #fff;
  box-shadow: 0 4px 10px rgba(140, 63, 28, 0.25);
}
h3 {
  margin: 0;
  font-size: var(--fs-h3);
}
.service-alt {
  margin: 2px 0 10px;
  color: var(--red);
  font-weight: 600;
  font-size: 0.98rem;
}
.service-body p:last-child {
  margin: 0;
  color: var(--muted);
}
@media (min-width: 600px) {
  .service-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1024px) {
  .service-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
