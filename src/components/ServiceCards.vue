<script setup>
import { lang, t, messages, pick } from '../i18n.js'
import { servicePhoto, workPhotos, photoAlt } from '../data/photos.js'
import AppIcon from './AppIcon.vue'

// Each card and the photo it shows: photo 1 -> public/images/service-1.jpg, and so on.
// `fallback`: a gallery photo to show until that service-N.jpg is added.
const services = [
  { key: 'openwell', photo: 1 },
  { key: 'deepening', photo: 4 },
  { key: 'wall', photo: 2 },
  { key: 'cleaning', photo: 3 },
  { key: 'survey', photo: 5, fallback: 'work-2' },
].map((s) => ({ ...s, image: cardImage(s) }))

// { src, width, height, altName } for a card, or null (then the icon box is shown).
function cardImage({ photo, fallback }) {
  const own = servicePhoto(photo)
  if (own) return { ...own, altName: `service-${photo}` }
  const work = workPhotos.find((p) => p.name === fallback)
  // the 600 px gallery tile is plenty for a card
  return work ? { src: work.tile, width: work.width, height: work.height, altName: work.name } : null
}
// The "other language" name is shown under the main name, so farmers see both.
const altName = (key) => messages[lang.value === 'en' ? 'ta' : 'en'].services[key].name
</script>

<template>
  <ul class="service-grid">
    <li v-for="({ key, image }, i) in services" :key="key" v-reveal="i" class="service-item">
      <div class="service-card">
        <div class="service-media img-placeholder">
          <img
            v-if="image"
            v-fade-img
            :src="image.src"
            :alt="pick(photoAlt(image.altName))"
            :width="image.width"
            :height="image.height"
            loading="lazy"
            decoding="async"
            class="service-img"
          />
          <!-- no photo yet: plain colour box with the service icon -->
          <div v-else class="service-img service-img-empty">
            <AppIcon :name="key" :size="64" />
          </div>
        </div>
        <div class="service-body">
          <span class="service-icon"><AppIcon :name="key" :size="26" /></span>
          <h3>{{ t(`services.${key}.name`) }}</h3>
          <p class="service-alt" :lang="lang === 'en' ? 'ta' : 'en'">{{ altName(key) }}</p>
          <p>{{ t(`services.${key}.desc`) }}</p>
        </div>
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
.service-item {
  height: 100%;
}
.service-card {
  position: relative;
  isolation: isolate;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: var(--shadow-sm);
  -webkit-tap-highlight-color: transparent;
  transition:
    transform var(--dur-fast) var(--ease),
    border-color var(--dur-fast) var(--ease);
}
/* deeper hover shadow on its own layer, faded in (no box-shadow animation) */
.service-card::after {
  content: '';
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-fast) var(--ease);
}
.service-media {
  flex: none;
  overflow: hidden;
  border-radius: calc(var(--radius) - 1px) calc(var(--radius) - 1px) 0 0;
}
@media (hover: hover) and (pointer: fine) {
  .service-card:hover {
    transform: translateY(-6px);
    border-color: #d3c6b1;
  }
  .service-card:hover::after {
    opacity: 1;
  }
  .service-card:hover .service-img {
    transform: scale(1.06);
  }
}
/* touch: a subtle press instead of hover */
@media (hover: none) {
  .service-card:active {
    transform: scale(0.98);
  }
}
.service-img {
  flex: none;
  display: block;
  transition:
    transform var(--dur-slow) var(--ease),
    opacity var(--dur-slow) var(--ease);
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
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
