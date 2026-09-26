<script setup>
// Five filled SVG stars; a fractional value (e.g. 4.6) fills part of the last star.
import { computed } from 'vue'
import { t } from '../i18n.js'

const props = defineProps({
  value: { type: Number, required: true },
  size: { type: Number, default: 20 },
})
const fill = computed(() => `${(Math.max(0, Math.min(5, props.value)) / 5) * 100}%`)
const label = computed(() => t('reviews.starsLabel', { n: Number(props.value.toFixed(1)) }))
const star =
  'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z'
</script>

<template>
  <span class="stars" role="img" :aria-label="label">
    <span class="row empty" aria-hidden="true">
      <svg v-for="i in 5" :key="i" :width="size" :height="size" viewBox="0 0 24 24">
        <path :d="star" />
      </svg>
    </span>
    <span class="row full" :style="{ width: fill }" aria-hidden="true">
      <svg v-for="i in 5" :key="i" :width="size" :height="size" viewBox="0 0 24 24">
        <path :d="star" />
      </svg>
    </span>
  </span>
</template>

<style scoped>
.stars {
  position: relative;
  display: inline-block;
  /* never stretch (e.g. inside a flex column): the fill width is a % of the five stars */
  width: max-content;
  align-self: flex-start;
  line-height: 0;
  vertical-align: middle;
}
.row {
  display: inline-flex;
  gap: 2px;
  white-space: nowrap;
}
.row svg {
  flex: none;
  fill: currentColor;
}
.empty {
  color: #ddd2c1;
}
.full {
  position: absolute;
  inset: 0 auto 0 0;
  overflow: hidden;
  color: #d9961a;
}
</style>
