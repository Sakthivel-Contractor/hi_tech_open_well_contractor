<script setup>
import { useHead } from '@unhead/vue'
import { t, tMeta } from '../i18n.js'

useHead({ title: tMeta('meta.notFoundTitle'), meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <section class="section">
    <div class="container narrow">
      <h1>{{ t('notFound.title') }}</h1>
      <RouterLink to="/" class="btn btn-blue">{{ t('notFound.back') }}</RouterLink>
    </div>
  </section>
</template>
