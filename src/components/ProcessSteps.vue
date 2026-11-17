<script setup>
// The steps of a job, from src/data/process.js.
import { pick } from '../i18n.js'
import { processSteps } from '../data/process.js'
</script>

<template>
  <ol class="steps">
    <li v-for="(step, i) in processSteps" :key="i" v-reveal="i" class="step">
      <span class="step-num" aria-hidden="true">{{ i + 1 }}</span>
      <div>
        <h3>{{ pick(step.title) }}</h3>
        <p>{{ pick(step.text) }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
}
@media (min-width: 860px) {
  .steps {
    grid-template-columns: 1fr 1fr;
    gap: 20px 32px;
  }
}
.step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.step-num {
  flex: none;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-pill);
  background: var(--blue);
  color: #fff;
  font-weight: 700;
}
.step h3 {
  margin: 4px 0 6px;
  font-size: 1.1rem;
}
.step p {
  margin: 0;
  line-height: 1.7;
}
</style>
