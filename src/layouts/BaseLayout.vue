<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import AppToolbar from '@/components/wrappers/AppToolbar.vue'
import AppAvatar from '@/components/wrappers/AppAvatar.vue'
import AppMenu from '@/components/wrappers/AppMenu.vue'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const { user, isUserLoggedIn } = storeToRefs(userStore)

function redirectTo(name: string) {
  router.push({ name })
}

const items = ref([
  {
    label: 'Profile',
    items: [
      {
        label: t('common.settings'),
        icon: 'pi pi-cog',
        command: () => redirectTo('settings')
      },
      {
        label: t('common.logout'),
        icon: 'pi pi-sign-out',
        command: () => userStore.logout()
      }
    ]
  }
])

const menuRef = ref<InstanceType<typeof AppMenu> | null>(null)
</script>

<template>
  <AppToolbar class="toolbar">
    <template #start>
      <div class="toolbar__title" @click="redirectTo('home')">Real Estate</div>
    </template>

    <template #center>
      <AppButton :label="$t('common.home')" text plain @click="redirectTo('home')" />
      <AppButton :label="$t('common.about')" text plain @click="redirectTo('about')" />
      <AppButton
        :label="$t('common.properties')"
        text
        plain
        @click="redirectTo('properties-list')"
      />
      <AppButton :label="$t('common.blog')" text plain @click="redirectTo('blog')" />
    </template>

    <template #end>
      <div v-if="isUserLoggedIn" class="flex align-items-center gap-2 toolbar__menu">
        {{ user.fullName }}
        <AppAvatar
          :image="user.avatarUrl"
          style="width: 32px; height: 32px"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          @click="menuRef?.toggle($event)"
        />
        <AppMenu ref="menuRef" id="overlay_menu" :model="items" popup />
      </div>
      <AppButton
        v-else
        :label="$t('common.login')"
        class="toolbar__menu"
        icon="pi pi-user"
        text
        plain
        @click="redirectTo('login')"
      />
    </template>
  </AppToolbar>

  <div class="content-container">
    <RouterView />
  </div>
</template>

<style scoped>
.toolbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}
.toolbar__title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-left: 1.75rem;
  color: var(--primary-color);
}
.toolbar__menu {
  margin-right: 1.75rem;
}
.content-container {
  height: calc(100vh - 64px);
  background-color: var(--secondary-bg-color);
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
