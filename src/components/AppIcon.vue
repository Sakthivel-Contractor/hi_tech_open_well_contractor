<script setup>
// Simple inline stroke icons (24x24). Decorative by default.
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})
</script>

<template>
  <svg
    v-if="name === 'whatsapp'"
    :width="size"
    :height="size"
    :data-icon="name"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"
    />
  </svg>
  <svg
    v-else
    :width="size"
    :height="size"
    :data-icon="name"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'phone'">
      <path
        d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"
      />
    </template>
    <template v-else-if="name === 'mail'">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </template>
    <template v-else-if="name === 'openwell'">
      <!-- round well with pulley frame -->
      <path d="M5 4h14M7 4v8M17 4v8M12 4v5" />
      <ellipse cx="12" cy="13" rx="8" ry="2.5" />
      <path d="M4 13v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
    </template>
    <template v-else-if="name === 'deepening'">
      <!-- well walls with a down arrow -->
      <path d="M5 3v14c0 2 3 4 7 4s7-2 7-4V3" />
      <path d="M12 5v10M8.5 11.5 12 15l3.5-3.5" />
    </template>
    <template v-else-if="name === 'wall'">
      <!-- stone ring wall -->
      <path d="M3 5h18v14H3z" />
      <path d="M3 9.7h18M3 14.3h18M9 5v4.7M15 5v4.7M6 9.7v4.6M12 9.7v4.6M18 9.7v4.6M9 14.3V19M15 14.3V19" />
    </template>
    <template v-else-if="name === 'cleaning'">
      <!-- shovel -->
      <path d="M17 3l4 4M19 5l-8 8" />
      <path d="M11 13l-2-2-5 5c-1 1-1 3 0 4s3 1 4 0l5-5-2-2Z" />
    </template>
    <template v-else-if="name === 'survey'">
      <!-- meter with probes -->
      <rect x="8" y="3" width="8" height="8" rx="1" />
      <path d="M10 7h4M12 11v3M4 21l3-7h10l3 7M2 21h20" />
    </template>
    <template v-else-if="name === 'check'">
      <path d="M20 6 9 17l-5-5" />
    </template>
    <template v-else-if="name === 'arrow'">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </template>
    <template v-else-if="name === 'zoom'">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4M11 8.5v5M8.5 11h5" />
    </template>
    <template v-else-if="name === 'close'">
      <path d="M6 6l12 12M18 6 6 18" />
    </template>
    <template v-else-if="name === 'prev'">
      <path d="m15 5-7 7 7 7" />
    </template>
    <template v-else-if="name === 'next'">
      <path d="m9 5 7 7-7 7" />
    </template>
    <template v-else-if="name === 'map'">
      <path d="m9 4-6 2.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4Z" />
      <path d="M9 4v13.5M15 6.5V20" />
    </template>
    <template v-else-if="name === 'alert'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 16h.01" />
    </template>
  </svg>
</template>
