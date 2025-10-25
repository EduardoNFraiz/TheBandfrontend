<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="chartThree" class="-ml-4 min-w-[1000px] xl:min-w-full pl-2">
      <VueApexCharts type="area" height="310" :options="mergedChartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// 1. DEFINIÇÃO DAS PROPS: Receberá os dados do componente pai
const props = defineProps<{
  series: Array<any>
  chartOptions: Object // Receberá as opções dinâmicas (com o XAxis correto)
}>()

// 2. OPÇÕES BASE FIXAS (movidas do LineChart original)
// Usamos uma computed property para fundir as opções base com as opções dinâmicas
const baseChartOptions = ref({
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#465FFF', '#9CB9FF'], // Cores serão sobrescritas pelo componente pai
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'area',
    toolbar: { show: false },
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  stroke: {
    curve: 'straight',
    width: [2, 2],
  },
  markers: { size: 0 },
  dataLabels: { enabled: false },
  tooltip: { x: { format: 'dd MMM yyyy' } },
  yaxis: {
    title: { style: { fontSize: '0px' } },
  },
  // O Eixo X será definido pelo componente pai
})

// 3. FUSÃO DE OPÇÕES: Prioriza as opções enviadas pelo DeveloperDetails
const mergedChartOptions = computed(() => {
    return {
        ...baseChartOptions.value,
        ...props.chartOptions,
    }
})
</script>

<style scoped>
.area-chart {
  width: 100%;
}
</style>