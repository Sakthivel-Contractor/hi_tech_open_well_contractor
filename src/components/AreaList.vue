<script setup>
import { t, pick } from '../i18n.js'
import { states } from '../data/areas.js'
import AppIcon from './AppIcon.vue'

defineProps({
  // Path of the current district page, so it is not linked to itself.
  current: { type: String, default: '' },
})
</script>

<template>
  <div class="area-grid">
    <section
      v-for="s in states"
      :key="s.slug"
      :class="['area-state', { 'area-state-wide': s.districts.length > 4 }]"
    >
      <h3>
        <AppIcon name="pin" :size="20" />
        {{ pick(s.name) }}
      </h3>
      <ul>
        <li v-for="d in s.districts" :key="d.slug">
          <span v-if="`/${s.slug}/${d.slug}` === current" class="area-link is-current" aria-current="page">
            {{ pick(d.name) }}
          </span>
          <RouterLink v-else :to="`/${s.slug}/${d.slug}`" class="area-link">
            {{ pick(d.name) }}
            <AppIcon name="arrow" :size="18" />
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
  <p class="area-more">
    <AppIcon name="check" :size="20" />
    {{ t('areasMore') }}
  </p>
</template>

<style scoped>
.area-grid {
  display: grid;
  gap: 20px;
}
.area-state {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}
h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
  font-size: var(--fs-h3);
  color: var(--blue);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}
.area-state-wide ul {
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
}
.area-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 48px;
  height: 100%;
  padding: 6px 14px;
  border-radius: 10px;
  background: var(--sand);
  color: var(--ink);
  font-weight: 500;
  line-height: 1.3;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.area-link svg {
  flex: none;
  transition: transform 0.2s ease;
}
a.area-link:hover {
  background: #e9dfcf;
  color: var(--blue);
}
a.area-link:hover svg {
  transform: translateX(3px);
}
.is-current {
  background: var(--blue);
  color: #fff;
}
.area-more {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 20px 0 0;
  font-weight: 600;
  font-size: 1.08rem;
  color: var(--ink);
}
.area-more svg {
  flex: none;
  margin-top: 0.2em;
  color: var(--wa);
}
@media (min-width: 900px) {
  .area-grid {
    grid-template-columns: 3fr 1fr;
    align-items: start;
  }
}
</style>
