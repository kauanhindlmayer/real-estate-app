<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function redirectToHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-container__content">
      <h1>404</h1>
      <h2>{{ $t('notFound.title') }}</h2>
      <p>{{ $t('notFound.description') }}</p>
      <AppButton label="Go to Homepage" @click="redirectToHome" />
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f8fafc;
  color: #333;
}
.not-found-container__content {
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
