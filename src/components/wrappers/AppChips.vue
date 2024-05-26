<script lang="ts" setup>
const chips = defineModel<string[]>()
</script>

<template>
  <div class="chips-container">
    <div v-for="(chip, index) in chips" :key="index" class="chips-container__chip">
      <span>{{ chip }}</span>
    </div>
  </div>
</template>

<style scoped>
.chips-container {
  display: flex;
  flex-wrap: wrap;
}
.chips-container__chip {
  background-color: #f1f1f1;
  border-radius: 16px;
  padding: 4px 8px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}
</style>
