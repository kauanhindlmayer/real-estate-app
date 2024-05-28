<script lang="ts" setup>
import InlineMessage from 'primevue/inlinemessage'

interface IProps {
  text: string
}

const props = defineProps<IProps>()
</script>

<template>
  <InlineMessage v-bind="$attrs">{{ props.text }}</InlineMessage>
</template>
