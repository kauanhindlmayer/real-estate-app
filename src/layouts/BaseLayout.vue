<script lang="ts" setup>
import AppToolbar from '@/components/wrappers/AppToolbar.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function redirectTo(path: string) {
  router.push({ path })
}
</script>

<template>
  <AppToolbar class="toolbar">
    <template #start>
      <div class="page-title" @click="redirectTo('/')">Real Estate</div>
    </template>

    <template #center>
      <AppButton :label="$t('baseLayout.header.links.home')" text plain @click="redirectTo('/')" />
      <AppButton
        :label="$t('baseLayout.header.links.about')"
        text
        plain
        @click="redirectTo('/about')"
      />
      <AppButton
        :label="$t('baseLayout.header.links.properties')"
        text
        plain
        @click="redirectTo('/properties')"
      />
      <AppButton
        :label="$t('baseLayout.header.links.blog')"
        text
        plain
        @click="redirectTo('/blog')"
      />
    </template>
  </AppToolbar>

  <div class="content-container">
    <router-view />
  </div>
</template>

<style scoped>
.toolbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--primary-color);
}
.content-container {
  padding: 20px;
}
</style>
