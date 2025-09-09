<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div className="space-y-5 sm:space-y-6">
      <ComponentCard title="Responsive Image">
        <ResponsiveImage />
      </ComponentCard>
      <ComponentCard title="Image in 2 Grid">
        <TwoColumnImageGrid />
      </ComponentCard>
      <ComponentCard title="Image in 3 Grid">
        <ThreeColumnImageGrid />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/common/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/common/components/layout/AdminLayout.vue'
import ComponentCard from '@/common/components/common/ComponentCard.vue'
import ResponsiveImage from '@/common/components/ui/images/ResponsiveImage.vue'
import TwoColumnImageGrid from '@/common/components/ui/images/TwoColumnImageGrid.vue'
import ThreeColumnImageGrid from '@/common/components/ui/images/ThreeColumnImageGrid.vue'
const currentPageTitle = ref('Images')
</script>

<style></style>
