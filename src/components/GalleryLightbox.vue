<script setup>
// Full-size photo viewer for the "Work sites" gallery: a <dialog> with previous / next /
// close, arrow keys, Esc and swipe. Loaded only when a photo is first opened (see
// WorkGallery.vue), and full-size images are only requested while it is open.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { t, pick } from '../i18n.js'
import { workPhotos, photoAlt } from '../data/photos.js'
import { prefersReducedMotion } from '../motion.js'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  start: { type: Number, required: true }, // index of the photo to open
})
const emit = defineEmits(['close'])

const dialog = ref(null)
const current = ref(props.start)
// Drives the fade + scale-in / fade-out (the dialog stays open until the fade-out ends).
const shown = ref(false)
// Direction of the last step, so the photo slides the matching way.
const dir = ref(1)
const photo = computed(() => workPhotos[current.value])
const alt = (p) => pick(photoAlt(p.name))

const CLOSE_MS = 200 // = --dur-fast

onMounted(() => {
  dialog.value.showModal()
  document.documentElement.style.overflow = 'hidden'
  requestAnimationFrame(() => (shown.value = true))
})
onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})

let closing = false
function close() {
  if (closing) return
  closing = true
  shown.value = false
  setTimeout(
    () => {
      dialog.value?.close()
      emit('close')
    },
    prefersReducedMotion() ? 0 : CLOSE_MS,
  )
}
// Esc: animate out instead of closing at once.
function onCancel(e) {
  e.preventDefault()
  close()
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
  <dialog
    ref="dialog"
    :class="['lightbox', { 'is-shown': shown }]"
    :aria-label="t('galleryTitle')"
    @cancel="onCancel"
    @click="onBackdrop"
    @keydown="onKey"
    @touchstart.passive="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="lb-stage">
      <Transition :name="dir > 0 ? 'lb-next' : 'lb-prev'" mode="out-in">
        <picture :key="photo.name" class="lb-pic">
          <source type="image/avif" :srcset="photo.full.avif" sizes="100vw" />
          <source type="image/webp" :srcset="photo.full.webp" sizes="100vw" />
          <img
            :src="photo.full.src"
            :alt="alt(photo)"
            :width="photo.full.width"
            :height="photo.full.height"
            class="lb-img"
          />
        </picture>
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
/* the <picture> is the grid item that animates; the image fits inside it */
.lb-pic {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  min-height: 0;
  /* scale-in on open */
  transform: scale(0.94);
  transition: transform var(--dur-slow) var(--ease);
}
.is-shown .lb-pic {
  transform: scale(1);
}
.lb-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius-xs);
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
</style>
