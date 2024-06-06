<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePrimeVue } from 'primevue/config'
import { useStorage } from '@vueuse/core'
import BaseDialog from '@/components/wrappers/misc/BaseDialog.vue'
import BaseSelect from '@/components/wrappers/form/BaseSelect.vue'
import useBaseToast from '@/composables/useBaseToast'
import useBaseDialog from '@/composables/useBaseDialog'

const i18n = useI18n()
const toast = useBaseToast()

const { selectedTheme, themesOptions, setTheme } = useTheme()
const { selectedLanguage, languagesOptions, setLanguage } = useLanguage()
const { isVisible, openDialog, closeDialog } = useBaseDialog()

function useLanguage() {
  const selectedLanguage = useStorage<'en-US' | 'pt-BR'>('locale', 'en-US')

  const languagesOptions = [
    { label: i18n.t('common.english'), value: 'en-US' },
    { label: i18n.t('common.portuguese'), value: 'pt-BR' }
  ]

  function setLanguage() {
    i18n.locale.value = selectedLanguage.value
  }

  return {
    selectedLanguage,
    languagesOptions,
    setLanguage
  }
}

function useTheme() {
  const primeVue = usePrimeVue()

  const selectedTheme = useStorage<'light' | 'dark'>('theme', 'light')

  const themesOptions = [
    { label: i18n.t('common.light'), value: 'light' },
    { label: i18n.t('common.dark'), value: 'dark' }
  ]

  const themeMap = {
    dark: { current: 'aura-light-blue', new: 'aura-dark-blue' },
    light: { current: 'aura-dark-blue', new: 'aura-light-blue' }
  }

  function setTheme() {
    const { current, new: newTheme } = themeMap[selectedTheme.value]
    primeVue.changeTheme(current, newTheme, 'theme-link', () => {})
  }

  return {
    selectedTheme,
    themesOptions,
    setTheme
  }
}

function saveChanges() {
  setLanguage()
  setTheme()
  closeDialog()
  toast.success({ message: i18n.t('common.settingsSaved') })
}

onBeforeMount(() => setTheme())

defineExpose({
  openDialog,
  closeDialog
})
</script>

<template>
  <BaseDialog v-bind="$attrs" v-model:visible="isVisible" class="w-8 md:w-4 xl:w-2">
    <template #header>
      <div class="header">
        <h2>{{ $t('common.settings') }}</h2>
      </div>
    </template>
    <form class="grid" @submit.prevent="saveChanges">
      <div class="col-12">
        <BaseSelect
          v-model="selectedLanguage"
          :label="$t('common.language')"
          :placeholder="$t('common.selectLanguage')"
          :options="languagesOptions"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="col-12">
        <BaseSelect
          v-model="selectedTheme"
          :label="$t('common.theme')"
          :placeholder="$t('common.selectTheme')"
          :options="themesOptions"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="col-12 text-right">
        <BaseButton
          type="submit"
          icon="pi pi-check"
          class="w-6 mt-4 xl:w-5"
          :label="$t('common.save')"
        />
      </div>
    </form>
  </BaseDialog>
</template>

<style scoped>
.header h2 {
  margin: 0.25rem;
}
</style>
