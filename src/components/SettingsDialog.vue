<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
import BaseDialog from '@/components/wrappers/misc/BaseDialog.vue'
import BaseSelect from '@/components/wrappers/form/BaseSelect.vue'
import useBaseToast from '@/composables/useBaseToast'
import useTheme from '@/composables/useTheme'

const i18n = useI18n()
const toast = useBaseToast()

const { selectedTheme, themesOptions, setTheme } = useTheme()
const { selectedLanguage, languagesOptions, setLanguage } = useLanguage()

function useLanguage() {
  const selectedLanguage = useStorage<'en-US' | 'pt-BR'>('locale', 'en-US')

  const languagesOptions = [
    { label: i18n.t('settings.english'), value: 'en-US' },
    { label: i18n.t('settings.portuguese'), value: 'pt-BR' }
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

function saveChanges() {
  setLanguage()
  setTheme()
  closeDialog()
  toast.success({ message: i18n.t('settings.messages.settingsSaved') })
}

const isVisible = ref(false)

function openDialog() {
  isVisible.value = true
}

function closeDialog() {
  isVisible.value = false
}

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
          :label="$t('settings.language')"
          :placeholder="$t('settings.selectLanguage')"
          :options="languagesOptions"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="col-12">
        <BaseSelect
          v-model="selectedTheme"
          :label="$t('settings.theme')"
          :placeholder="$t('settings.selectTheme')"
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
