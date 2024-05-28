<script setup lang="ts">
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

interface IProps {
  icon: string
  iconPosition: 'left' | 'right'
}

const props = withDefaults(defineProps<IProps>(), {
  icon: '',
  iconPosition: 'left'
})
</script>

<template>
  <IconField :iconPosition="props.iconPosition">
    <InputIcon :class="props.icon" />
    <InputText v-bind="$attrs" />
  </IconField>
</template>
