<script setup>
// Grid of every public/images/work-*.jpg photo. Tapping one opens it full size in a
// lightbox (<dialog>) with previous / next / close, arrow keys, Esc and swipe.
import { ref, computed, nextTick } from 'vue'
import { t, pick } from '../i18n.js'
import { workPhotos, photoAlt } from '../data/photos.js'
import { prefersReducedMotion } from '../motion.js'
import AppIcon from './AppIcon.vue'

const dialog = ref(null)
const current = ref(0)
// The full-size image is only rendered while open, so it never downloads with the page.
const isOpen = ref(false)
// Drives the fade + scale-in / fade-out (the dialog stays open until the fade-out ends).
const shown = ref(false)
// Direction of the last step, so the photo slides the matching way.
const dir = ref(1)
const photo = computed(() => (isOpen.value ? workPhotos[current.value] : null))
const alt = (p) => pick(photoAlt(p.name))

const CLOSE_MS = 200 // = --dur-fast

async function open(i) {
  current.value = i
  isOpen.value = true
  await nextTick() // render the buttons first, so focus lands on "close"
  dialog.value.showModal()
  document.documentElement.style.overflow = 'hidden'
  requestAnimationFrame(() => (shown.value = true))
}
let closeTimer = null
function close() {
  if (!dialog.value?.open || closeTimer) return
  shown.value = false
  closeTimer = setTimeout(
    () => {
      closeTimer = null
      dialog.value?.close()
      onClose()
    },
    prefersReducedMotion() ? 0 : CLOSE_MS,
  )
}
// Esc: animate out instead of closing at once.
function onCancel(e) {
  e.preventDefault()
  close()
}
// Also runs on the dialog's own `close` event. Safe to run twice.
function onClose() {
  isOpen.value = false
  shown.value = false
  document.documentElement.style.overflow = ''
}
function step(delta) {
  dir.value = delta
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
    <li v-for="(p, i) in workPhotos" :key="p.name" v-reveal="i % 4">
      <button type="button" class="tile img-placeholder" @click="open(i)">
        <img
          v-fade-img
          :src="p.tile"
          :srcset="`${p.tile} 600w, ${p.src} 1200w`"
          sizes="(min-width: 1200px) 25vw, (min-width: 900px) 33vw, 50vw"
          :alt="alt(p)"
          :width="p.width"
          :height="p.height"
          loading="lazy"
          decoding="async"
        />
        <span class="tile-overlay" aria-hidden="true">
          <AppIcon name="zoom" :size="34" />
        </span>
      </button>
    </li>
  </ul>

  <dialog
    ref="dialog"
    :class="['lightbox', { 'is-shown': shown }]"
    :aria-label="t('galleryTitle')"
    @cancel="onCancel"
    @close="onClose"
    @click="onBackdrop"
    @keydown="onKey"
    @touchstart.passive="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div v-if="photo" class="lb-stage">
      <Transition :name="dir > 0 ? 'lb-next' : 'lb-prev'" mode="out-in">
        <img
          :key="photo.name"
          :src="photo.src"
          :alt="alt(photo)"
          :width="photo.width"
          :height="photo.height"
          class="lb-img"
        />
      </Transition>
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
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: zoom-in;
  -webkit-tap-highlight-color: transparent;
  transition: transform var(--dur-fast) var(--ease);
}
.tile img {
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
  .tile:hover img {
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

.lightbox {
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: rgba(12, 10, 8, 0.92);
  color: #fff;
  --focus: var(--accent-light);
  /* fade in / out (the class is toggled from the script) */
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease);
}
.lightbox.is-shown {
  opacity: 1;
  transition-duration: var(--dur-slow);
}
.lightbox::backdrop {
  background: transparent;
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
  border-radius: var(--radius-xs);
}
/* scale-in on open */
.lb-stage > .lb-img {
  transform: scale(0.94);
  transition: transform var(--dur-slow) var(--ease);
}
.is-shown .lb-stage > .lb-img {
  transform: scale(1);
}
/* previous / next: the photo slides the way you moved */
.lb-next-enter-active,
.lb-prev-enter-active {
  transition:
    opacity var(--dur-slow) var(--ease),
    transform var(--dur-slow) var(--ease) !important;
}
.lb-next-leave-active,
.lb-prev-leave-active {
  transition:
    opacity 120ms var(--ease),
    transform 120ms var(--ease) !important;
}
.lb-next-enter-from,
.lb-prev-leave-to {
  opacity: 0;
  transform: translateX(32px) !important;
}
.lb-next-leave-to,
.lb-prev-enter-from {
  opacity: 0;
  transform: translateX(-32px) !important;
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
  transition:
    background-color var(--dur-fast) var(--ease),
    scale var(--dur-fast) var(--ease);
}
.lb-btn:active {
  scale: 0.92;
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
