<template>
  <AdminLayout>
    <div class="p-6">
      <div class="flex flex-col mb-6 w-full">
        <h1 class="mb-2 font-semibold text-title-md text-[#2563EB]">
          Índice de Equipes
        </h1>
        <p class="text-sm text-[#A0A0A0] mb-4">
          Este documento lista todas as equipes com seus respectivos relatórios e estatísticas resumidas.
        </p>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Estatísticas Resumidas por Equipe
      </h2>
      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-10">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Equipe</th>
              <th scope="col" class="px-6 py-3 text-right">N° de Membros</th>
              <th scope="col" class="px-6 py-3 text-right">Issues Criadas</th>
              <th scope="col" class="px-6 py-3 text-right">Issues Designadas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="4" class="px-6 py-4 text-center">Carregando dados das equipes...</td>
            </tr>
            <tr 
              v-else
              v-for="team in teamStats"
              :key="team.name"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-[#2563EB] font-medium whitespace-nowrap">
                <router-link :to="`/team/${team.name}`" class="hover:underline">
                  {{ team.name }}
                </router-link>
              </td>
              
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ team.members }}
              </td>
              
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ team.created }}
              </td>
              
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right font-semibold">
                {{ team.assigned }}
              </td>
            </tr>
            <tr v-if="!isLoading && teamStats.length === 0">
               <td colspan="4" class="px-6 py-4 text-center">Nenhuma equipe encontrada.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Delivery x Entregue por Equipe
      </h2>
      <div class="bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D] mb-10">
        <BarChart 
          :series="deliveryChartData.series" 
          :chartOptions="deliveryChartOptions" 
          v-if="!isLoading && deliveryChartData.labels.length"
        />
        <div v-else class="h-96 flex items-center justify-center text-[#A0A0A0] border border-dashed rounded-lg">
           Dados insuficientes para o Gráfico de Delivery.
        </div>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Total de Throughput por Equipe
      </h2>
      <div class="bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D] mb-8">
        <BarChart 
          :series="throughputChartData.series" 
          :chartOptions="throughputChartOptions" 
          v-if="!isLoading && throughputChartData.labels.length"
        />
        <div v-else class="h-96 flex items-center justify-center text-[#A0A0A0] border border-dashed rounded-lg">
           Dados insuficientes para o Gráfico de Throughput.
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import AdminLayout from '../../../../layouts/AdminLayout.vue';
import api from '../../../../axios.ts'; 

// Reutilizando um componente de gráfico genérico, mas definindo as opções como 'bar'
import BarChart from '../../components/charts/BarChartOne.vue'; 

// --- Estado ---
const isLoading = ref(false);
const teamStats = ref([]);

// --- Simulação de Dados ---
const fetchTeamStats = async () => {
    isLoading.value = true;

  // --- COMO DEVERIA FUNCIONAR COM A API REAL ---
  // Aqui você faria uma chamada para a API que retorna os dados resumidos das equipes.
  // Exemplo:
  // const response = await api.get('/teams/stats');
  // Payload esperado:
  // [
  //   {
  //     name: "Alpha Squad",
  //     members: 6,
  //     created: 350,
  //     assigned: 300,
  //     closed: 280
  //   },
  //   ...
  // ]
  // teamStats.value = response.data;

  // Dados simulados
  const mockData = [
    { name: 'Alpha Squad', members: 6, created: 350, assigned: 300, closed: 280 },
    { name: 'Beta Team', members: 4, created: 200, assigned: 180, closed: 150 },
    { name: 'Gamma Devs', members: 8, created: 500, assigned: 450, closed: 420 },
    { name: 'Delta Ops', members: 5, created: 150, assigned: 150, closed: 145 },
    { name: 'Infra Core', members: 3, created: 100, assigned: 90, closed: 80 },
    { name: 'QA Leads', members: 5, created: 180, assigned: 170, closed: 160 },
  ];
    
    try {
        await new Promise(resolve => setTimeout(resolve, 800)); 
        teamStats.value = mockData;
    } catch (error) {
        console.error("Erro ao buscar dados das equipes:", error);
    } finally {
        isLoading.value = false;
    }
};

// --- Configurações Comuns de Gráfico ---

const commonXAxisOptions = (labels) => ({
    type: 'category',
    categories: labels,
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false },
});

const chartOptionsBase = ref({
    chart: {
        fontFamily: 'Outfit, sans-serif',
        toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    legend: { show: true, position: 'top', horizontalAlign: 'left' },
    grid: { yaxis: { lines: { show: true } } },
    tooltip: { x: { show: false } },
    plotOptions: {
        bar: {
            horizontal: false, // Barras Verticais
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    fill: { type: 'solid', opacity: 1 },
});

// --- 1. Gráfico Delivery x Entregue por Equipe ---

const deliveryChartData = computed(() => {
    const labels = teamStats.value.map(t => t.name);
    
    const createdSeries = { 
        name: 'Criadas', // Corrigido para "Criadas" (azul)
        data: teamStats.value.map(t => t.created) 
    };
    const closedSeries = { 
        name: 'Fechadas', // Corrigido para "Fechadas" (laranja/verde)
        data: teamStats.value.map(t => t.closed) 
    };
    
    return { 
        labels: labels, 
        series: [createdSeries, closedSeries],
    };
});

const deliveryChartOptions = computed(() => ({
    ...chartOptionsBase.value,
    chart: {
        ...chartOptionsBase.value.chart,
        type: 'bar', // Tipo de gráfico de barras
    },
    title: {
        text: 'Delivery x Entregue por Equipe',
        align: 'left',
        style: { fontSize: '18px', fontWeight: 'bold' }
    },
    xaxis: commonXAxisOptions(deliveryChartData.value.labels),
    // Cores: Azul escuro (Criadas) e Laranja (Fechadas), como na imagem
    colors: ['#2563EB', '#F97316'], 
    yaxis: {
        title: {
            text: 'Issues', // Eixo Y Issues
            style: { color: '#6B7280' }
        }
    },
}));


// --- 2. Gráfico Total de Throughput por Equipe (Issues Fechadas) ---

const throughputChartData = computed(() => {
    const labels = teamStats.value.map(t => t.name);
    
    const throughputSeries = { 
        name: 'Issues Fechadas', 
        data: teamStats.value.map(t => t.closed) 
    };
    
    return { 
        labels: labels, 
        series: [throughputSeries],
    };
});

const throughputChartOptions = computed(() => ({
    ...chartOptionsBase.value,
    chart: {
        ...chartOptionsBase.value.chart,
        type: 'bar',
    },
    title: {
        text: 'Total de Throughput por Equipe',
        align: 'left',
        style: { fontSize: '18px', fontWeight: 'bold' }
    },
    xaxis: commonXAxisOptions(throughputChartData.value.labels),
    colors: ['#34D399'], // Verde claro para Throughput (pode ser ajustado)
    yaxis: {
        title: {
            text: 'Issues Fechadas', // Eixo Y Issues Fechadas
            style: { color: '#6B7280' }
        }
    },
}));

// --- Início ---
onMounted(() => {
    fetchTeamStats();
});
</script>