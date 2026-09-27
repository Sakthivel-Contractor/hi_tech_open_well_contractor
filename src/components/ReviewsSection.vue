<script setup>
// Customer reviews from src/data/reviews.js: a swipe carousel on mobile, 3 columns on desktop.
// Home page: all filled reviews, or a "coming soon" card when there are none.
// District page (pass `district`): only that district's reviews; hidden when there are none.
// Sample reviews (isSample) are left out of the average and count.
import { computed, ref } from 'vue'
import { lang, t, messages } from '../i18n.js'
import { business } from '../data/business.js'
import { filledReviews, reviewsForDistrict, ratingOf, ratingSummary, fieldIn } from '../data/reviews.js'
import StarRating from './StarRating.vue'

const props = defineProps({
  district: { type: Object, default: null },
})

const list = computed(() => (props.district ? reviewsForDistrict(props.district) : filledReviews))
const summary = computed(() => ratingSummary(list.value))
const googleUrl = /^https?:\/\//.test(business.googleReviewUrl) ? business.googleReviewUrl : null

const field = (value) => fieldIn(value, lang.value)
// 'openwell' etc. -> service name in the page language; anything else is shown as written.
const workLabel = (work) => {
  const key = field(work)
  return key in messages.en.services ? t(`services.${key}.name`) : key
}
const place = (r) => [field(r.village), field(r.district)].filter(Boolean).join(', ')

// First letter of the name; Intl.Segmenter keeps Tamil letters like "கி" whole.
function initial(name) {
  const s = name.trim()
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const first = new Intl.Segmenter().segment(s)[Symbol.iterator]().next().value
    if (first) return first.segment.toUpperCase()
  }
  return [...s][0]?.toUpperCase() ?? ''
}

// Mobile carousel: which card is in view, for the dots under it.
const listEl = ref(null)
const active = ref(0)
let ticking = false
function onListScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    const el = listEl.value
    const card = el?.firstElementChild
    if (!card) return
    const stepWidth = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0)
    active.value = Math.min(list.value.length - 1, Math.round(el.scrollLeft / stepWidth))
  })
}
function goTo(i) {
  const card = listEl.value?.children[i]
  if (card) listEl.value.scrollTo({ left: card.offsetLeft - listEl.value.firstElementChild.offsetLeft })
}

const countText = computed(() =>
  summary.value.count === 1 ? t('reviews.countOne') : t('reviews.count', { n: summary.value.count }),
)
</script>

<template>
  <section v-if="list.length || !district" class="section reviews-section" id="reviews">
    <div class="container">
      <h2 v-reveal>{{ t('reviews.title') }}</h2>

      <div v-reveal class="reviews-head">
        <p v-if="summary.count && summary.average !== null" class="summary">
          <span class="summary-avg">{{ summary.average.toFixed(1) }}</span>
          <StarRating :value="summary.average" :size="22" />
          <span class="summary-count">{{ countText }}</span>
        </p>
        <a
          v-if="googleUrl"
          :href="googleUrl"
          class="btn btn-outline btn-small google-btn"
          target="_blank"
          rel="noopener"
        >
          {{ t('reviews.rateUs') }}
        </a>
      </div>

      <ul
        v-if="list.length"
        ref="listEl"
        class="review-list"
        @scroll.passive="onListScroll"
        tabindex="0"
        :aria-label="t('reviews.listLabel')"
      >
        <li v-for="(r, i) in list" :key="i" v-reveal="i % 3" class="review-card">
          <StarRating v-if="ratingOf(r) !== null" :value="ratingOf(r)" :size="20" />
          <blockquote class="review-text">
            <p>“{{ field(r.text) }}”</p>
          </blockquote>
          <div class="reviewer">
            <img
              v-if="r.photo"
              v-fade-img
              :src="r.photo"
              alt=""
              width="52"
              height="52"
              loading="lazy"
              decoding="async"
              class="avatar"
            />
            <span v-else class="avatar avatar-initial" aria-hidden="true">{{ initial(field(r.name)) }}</span>
            <span class="reviewer-info">
              <span class="reviewer-line">
                <span class="reviewer-name">{{ field(r.name) }}</span><template v-if="place(r)">, <span class="reviewer-place">{{ place(r) }}</span></template>
              </span>
              <span v-if="workLabel(r.work)" class="work-tag">{{ workLabel(r.work) }}</span>
            </span>
          </div>
        </li>
      </ul>
      <!-- carousel position (mobile only); the list itself is swipe/scroll and keyboard accessible -->
      <div v-if="list.length > 1" class="review-dots" aria-hidden="true">
        <button
          v-for="(r, i) in list"
          :key="i"
          type="button"
          tabindex="-1"
          :class="['dot', { 'is-active': i === active }]"
          @click="goTo(i)"
        ></button>
      </div>

      <p v-else-if="!list.length" v-reveal class="review-card review-empty">{{ t('reviews.comingSoon') }}</p>
    </div>
  </section>
</template>

<style scoped>
.reviews-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  margin: 8px 0 28px;
}
.summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  margin: 0;
}
.summary-avg {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 2rem;
  line-height: 1;
  color: var(--ink);
}
.summary-count {
  color: var(--muted);
  font-weight: 500;
}
.google-btn {
  flex: none;
}

/* Mobile: one card at a time, swipe sideways (next card peeks in). */
.review-list {
  list-style: none;
  margin: 0 -16px;
  padding: 4px 16px 16px;
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 16px;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.review-list::-webkit-scrollbar {
  display: none;
}
.review-dots {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 4px;
}
.dot {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}
.dot::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: var(--radius-pill);
  background: var(--blue);
  opacity: 0.25;
  transition:
    transform var(--dur-fast) var(--ease),
    opacity var(--dur-fast) var(--ease);
}
.dot.is-active::before {
  opacity: 1;
  transform: scaleX(2.25);
}
.review-list:focus-visible {
  outline-offset: -3px;
}
.review-card {
  position: relative;
  flex: 0 0 min(86%, 360px);
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}
.review-text {
  flex: 1;
  margin: 0;
}
.review-text p {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.65;
}
.reviewer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.avatar {
  flex: none;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
}
.avatar-initial {
  display: grid;
  place-items: center;
  background: var(--blue);
  color: #fff;
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1;
}
.reviewer-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.35;
}
.reviewer-name {
  font-weight: 600;
}
.reviewer-line {
  color: var(--muted);
}
.reviewer-line .reviewer-name {
  color: var(--ink);
}
.work-tag {
  align-self: flex-start;
  margin-top: 6px;
  padding: 2px 10px;
  border-radius: 8px; /* long Tamil work names can wrap to two lines */
  background: #f6e9df;
  color: var(--red-dark);
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 1.5;
}
.review-empty {
  max-width: 560px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--muted);
}

/* Desktop: 3-column grid, every card the same height. */
@media (min-width: 900px) {
  .review-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    gap: 20px;
    margin: 0;
    padding: 0;
    overflow: visible;
  }
  .review-dots {
    display: none;
  }
  .review-empty {
    margin: 0 auto;
  }
}
</style>
