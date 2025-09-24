<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <ecommerce-metrics />
        <monthly-target />
      </div>
      <div class="col-span-12 xl:col-span-5">
        <monthly-sale />
      </div>

      <div class="col-span-12">
        <statistics-chart />
      </div>

      <div class="col-span-12 xl:col-span-5">
        <customer-demographic />
      </div>

      <div class="col-span-12 xl:col-span-7">
        <recent-orders />
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '@/common/components/layout/AdminLayout.vue'
import EcommerceMetrics from '@/common/components/ecommerce/EcommerceMetrics.vue'
import MonthlyTarget from '@/common/components/ecommerce/MonthlyTarget.vue'
import MonthlySale from '@/common/components/ecommerce/MonthlySale.vue'
import CustomerDemographic from '@/common/components/ecommerce/CustomerDemographic.vue'
import StatisticsChart from '@/common/components/ecommerce/StatisticsChart.vue'
import RecentOrders from '@/common/components/ecommerce/RecentOrders.vue'

export default {
  components: {
    AdminLayout,
    EcommerceMetrics,
    MonthlyTarget,
    MonthlySale,
    CustomerDemographic,
    StatisticsChart,
    RecentOrders,
  },
  name: 'Ecommerce',
}
</script>
