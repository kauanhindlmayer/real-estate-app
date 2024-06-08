<template>
  <div class="network-error-container">
    <div class="network-error-container__content">
      <h1>{{ $t('networkError.title') }}</h1>
      <p>
        {{ $t('networkError.description-start') }}
        <a class="emphasis" @click="$router.go(-1)">{{ $t('networkError.description-link') }}</a>
        {{ $t('networkError.description-end') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.network-error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
}
.network-error-container__content {
  max-width: 600px;
}
h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}
p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}
.emphasis:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
