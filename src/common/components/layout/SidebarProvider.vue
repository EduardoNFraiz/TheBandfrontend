<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { useSidebarProvider } from '@/common/composables/useSidebar'

useSidebarProvider()
</script>
