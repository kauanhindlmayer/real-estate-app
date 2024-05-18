<script lang="ts" setup>
import Toolbar from 'primevue/toolbar'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const redirectTo = (path: string) => {
  router.push({ path })
}
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="page-title">REM</div>
    </template>

    <template #center>
      <div class="flex align-items-center gap-2">
        <Button label="Home" text plain @click="redirectTo('/')" />
        <Button label="About" text plain @click="redirectTo('/about')" />
        <Button label="Properties" text plain @click="redirectTo('/properties')" />
        <Button label="Blog" text plain @click="redirectTo('/blog')" />
      </div>
    </template>

    <template #end>
      <IconField iconPosition="left">
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText placeholder="Search" />
      </IconField>
    </template>
  </Toolbar>

  <div class="content-container">
    <router-view />
  </div>
</template>

<style scoped>
.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #3b82f6;
}
.content-container {
  padding: 20px;
}
</style>
