<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import AppToolbar from '@/components/wrappers/AppToolbar.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import AppAvatar from '@/components/wrappers/AppAvatar.vue'

const router = useRouter()
const userStore = useUserStore()

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

    <template #end>
      <div v-if="userStore.isUserLoggedIn">
        {{ userStore.user?.fullName || $t('baseLayout.header.links.guest') }}
        <AppAvatar
          class="ml-2"
          :image="userStore.user?.avatar"
          :icon="userStore.user?.avatar ? undefined : 'pi pi-user'"
          shape="circle"
        />
      </div>
      <AppButton
        v-else
        :label="$t('baseLayout.header.links.login')"
        icon="pi pi-user"
        text
        plain
        @click="redirectTo('/login')"
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
