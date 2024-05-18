<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push({ path: '/' })
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-container__content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button class="home-button" @click="goToHome">Go to Homepage</button>
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
  color: #3b82f6;
}
h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}
.home-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.home-button:hover {
  background-color: #2563eb;
}
</style>
