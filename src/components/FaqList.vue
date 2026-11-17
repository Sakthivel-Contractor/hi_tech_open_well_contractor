<script setup>
// Questions and answers from src/data/faqs.js as <details> blocks: the answers are in the
// pre-rendered HTML (readable by search engines and AI tools), and open with a tap.
import { computed } from 'vue'
import { pick } from '../i18n.js'
import { faqsFor } from '../data/faqs.js'

const props = defineProps({
  // 'home', 'cost', or a service key such as 'deepening'
  page: { type: String, required: true },
})
const list = computed(() => faqsFor(props.page))
</script>

<template>
  <div v-if="list.length" class="faq-list">
    <details v-for="(f, i) in list" :key="i" v-reveal="i" class="faq">
      <summary>
        <span>{{ pick(f.q) }}</span>
        <span class="faq-mark" aria-hidden="true"></span>
      </summary>
      <p>{{ pick(f.a) }}</p>
    </details>
  </div>
</template>

<style scoped>
.faq-list {
  display: grid;
  gap: 10px;
}
.faq {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}
summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 56px;
  padding: 14px 18px;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}
summary::-webkit-details-marker {
  display: none;
}
.faq-mark {
  flex: none;
  position: relative;
  width: 14px;
  height: 14px;
}
.faq-mark::before,
.faq-mark::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 0;
  width: 14px;
  height: 2px;
  background: var(--red);
  transition: transform var(--dur-fast) var(--ease);
}
.faq-mark::after {
  transform: rotate(90deg);
}
.faq[open] .faq-mark::after {
  transform: rotate(0deg);
}
.faq p {
  margin: 0;
  padding: 0 18px 16px;
  line-height: 1.7;
}
</style>
