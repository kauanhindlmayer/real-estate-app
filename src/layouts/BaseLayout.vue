<script lang="ts" setup>
import AppToolbar from '@/components/wrappers/AppToolbar.vue'
import AppIconField from '@/components/wrappers/AppIconField.vue'
import AppInputIcon from '@/components/wrappers/AppInputIcon.vue'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function redirectTo(path: string) {
  router.push({ path })
}
</script>

<template>
  <AppToolbar>
    <template #start>
      <div class="page-title" @click="redirectTo('/')">Real Estate</div>
    </template>

    <template #center>
      <div class="flex align-items-center gap-2">
        <AppButton
          :label="$t('baseLayout.header.links.home')"
          text
          plain
          @click="redirectTo('/')"
        />
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
      </div>
    </template>

    <template #end>
      <AppIconField iconPosition="left">
        <AppInputIcon>
          <i class="pi pi-search" />
        </AppInputIcon>
        <AppInputText :placeholder="$t('baseLayout.header.buttons.search')" type="search" />
      </AppIconField>
    </template>
  </AppToolbar>

  <div class="content-container">
    <router-view />
  </div>
</template>

<style scoped>
.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #3b82f6;
}
.content-container {
  padding: 20px;
}
</style>
