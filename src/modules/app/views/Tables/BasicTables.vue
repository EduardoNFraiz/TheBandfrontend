<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Basic Table 1">
        <BasicTableOne />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import PageBreadcrumb from "@/common/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/common/components/layout/AdminLayout.vue";
import ComponentCard from "@/common/components/common/ComponentCard.vue";
import BasicTableOne from "@/common/components/tables/basic-tables/BasicTableOne.vue";
const currentPageTitle = ref("Basic Tables");
</script>
