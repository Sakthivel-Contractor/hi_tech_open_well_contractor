<script setup>
// Link to a section of the home page (e.g. the areas list) without a #hash in the address:
// the URL stays "/" and the page scrolls to the section. The section id travels in the
// history state, which scrollBehavior in main.js reads. Without JS it simply opens "/".
import { useRoute, useRouter } from 'vue-router'
import { prefersReducedMotion } from '../motion.js'

const props = defineProps({
  section: { type: String, required: true }, // id of the home page section, e.g. 'areas'
})

const route = useRoute()
const router = useRouter()

function go(event) {
  // let the browser handle new-tab / new-window clicks
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  if (route.path === '/') {
    document
      .getElementById(props.section)
      ?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  } else {
    router.push({ path: '/', state: { section: props.section } })
  }
}
</script>

<template>
  <a href="/" @click="go"><slot /></a>
</template>
