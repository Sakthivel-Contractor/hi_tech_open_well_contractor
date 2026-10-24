<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { t, lang } from '../i18n.js'
import { TAMIL_NADU_DISTRICTS, OTHER_REGIONS } from '../data/tamilnadu_districts.js'

const props = defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, required: true },
  hasError: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const search = ref('')
const searchInput = ref(null)
const root = ref(null)
const focusedIndex = ref(-1)

// Returns localized display text for a district
function getLabel(item) {
  if (lang.value === 'ta') {
    return `${item.ta} (${item.en})`
  }
  return `${item.en} - ${item.ta}`
}

function getSelectedDisplay(val) {
  if (!val) return ''
  const item = [...TAMIL_NADU_DISTRICTS, ...OTHER_REGIONS].find((d) => d.en === val)
  if (item) {
    return lang.value === 'ta' ? `${item.ta} (${item.en})` : `${item.en}`
  }
  return val
}

const allOptions = computed(() => [
  ...TAMIL_NADU_DISTRICTS.map((d) => ({ ...d, group: 'tn' })),
  ...OTHER_REGIONS.map((d) => ({ ...d, group: 'other' })),
])

const filteredOptions = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return allOptions.value
  return allOptions.value.filter((d) => {
    return (
      d.en.toLowerCase().includes(query) ||
      d.ta.includes(query)
    )
  })
})

function toggleDropdown() {
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

function openDropdown() {
  isOpen.value = true
  search.value = ''
  focusedIndex.value = -1
  nextTick(() => {
    searchInput.value?.focus()
  })
}

function closeDropdown() {
  isOpen.value = false
  search.value = ''
  focusedIndex.value = -1
}

function selectDistrict(d) {
  emit('update:modelValue', d.en)
  emit('change', d.en)
  closeDropdown()
}

function onKeydown(e) {
  if (!isOpen.value) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openDropdown()
    }
    return
  }

  if (e.key === 'Escape') {
    e.preventDefault()
    closeDropdown()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (focusedIndex.value < filteredOptions.value.length - 1) {
      focusedIndex.value++
      scrollFocusedIntoView()
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (focusedIndex.value > 0) {
      focusedIndex.value--
      scrollFocusedIntoView()
    }
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (focusedIndex.value >= 0 && focusedIndex.value < filteredOptions.value.length) {
      selectDistrict(filteredOptions.value[focusedIndex.value])
    }
  }
}

function scrollFocusedIntoView() {
  nextTick(() => {
    const el = root.value?.querySelector('.option.is-focused')
    el?.scrollIntoView({ block: 'nearest' })
  })
}

function handleClickOutside(event) {
  if (root.value && !root.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="root" class="district-search-select" @keydown="onKeydown">
    <!-- Trigger Button (styled like the existing float field inputs) -->
    <button
      type="button"
      :id="id"
      class="select-trigger"
      :class="{ 'is-active': isOpen, 'has-val': !!modelValue }"
      :aria-expanded="isOpen"
      :aria-invalid="hasError ? 'true' : 'false'"
      @click="toggleDropdown"
    >
      <span class="selected-text" :class="{ 'is-placeholder': !modelValue }">
        {{ getSelectedDisplay(modelValue) || t('form.districtPlaceholder') }}
      </span>
      <span class="trigger-chevron" :class="{ 'is-up': isOpen }">▾</span>
    </button>

    <!-- Hidden native select for standard form submissions / honeypot / autofill -->
    <input type="hidden" name="district" :value="modelValue" />

    <!-- Dropdown Panel -->
    <div v-if="isOpen" class="dropdown-panel">
      <!-- Search Input -->
      <div class="search-box">
        <span class="search-icon" aria-hidden="true">🔍</span>
        <input
          ref="searchInput"
          v-model="search"
          type="text"
          class="search-input"
          :placeholder="lang === 'ta' ? 'மாவட்டத்தை தேடவும் (Search district)...' : 'Type to search district (தமிழ் / English)...'"
          autocomplete="off"
          @keydown.stop="onKeydown"
        />
        <button
          v-if="search"
          type="button"
          class="clear-search-btn"
          @click="search = ''; searchInput?.focus()"
        >
          ✕
        </button>
      </div>

      <!-- District list -->
      <ul class="options-list" role="listbox">
        <li
          v-if="filteredOptions.length === 0"
          class="no-results"
        >
          {{ lang === 'ta' ? 'மாவட்டம் கிடைக்கவில்லை' : 'No districts found' }}
        </li>

        <li
          v-for="(d, index) in filteredOptions"
          :key="d.en"
          class="option"
          :class="{
            'is-selected': modelValue === d.en,
            'is-focused': focusedIndex === index,
            'is-other': d.group === 'other'
          }"
          role="option"
          :aria-selected="modelValue === d.en"
          @click="selectDistrict(d)"
          @mouseenter="focusedIndex = index"
        >
          <div class="option-content">
            <span class="option-name-ta">{{ d.ta }}</span>
            <span class="option-name-en">{{ d.en }}</span>
          </div>
          <span v-if="modelValue === d.en" class="check-mark">✓</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.district-search-select {
  position: relative;
  width: 100%;
}

.select-trigger {
  width: 100%;
  min-height: 52px;
  padding: 14px 14px 14px 14px;
  border: 1.5px solid #c9bda9;
  border-radius: 10px;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease);
}

.select-trigger:focus,
.select-trigger.is-active {
  outline: none;
  border-color: var(--blue);
}

.select-trigger[aria-invalid='true'] {
  border-color: var(--red);
}

.selected-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

.selected-text.is-placeholder {
  color: var(--muted);
  font-weight: normal;
}

.trigger-chevron {
  font-size: 1.1rem;
  color: var(--muted);
  transition: transform var(--dur-fast) var(--ease);
  margin-left: 8px;
}

.trigger-chevron.is-up {
  transform: rotate(180deg);
}

.dropdown-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1.5px solid var(--blue);
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 100;
  max-height: 340px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideIn 160ms ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-box {
  padding: 8px 10px;
  background: var(--sand, #f8f6f0);
  border-bottom: 1px solid #e2dacd;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-icon {
  font-size: 0.9rem;
  opacity: 0.6;
}

.search-input {
  flex: 1;
  border: 1px solid #c9bda9;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 0.95rem;
  font-family: inherit;
  background: #fff;
  color: var(--ink);
  outline: none;
}

.search-input:focus {
  border-color: var(--blue);
}

.clear-search-btn {
  background: none;
  border: none;
  padding: 4px 8px;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.9rem;
}

.options-list {
  list-style: none;
  margin: 0;
  padding: 4px 0;
  overflow-y: auto;
  flex: 1;
  max-height: 270px;
}

.options-list::-webkit-scrollbar {
  width: 6px;
}

.options-list::-webkit-scrollbar-thumb {
  background: #c9bda9;
  border-radius: 3px;
}

.option {
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid #f2ede4;
  transition: background-color 100ms ease;
}

.option:last-child {
  border-bottom: none;
}

.option.is-other {
  background: #faf7f2;
  font-style: italic;
}

.option:hover,
.option.is-focused {
  background: #e6eff5;
}

.option.is-selected {
  background: #d4e5f0;
  font-weight: 600;
}

.option-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.option-name-ta {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
}

.option-name-en {
  font-size: 0.82rem;
  color: var(--muted);
}

.check-mark {
  color: var(--blue);
  font-weight: bold;
  font-size: 1.1rem;
}

.no-results {
  padding: 20px;
  text-align: center;
  color: var(--muted);
  font-size: 0.95rem;
}
</style>
