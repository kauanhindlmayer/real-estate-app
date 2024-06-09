<script lang="ts" setup>
import { t } from '@/plugins/i18n'
import { useRouter } from 'vue-router'

withDefaults(defineProps<{ resource: string }>(), {
  resource: t('common.page')
})

const router = useRouter()

function redirectToHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="not-found">
    <div class="not-found__message">
      <h1>404</h1>
      <h2>{{ $t('common.notFound') }}</h2>
      <p>{{ $t('notFound.description', { resource }) }}</p>
      <BaseButton label="Go to Homepage" @click="redirectToHome" />
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
}
.not-found__message {
  max-width: 600px;
}
h1 {
  font-size: 5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}
h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}
</style>
