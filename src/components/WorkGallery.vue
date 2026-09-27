<script setup>
// Grid of every public/images/work-*.jpg photo (small thumbnails). Tapping one opens the
// full-size photo in GalleryLightbox, which is its own chunk: it downloads on first touch /
// hover of a tile, so it costs nothing for visitors who never open a photo.
import { ref, defineAsyncComponent } from 'vue'
import { pick } from '../i18n.js'
import { workPhotos, photoAlt } from '../data/photos.js'
import AppIcon from './AppIcon.vue'
import ResponsiveImage from './ResponsiveImage.vue'

const loadLightbox = () => import('./GalleryLightbox.vue')
const GalleryLightbox = defineAsyncComponent(loadLightbox)
let prefetched = false
function prefetch() {
  if (prefetched) return
  prefetched = true
  loadLightbox()
}

const openAt = ref(null) // index of the open photo, or null
const lastTile = ref(null)
function open(i, event) {
  lastTile.value = event.currentTarget
  openAt.value = i
}
function onClose() {
  openAt.value = null
  lastTile.value?.focus()
}
const alt = (p) => pick(photoAlt(p.name))
// Tile width: 2 columns on phones, 3 from 900px, 4 from 1200px.
const TILE_SIZES = '(min-width: 1200px) 25vw, (min-width: 900px) 33vw, 50vw'
</script>

<template>
  <ul class="gallery">
    <li v-for="(p, i) in workPhotos" :key="p.name" v-reveal="i % 4">
      <button
        type="button"
        class="tile img-placeholder"
        @click="open(i, $event)"
        @pointerenter="prefetch"
        @touchstart.passive="prefetch"
        @focus="prefetch"
      >
        <ResponsiveImage
          :image="p.thumb"
          :sizes="TILE_SIZES"
          :alt="alt(p)"
          fade
          loading="lazy"
          decoding="async"
        />
        <span class="tile-overlay" aria-hidden="true">
          <AppIcon name="zoom" :size="34" />
        </span>
      </button>
    </li>
  </ul>

  <GalleryLightbox v-if="openAt !== null" :start="openAt" @close="onClose" />
</template>

<style scoped>
.gallery {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.tile {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: zoom-in;
  -webkit-tap-highlight-color: transparent;
  transition: transform var(--dur-fast) var(--ease);
}
/* :deep: the <img> is inside ResponsiveImage's <picture>, which carries no scope id */
.tile :deep(img) {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition:
    transform var(--dur-slow) var(--ease),
    opacity var(--dur-slow) var(--ease);
}
/* dark overlay with a zoom icon */
.tile-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(20, 16, 12, 0.42);
  color: #fff;
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease);
}
.tile-overlay svg {
  transform: scale(0.8);
  transition: transform var(--dur-fast) var(--ease);
}
@media (hover: hover) {
  .tile:hover :deep(img) {
    transform: scale(1.06);
  }
  .tile:hover .tile-overlay {
    opacity: 1;
  }
  .tile:hover .tile-overlay svg {
    transform: scale(1);
  }
}
.tile:focus-visible .tile-overlay {
  opacity: 1;
}
.tile:active {
  transform: scale(0.98);
}
.tile:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 3px;
}


@media (min-width: 900px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
}
@media (min-width: 1200px) {
  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
