<script lang="ts" setup>
const isCollapsed = defineModel()
</script>

<template>
  <div :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">
    <div class="sidebar__header">
      <slot name="header" />
    </div>
    <div class="sidebar__content">
      <slot name="default" />
    </div>
    <div class="sidebar__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(100vw / 7);
  height: calc(100vh - 64px);
  animation: slideIn 0.5s ease;
  padding: 1rem;
  background-color: var(--primary-bg-color);
}
.sidebar--collapsed {
  display: none;
}
.sidebar__header {
  flex: 0 0 auto;
}

.sidebar__content {
  flex: 1 1 auto;
  overflow-y: auto;
}
.sidebar__footer {
  flex: 0 0 auto;
}
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
