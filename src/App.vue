<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import ThemeProvider from './common/components/layout/ThemeProvider.vue';
import SidebarProvider from './common/components/layout/SidebarProvider.vue';
</script>
