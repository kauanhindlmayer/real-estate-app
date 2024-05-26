<script lang="ts" setup></script>

<template>
  <div class="title" v-html="$t('help.title')" />
  <div class="description" v-html="$t('help.description')" />
  <div class="read-carefully" v-html="$t('help.readCarefully')" />
</template>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
}
.read-carefully {
  margin-top: 1rem;
  font-weight: bold;
}
</style>

<style>
span.emphasis {
  color: var(--primary-color);
}
</style>
