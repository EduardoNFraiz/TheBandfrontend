<template>
  <AdminLayout>
    <div class="p-6 relative">
      <button
        @click="$router.go(-1)"
        class="absolute top-6 right-6 flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-[#2563EB] shadow-theme-xs hover:bg-[#1E52C9]"
      >
        Voltar
      </button>

      <div class="flex flex-col mb-6 w-full">
        <h1 class="mb-2 font-semibold text-title-md text-[#2563EB]">
          Estatísticas do Repositório: {{ repositoryName }}
        </h1>
        <p class="text-sm text-[#A0A0A0] mb-4">
          Visualização detalhada do desempenho e da velocidade em Issues.
        </p>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Status do Repositório
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
            <tr v-if="isLoading">
              <td colspan="4" class="px-6 py-4 text-center">Carregando dados...</td>
            </tr>
            <tr 
              v-else-if="repoSummary"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ repoSummary.total }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ repoSummary.closed }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ repoSummary.open }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap font-semibold text-green-600 dark:text-green-400">
                {{ calculatePercentage(repoSummary.closed, repoSummary.total) }}%
              </td>
            </tr>
            <tr v-else>
              <td colspan="4" class="px-6 py-4 text-center">Dados de resumo não encontrados.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Entregas Semanais do Repositório
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
      <div class="bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D] mb-8">
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

// Renomeado para CustomChart, mas você deve usar o nome do seu componente de gráfico (ex: LineChartOne.vue)
import CustomChart from '../../components/charts/LineChartOne.vue'; 

// --- Estado ---
const route = useRoute();
const repositoryName = ref(''); 
const isLoading = ref(false);
const repoSummary = ref(null);
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

// --- Chamada à API e Simulação de Dados (Atualizada para consistência) ---

const fetchRepositoryData = async () => {
  isLoading.value = true;

  // --- COMO DEVERIA FUNCIONAR COM A API REAL ---
  // Aqui você faria uma chamada para a API que retorna os dados do repositório e suas entregas semanais.
  // Exemplo:
  // const response = await api.get(`/repositories/${repositoryName.value}/stats`);
  // Payload esperado:
  // {
  //   summary: {
  //     total: 200,
  //     closed: 155,
  //     open: 45
  //   },
  //   weeklyStats: [
  //     {
  //       period: "2025/09/01",
  //       promised: 20,
  //       delivered: 18
  //     },
  //     ...
  //   ]
  // }
  // repoSummary.value = response.data.summary; // { total, closed, open }
  // weeklyStats.value = response.data.weeklyStats; // [{ period, promised, delivered }]

  // Mock para demonstração:
  const periods = generateWeeklyPeriods(NUMBER_OF_WEEKS); 
  let totalPromisedSum = 0;
  let totalDeliveredSum = 0;
  const mockWeeklyStats = periods.map((period, index) => {
    const basePromised = 10 + Math.floor(Math.random() * 5); 
    let promised = basePromised;
    let delivered = promised - Math.floor(Math.random() * 3);
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
  const mockRepoSummary = { 
    total: totalPromisedSum, 
    closed: totalDeliveredSum, 
    open: totalOpen 
  };
  try {
    await new Promise(resolve => setTimeout(resolve, 800)); 
    repoSummary.value = mockRepoSummary;
    weeklyStats.value = mockWeeklyStats;
  } catch (error) {
    console.error("Erro ao buscar dados do repositório:", error);
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
    fill: { type: 'solid' } // Define o preenchimento padrão como sólido
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
        text: 'Burn-up Chart', // Título ajustado
        align: 'left',
        style: { fontSize: '18px', fontWeight: 'bold' }
    },
    xaxis: commonXAxisOptions(burnUpChartData.value.labels),
    colors: ['#2563EB', '#10BB3E'], 
    stroke: { curve: 'straight', width: 3 },
    fill: { type: 'solid', opacity: 1 }, // Garantindo cores sólidas
    yaxis: {
        title: {
            text: 'Issues Acumuladas',
            style: { color: '#6B7280' }
        }
    },
}));


// 2. NOVO GRÁFICO: ENTREGAS SEMANAIS (Barra + Linha em Eixos Duplos)
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
        text: `Entregas Semanais - ${repositoryName.value}`,
        align: 'left',
        style: { fontSize: '18px', fontWeight: 'bold' }
    },
    xaxis: commonXAxisOptions(weeklyDeliveryChartData.value.labels),
    // Cores: Azul escuro (Prometido), Verde (Entregue), Vermelho Escuro (Porcentagem)
    colors: ['#000080', '#008000', '#800000'], 
    stroke: { 
        width: [0, 0, 3], // 0 para as barras, 3 para a linha
        curve: 'smooth' 
    }, 
    plotOptions: {
        bar: {
            columnWidth: '50%',
        }
    },
    fill: {
        type: ['solid', 'solid', 'solid'], // Forçando preenchimento sólido para todos
        opacity: 1,
    },
    
    // Configuração dos Eixos Y (Duplos)
  yaxis: [
    // Eixo Y Principal (Esquerda) para Prometido
    {
      seriesName: 'Prometido',
      axisTicks: { show: true },
      axisBorder: { show: true, color: '#000080' },
      labels: { style: { colors: '#000080' } },
      title: { text: 'Issues Prometidas', style: { color: '#000080', fontWeight: 'bold' } },
    },
    // Eixo Y Secundário (Direita) para Entregue
    {
      seriesName: 'Entregue',
      axisTicks: { show: true },
      axisBorder: { show: true, color: '#008000' },
      labels: { style: { colors: '#008000' } },
      title: { text: 'Issues Entregues', style: { color: '#008000', fontWeight: 'bold' } },
    },
    // Eixo Y Terciário (Direita) para Porcentagem
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
            { formatter: (val) => val.toFixed(0) }, 
            { formatter: (val) => val.toFixed(1) + '%' } 
        ]
    }
}));


// --- Início ---
onMounted(() => {
    repositoryName.value = route.params.repositoryName || 'Repositório Desconhecido';
    fetchRepositoryData();
});
</script>