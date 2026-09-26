<script setup>
// Grid of every public/images/work-*.jpg photo. Tapping one opens it full size in a
// lightbox (<dialog>) with previous / next / close, arrow keys, Esc and swipe.
import { ref, computed, nextTick } from 'vue'
import { t, pick } from '../i18n.js'
import { workPhotos, photoAlt } from '../data/photos.js'
import AppIcon from './AppIcon.vue'

const dialog = ref(null)
const current = ref(0)
// The full-size image is only rendered while open, so it never downloads with the page.
const isOpen = ref(false)
const photo = computed(() => (isOpen.value ? workPhotos[current.value] : null))
const alt = (p) => pick(photoAlt(p.name))

async function open(i) {
  current.value = i
  isOpen.value = true
  await nextTick() // render the buttons first, so focus lands on "close"
  dialog.value.showModal()
  document.documentElement.style.overflow = 'hidden'
}
function close() {
  dialog.value.close()
  onClose()
}
// Also runs on the dialog's own `cancel` / `close` events (Esc key). Safe to run twice.
function onClose() {
  isOpen.value = false
  document.documentElement.style.overflow = ''
}
function step(delta) {
  current.value = (current.value + delta + workPhotos.length) % workPhotos.length
}
function onKey(e) {
  if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === 'ArrowRight') step(1)
}
// Tap on the dark backdrop (outside the photo and buttons) closes.
function onBackdrop(e) {
  if (e.target === dialog.value || e.target.classList.contains('lb-stage')) close()
}

let touchX = null
function onTouchStart(e) {
  touchX = e.touches[0].clientX
}
function onTouchEnd(e) {
  if (touchX === null) return
  const dx = e.changedTouches[0].clientX - touchX
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
  touchX = null
}
</script>

<template>
  <ul class="gallery">
    <li v-for="(p, i) in workPhotos" :key="p.name">
      <button type="button" class="tile" @click="open(i)">
        <img
          :src="p.tile"
          :srcset="`${p.tile} 600w, ${p.src} 1200w`"
          sizes="(min-width: 1200px) 25vw, (min-width: 900px) 33vw, 50vw"
          :alt="alt(p)"
          :width="p.width"
          :height="p.height"
          loading="lazy"
          decoding="async"
        />
      </button>
    </li>
  </ul>

  <dialog
    ref="dialog"
    class="lightbox"
    :aria-label="t('galleryTitle')"
    @cancel="onClose"
    @close="onClose"
    @click="onBackdrop"
    @keydown="onKey"
    @touchstart.passive="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div v-if="photo" class="lb-stage">
      <img
        :key="photo.name"
        :src="photo.src"
        :alt="alt(photo)"
        :width="photo.width"
        :height="photo.height"
        class="lb-img"
      />
      <p class="lb-count" aria-live="polite">{{ current + 1 }} / {{ workPhotos.length }}</p>
      <button type="button" class="lb-btn lb-close" :aria-label="t('lightbox.close')" @click="close">
        <AppIcon name="close" :size="28" />
      </button>
      <template v-if="workPhotos.length > 1">
        <button type="button" class="lb-btn lb-prev" :aria-label="t('lightbox.prev')" @click="step(-1)">
          <AppIcon name="prev" :size="32" />
        </button>
        <button type="button" class="lb-btn lb-next" :aria-label="t('lightbox.next')" @click="step(1)">
          <AppIcon name="next" :size="32" />
        </button>
      </template>
    </div>
  </dialog>
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
  border-radius: 10px;
  overflow: hidden;
  background: #d9cfbf;
  cursor: zoom-in;
}
.tile img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.tile:hover img {
  transform: scale(1.03);
}
.tile:focus-visible {
  outline: 3px solid var(--accent-light);
  outline-offset: 2px;
}

.lightbox {
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
}
.lightbox::backdrop {
  background: rgba(12, 10, 8, 0.92);
}
.lb-stage {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 56px 12px;
}
.lb-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 6px;
}
.lb-count {
  position: absolute;
  top: 14px;
  left: 16px;
  margin: 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}
.lb-btn {
  position: absolute;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.lb-btn:hover,
.lb-btn:focus-visible {
  background: rgba(255, 255, 255, 0.3);
}
.lb-close {
  top: 6px;
  right: 8px;
}
.lb-prev,
.lb-next {
  top: 50%;
  transform: translateY(-50%);
}
.lb-prev {
  left: 8px;
}
.lb-next {
  right: 8px;
}

@media (min-width: 900px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .lb-stage {
    padding: 64px 88px;
  }
  .lb-prev {
    left: 20px;
  }
  .lb-next {
    right: 20px;
  }
}
@media (min-width: 1200px) {
  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
