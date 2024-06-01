<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import BaseAvatar from '@/components/wrappers/misc/BaseAvatar.vue'
import BaseMenu from '@/components/wrappers/menu/BaseMenu.vue'
import BaseMenubar from '@/components/wrappers/menu/BaseMenubar.vue'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const { user, isLoggedIn } = storeToRefs(userStore)

function redirectTo(name: string) {
  router.push({ name })
}

const menubarItems = ref([
  {
    label: t('common.home'),
    command: () => redirectTo('home')
  },
  {
    label: t('common.properties'),
    command: () => redirectTo('properties-list')
  },
  {
    label: t('common.advertise'),
    command: () => redirectTo('property-advertise')
  },
  {
    label: t('common.help'),
    items: [
      {
        label: t('common.security'),
        route: '/security'
      }
    ]
  }
])

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

const menuRef = ref<InstanceType<typeof BaseMenu> | null>(null)
</script>

<template>
  <BaseMenubar :model="menubarItems">
    <template #start>
      <div class="menubar__start" @click="redirectTo('home')">Real Estate</div>
    </template>

    <template #end>
      <div
        v-if="isLoggedIn"
        class="flex align-items-center gap-2 menubar__end"
        @click="menuRef?.toggle($event)"
      >
        {{ user.fullName }}
        <BaseAvatar
          :image="user.avatarUrl"
          style="width: 32px; height: 32px"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <BaseMenu ref="menuRef" id="overlay_menu" :model="items" popup />
      </div>
      <BaseButton
        v-else
        :label="$t('common.login')"
        class="menubar__end"
        icon="pi pi-user"
        text
        plain
        @click="redirectTo('login')"
      />
    </template>
  </BaseMenubar>

  <div class="content-container">
    <RouterView />
  </div>
</template>

<style scoped>
.menubar__start {
  font-size: 1.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
  color: var(--primary-color);
}
.menubar__end {
  margin-right: 0.5rem;
  cursor: pointer;
}
.content-container {
  height: calc(100vh - 64px);
  background-color: var(--secondary-bg-color);
  padding: 1.5rem;
  overflow-y: auto;
}
</style>

<style>
.p-menubar-root-list,
.p-menubar-button {
  position: absolute;
  left: 40%;
}
@media screen and (max-width: 960px) {
  .p-menubar-root-list,
  .p-menubar-button {
    position: static;
    margin-left: 2rem;
  }
}
</style>
