<template>
  <AdminLayout>
    <div class="p-6 relative">
      <div class="flex flex-col mb-6 w-full">
        <h1 class="mb-2 font-semibold text-title-md text-[#2563EB]">
          Estatísticas da Organização
        </h1>
        <p class="text-sm text-[#A0A0A0] mb-4">
          Visualização detalhada do desempenho geral e da velocidade da organização.
        </p>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Status Geral
      </h2>
      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-8">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Total</th>
              <th scope="col" class="px-6 py-3">Fechadas</th>
              <th scope="col" class="px-6 py-3">Abertas</th>
              <th scope="col" class="px-6 py-3">% Fechadas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D]">
              <td colspan="4" class="px-6 py-4 text-center">Carregando dados...</td>
            </tr>
            <tr 
              v-else-if="orgSummary"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ orgSummary.total }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ orgSummary.closed }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ orgSummary.open }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap font-semibold text-green-600 dark:text-green-400">
                {{ calculatePercentage(orgSummary.closed, orgSummary.total) }}%
              </td>
            </tr>
            <tr v-else>
              <td colspan="4" class="px-6 py-4 text-center">Dados de resumo não encontrados.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Entregas Semanais da Organização
      </h2>
      <p v-if="!isLoading" class="text-sm text-[#A0A0A0] mb-4">
        Velocidade média semanal: <span class="font-semibold text-black dark:text-white">{{ averageWeeklyVelocity.toFixed(1) }}</span> Issues fechadas.
      </p>

      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-8">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3 text-left">Período (7 dias)</th>
              <th scope="col" class="px-6 py-3 text-right">Prometido</th>
              <th scope="col" class="px-6 py-3 text-right">Entregue</th>
              <th scope="col" class="px-6 py-3 text-right">% Concluído</th>
              <th scope="col" class="px-6 py-3 text-right">Velocidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5" class="px-6 py-4 text-center">Carregando dados...</td>
            </tr>
            <tr 
              v-else
              v-for="data in weeklyStats"
              :key="data.period"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap text-left">
                {{ data.period }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ data.promised }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ data.delivered }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ calculatePercentage(data.delivered, data.promised) }}%
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ data.delivered }}
              </td>
            </tr>
            <tr v-if="!isLoading && weeklyStats.length === 0">
               <td colspan="5" class="px-6 py-4 text-center">Nenhum dado semanal encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- NOVO GRÁFICO DE ENTREGAS SEMANAIS -->
      <div class="bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D] mb-8">
        <CustomChart 
          :series="weeklyDeliveryChartData.series" 
          :chartOptions="weeklyDeliveryChartOptions" 
          v-if="weeklyDeliveryChartData.labels.length"
        />
        
        <div v-else class="h-96 flex items-center justify-center text-[#A0A0A0] border border-dashed rounded-lg">
           Dados insuficientes para o Gráfico de Entregas Semanais.
        </div>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Burn-up Chart da Organização
      </h2>
      <div class="bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D]">
        <CustomChart 
          :series="burnUpChartData.series" 
          :chartOptions="burnUpChartOptions" 
          v-if="burnUpChartData.labels.length"
        />
        
        <div v-else class="h-96 flex items-center justify-center text-[#A0A0A0] border border-dashed rounded-lg">
           Dados insuficientes para o Burn-up Chart.
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '../../../../layouts/AdminLayout.vue';
import api from '../../../../axios.ts'; 
import CustomChart from '../../components/charts/LineChartOne.vue'; 

// --- Estado ---
const isLoading = ref(false);
const orgSummary = ref(null);
const weeklyStats = ref([]);
const NUMBER_OF_WEEKS = 8;

// --- Métodos de Lógica e Formatação ---

const calculatePercentage = (value, total) => {
  if (total === 0) return '0.0';
  return ((value / total) * 100).toFixed(1);
};

const generateWeeklyPeriods = (weeks) => {
    const today = new Date();
    const periods = [];
    
    const dayOfWeek = today.getDay(); 
    const daysSinceMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); 
    
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceMonday);

    for (let i = weeks - 1; i >= 0; i--) {
        const start = new Date(lastMonday);
        start.setDate(lastMonday.getDate() - (i * 7));
        
        const periodStart = `${start.getFullYear()}/${(start.getMonth() + 1).toString().padStart(2, '0')}/${start.getDate().toString().padStart(2, '0')}`;
        periods.push(periodStart); 
    }
    return periods;
};

// --- Chamada à API e Simulação de Dados ---

// --- COMO DEVERIA FUNCIONAR COM A API REAL ---
// const response = await api.get('/organization/stats');
// {
//   summary: {
//     total: 1200,
//     closed: 900,
//     open: 300
//   },
//   weeklyStats: [
//     { period: "2025/09/01", promised: 80, delivered: 70 },
//     ...
//   ]
// }
// orgSummary.value = response.data.summary;
// weeklyStats.value = response.data.weeklyStats;

const fetchOrganizationData = async () => {
  isLoading.value = true;
  const periods = generateWeeklyPeriods(NUMBER_OF_WEEKS); 
  let totalPromisedSum = 0;
  let totalDeliveredSum = 0;
  const mockWeeklyStats = periods.map((period, index) => {
    const basePromised = 15 + Math.floor(Math.random() * 8); // Valores maiores para organização
    let promised = basePromised;
    let delivered = promised - Math.floor(Math.random() * 5);
    if (delivered < 0) delivered = 0;
    if (index % 3 === 0 && index > 0) {
      delivered = promised; 
    }
    totalPromisedSum += promised;
    totalDeliveredSum += delivered;
    return {
      period: period, 
      promised: promised, 
      delivered: delivered, 
    };
  });
  const totalOpen = totalPromisedSum - totalDeliveredSum;
  const mockOrgSummary = { 
    total: totalPromisedSum, 
    closed: totalDeliveredSum, 
    open: totalOpen 
  };
  try {
    await new Promise(resolve => setTimeout(resolve, 800)); 
    orgSummary.value = mockOrgSummary;
    weeklyStats.value = mockWeeklyStats;
  } catch (error) {
    console.error("Erro ao buscar dados da organização:", error);
  } finally {
    isLoading.value = false;
  }
};

// --- Lógica para os Cálculos e Gráficos (Computed Properties) ---

const averageWeeklyVelocity = computed(() => {
    if (weeklyStats.value.length === 0) return 0;
    const totalDelivered = weeklyStats.value.reduce((sum, item) => sum + item.delivered, 0);
    return totalDelivered / weeklyStats.value.length;
});

const commonXAxisOptions = (labels) => ({
    type: 'category',
    categories: labels,
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false },
});

// Base Options para o ApexCharts
const chartOptionsBase = ref({
    chart: {
        fontFamily: 'Outfit, sans-serif',
        toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    legend: { show: true, position: 'top', horizontalAlign: 'left' },
    grid: { yaxis: { lines: { show: true } } },
    tooltip: { x: { show: false } },
    markers: { size: 5, strokeWidth: 2 },
    fill: { type: 'solid' }
});

// 1. BURN-UP CHART (Linhas Acumuladas)
const burnUpChartData = computed(() => {
    const labels = weeklyStats.value.map(s => s.period);
    
    let accumulatedPromised = 0;
    const promisedAccumulated = weeklyStats.value.map(s => {
        accumulatedPromised += s.promised;
        return accumulatedPromised;
    });

    let accumulatedDelivered = 0;
    const deliveredAccumulated = weeklyStats.value.map(s => {
        accumulatedDelivered += s.delivered;
        return accumulatedDelivered;
    });
    
    const promisedSeries = { name: 'Prometido acumulado', type: 'line', data: promisedAccumulated };
    const deliveredSeries = { name: 'Entregue acumulado', type: 'line', data: deliveredAccumulated };
    
    return { 
        labels: labels, 
        series: [promisedSeries, deliveredSeries],
    };
});

const burnUpChartOptions = computed(() => ({
    ...chartOptionsBase.value,
    title: {
        text: 'Burn-up Chart da Organização',
        align: 'left',
        style: { fontSize: '18px', fontWeight: 'bold' }
    },
    xaxis: commonXAxisOptions(burnUpChartData.value.labels),
    colors: ['#2563EB', '#10BB3E'], 
    stroke: { curve: 'straight', width: 3 },
    fill: { type: 'solid', opacity: 1 },
    yaxis: {
        title: {
            text: 'Issues Acumuladas',
            style: { color: '#6B7280' }
        }
    },
}));

// 2. GRÁFICO DE ENTREGAS SEMANAIS (Barra + Linha em Eixos Duplos)
const weeklyDeliveryChartData = computed(() => {
    const labels = weeklyStats.value.map(s => s.period);
    
    const percentageData = weeklyStats.value.map(s => {
        const percent = calculatePercentage(s.delivered, s.promised);
        return parseFloat(percent);
    });
    
    const promisedSeries = { name: 'Prometido', type: 'column', data: weeklyStats.value.map(s => s.promised) };
    const deliveredSeries = { name: 'Entregue', type: 'column', data: weeklyStats.value.map(s => s.delivered) };
    const percentageSeries = { name: '% Concluído', type: 'line', data: percentageData };
    
    return { 
        labels: labels, 
        series: [promisedSeries, deliveredSeries, percentageSeries],
    };
});

const weeklyDeliveryChartOptions = computed(() => ({
    ...chartOptionsBase.value,
    chart: {
        ...chartOptionsBase.value.chart,
        type: 'bar',
        stacked: false,
    },
    title: {
        text: 'Entregas Semanais da Organização',
        align: 'left',
        style: { fontSize: '18px', fontWeight: 'bold' }
    },
    xaxis: commonXAxisOptions(weeklyDeliveryChartData.value.labels),
    colors: ['#000080', '#008000', '#800000'], 
    stroke: { 
        width: [0, 0, 3],
        curve: 'smooth' 
    }, 
    plotOptions: {
        bar: {
            columnWidth: '50%',
        }
    },
    fill: {
        type: ['solid', 'solid', 'solid'],
        opacity: 1,
    },
    
    // Configuração dos Eixos Y (Duplos) - Correção: Prometido e Entregue no mesmo eixo
    yaxis: [
      // Eixo Y Principal (Esquerda) para Prometido e Entregue
      {
        seriesName: 'Prometido',
        axisTicks: { show: true },
        axisBorder: { show: true, color: '#000080' },
        labels: { style: { colors: '#000080' } },
        title: { text: 'Issues', style: { color: '#000080', fontWeight: 'bold' } },
      },
      {
        seriesName: 'Entregue',
        axisTicks: { show: true },
        axisBorder: { show: true, color: '#008000' },
        labels: { style: { colors: '#008000' } },
        title: { text: 'Issues', style: { color: '#008000', fontWeight: 'bold' } },
      },
      // Eixo Y Secundário (Direita) para Porcentagem
      {
        seriesName: '% Concluído',
        opposite: true,
        min: 0,
        max: 100, 
        axisTicks: { show: true },
        axisBorder: { show: true, color: '#800000' },
        labels: { 
          formatter: (val) => val.toFixed(0) + "%", 
          style: { colors: '#800000' }
        },
        title: { text: '% Concluído', style: { color: '#800000', fontWeight: 'bold' } }
      }
    ],
    tooltip: {
        y: [
            { formatter: (val) => val.toFixed(0) }, 
            { formatter: (val) => val.toFixed() }, 
            { formatter: (val) => val.toFixed(1) + '%' } 
        ]
    }
}));

// --- Início ---
onMounted(() => {
    fetchOrganizationData();
});
</script>