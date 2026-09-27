<script setup>
// <picture> for an image from src/generated/photos.json: AVIF first, WebP fallback, and the
// browser picks the size from `sizes`. Extra attributes (class, loading, fetchpriority...)
// go on the <img>. `fade` makes a lazy image fade in once it has loaded.
defineOptions({ inheritAttrs: false })
defineProps({
  image: { type: Object, required: true }, // { width, height, avif, webp, src }
  sizes: { type: String, required: true },
  alt: { type: String, required: true },
  fade: { type: Boolean, default: false },
})
</script>

<template>
  <picture>
    <source type="image/avif" :srcset="image.avif" :sizes="sizes" />
    <source type="image/webp" :srcset="image.webp" :sizes="sizes" />
    <img
      v-if="fade"
      v-fade-img
      v-bind="$attrs"
      :src="image.src"
      :width="image.width"
      :height="image.height"
      :alt="alt"
    />
    <img v-else v-bind="$attrs" :src="image.src" :width="image.width" :height="image.height" :alt="alt" />
  </picture>
</template>
