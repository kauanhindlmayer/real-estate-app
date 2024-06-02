<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
import BaseDialog from '@/components/wrappers/misc/BaseDialog.vue'
import BaseSelect from '@/components/wrappers/form/BaseSelect.vue'

const i18n = useI18n()

const isVisible = ref(false)
const selectedLanguage = useStorage<'en-US' | 'pt-BR'>('locale', 'en-US')

const languagesOptions = [
  { label: i18n.t('common.english'), value: 'en-US' },
  { label: i18n.t('common.portuguese'), value: 'pt-BR' }
]

function setLanguage() {
  i18n.locale.value = selectedLanguage.value
}

function saveChanges() {
  setLanguage()
  closeDialog()
}

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
  <BaseDialog v-bind="$attrs" v-model:visible="isVisible" class="w-9 md:w-6 xl:w-3">
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
