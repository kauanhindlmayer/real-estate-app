<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import AppToolbar from '@/components/wrappers/AppToolbar.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import AppAvatar from '@/components/wrappers/AppAvatar.vue'
import AppMenu from '@/components/wrappers/AppMenu.vue'

const router = useRouter()
const userStore = useUserStore()

function redirectTo(name: string) {
  router.push({ name })
}

const items = ref([
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => redirectTo('settings')
      },
      {
        label: 'Logout',
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
      <div class="page-title" @click="redirectTo('home')">Real Estate</div>
    </template>

    <template #center>
      <AppButton
        :label="$t('baseLayout.header.links.home')"
        text
        plain
        @click="redirectTo('home')"
      />
      <AppButton
        :label="$t('baseLayout.header.links.about')"
        text
        plain
        @click="redirectTo('about')"
      />
      <AppButton
        :label="$t('baseLayout.header.links.properties')"
        text
        plain
        @click="redirectTo('properties-list')"
      />
      <AppButton
        :label="$t('baseLayout.header.links.blog')"
        text
        plain
        @click="redirectTo('blog')"
      />
    </template>

    <template #end>
      <div v-if="userStore.isUserLoggedIn" class="flex align-items-center gap-2 mr-4">
        {{ userStore.user?.fullName || $t('baseLayout.header.links.guest') }}
        <AppAvatar
          :image="userStore.user?.avatar"
          style="width: 32px; height: 32px"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          @click="menuRef?.toggle($event)"
        />
        <AppMenu ref="menuRef" id="overlay_menu" :model="items" popup />
      </div>
      <AppButton
        v-else
        :label="$t('baseLayout.header.links.login')"
        class="mr-4"
        icon="pi pi-user"
        text
        plain
        @click="redirectTo('login')"
      />
    </template>
  </AppToolbar>

  <div class="content">
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
  margin-left: 2rem;
  color: var(--primary-color);
}
.content {
  height: calc(100vh - 64px);
  background-color: var(--secondary-bg-color);
}
</style>
