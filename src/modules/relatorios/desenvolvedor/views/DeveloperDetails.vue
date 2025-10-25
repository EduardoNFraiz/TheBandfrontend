<template>
  <AdminLayout>
    <div class="p-6 relative">
      <div class="flex justify-between items-center mb-6">
        <div class="flex flex-col w-full">
          <h1 class="mb-2 font-semibold text-title-md text-[#2563EB]">
            Estatísticas de {{ developerName }}
          </h1>
          <p class="text-sm text-[#A0A0A0] mb-4">
            Visualização detalhada do desempenho semanal em Issues.
          </p>
        </div>
        
        <div class="flex gap-2">
          <router-link
            :to="`/developer/${developerName}/competence`"
            class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-[#10B981] shadow-theme-xs hover:bg-[#0D9C6B]"
          >
            Competências
          </router-link>
          <button
            @click="$router.go(-1)"
            class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-[#2563EB] shadow-theme-xs hover:bg-[#1E52C9]"
          >
            Voltar
          </button>
        </div>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Status
      </h2>
      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-8">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Total</th>
              <th scope="col" class="px-6 py-3">Closed</th>
              <th scope="col" class="px-6 py-3">Open</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D]">
              <td colspan="3" class="px-6 py-4 text-center">Carregando dados...</td>
            </tr>
            <tr 
              v-else-if="developerSummary"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ developerSummary.total }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ developerSummary.closed }} ({{ calculatePercentage(developerSummary.closed, developerSummary.total) }}%)
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ developerSummary.open }} ({{ calculatePercentage(developerSummary.open, developerSummary.total) }}%)
              </td>
            </tr>
            <tr v-else>
              <td colspan="3" class="px-6 py-4 text-center">Dados de resumo não encontrados.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Prometido vs Realizado (Semanal)
      </h2>
      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-8">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3 text-left">Período (7 dias)</th>
              <th scope="col" class="px-6 py-3 text-right">Prometido (Issues)</th>
              <th scope="col" class="px-6 py-3 text-right">Realizado (Issues)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="3" class="px-6 py-4 text-center">Carregando dados...</td>
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
            </tr>
            <tr v-if="!isLoading && weeklyStats.length === 0">
               <td colspan="3" class="px-6 py-4 text-center">Nenhum dado semanal encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D] mb-6">
        <h3 class="mb-4 font-semibold text-md text-black dark:text-white">
          Prometido vs Realizado - {{ developerName }}
        </h3>
        
        <BarChart 
          :series="promisedVsDeliveredChartData.series" 
          :chartOptions="barChartOptions" 
          v-if="promisedVsDeliveredChartData.labels.length"
        />
        
        <div v-else class="h-64 flex items-center justify-center text-[#A0A0A0] border border-dashed rounded-lg">
           Dados insuficientes para o gráfico.
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D] mb-8">
        <h3 class="mb-4 font-semibold text-md text-black dark:text-white">
          Throughput Semanal - {{ developerName }}
        </h3>
        
        <LineChart 
          :series="throughputChartData.series" 
          :chartOptions="lineChartOptions" 
          v-if="throughputChartData.labels.length"
        />
        
        <div v-else class="h-64 flex items-center justify-center text-[#A0A0A0] border border-dashed rounded-lg">
           Dados insuficientes para o gráfico.
        </div>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Issues
      </h2>
      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-8">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Número</th>
              <th scope="col" class="px-6 py-3">Título</th>
              <th scope="col" class="px-6 py-3">Estado</th>
              <th scope="col" class="px-6 py-3">Criado em</th>
              <th scope="col" class="px-6 py-3">URL</th>
              <th scope="col" class="px-6 py-3">Assignee</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="6" class="px-6 py-4 text-center">Carregando Issues...</td>
            </tr>
            <tr 
              v-else
              v-for="issue in issuesList"
              :key="issue.number"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">{{ issue.number }}</td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300">{{ issue.title }}</td>
              <td :class="['px-6 py-4 font-medium', {'text-green-600 dark:text-green-400': issue.state === 'closed', 'text-yellow-600 dark:text-yellow-400': issue.state === 'open'}]">
                {{ issue.state }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">{{ issue.created_at }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <a :href="issue.url" target="_blank" class="text-[#2563EB] hover:underline">Link</a>
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">{{ issue.assignee || 'N/A' }}</td>
            </tr>
            <tr v-if="!isLoading && issuesList.length === 0">
               <td colspan="6" class="px-6 py-4 text-center">Nenhuma Issue encontrada.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '../../../../layouts/AdminLayout.vue';
import api from '../../../../axios.ts'; 

// IMPORTAÇÃO DOS COMPONENTES DE GRÁFICO (Ajuste o caminho se necessário)
import LineChart from '../../components/charts/LineChartOne.vue'; 
import BarChart from '../../components/charts/BarChartOne.vue'; 

// --- Estado ---
const route = useRoute();
const developerName = ref(''); 
const isLoading = ref(false);
const developerSummary = ref(null);
const weeklyStats = ref([]);
const issuesList = ref([]); // Novo estado para a lista de Issues

// --- Métodos de Lógica e Formatação ---
const goToCompetence = () => {
  const developerName = route.params.developerName;
  router.push(`/developer/${developerName}/competence`);
};
const calculatePercentage = (value, total) => {
  if (total === 0) return '0.0';
  return ((value / total) * 100).toFixed(1);
};

const generateWeeklyPeriods = (weeks = 5) => {
    const today = new Date();
    const periods = [];
    
    const dayOfWeek = today.getDay(); 
    const daysSinceMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); 
    
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceMonday);

    for (let i = 0; i < weeks; i++) {
        const start = new Date(lastMonday);
        start.setDate(lastMonday.getDate() - (i * 7));
        
        const periodStart = `${start.getFullYear()}/${(start.getMonth() + 1).toString().padStart(2, '0')}/${start.getDate().toString().padStart(2, '0')}`;
        periods.unshift(periodStart); 
    }
    return periods;
};

// --- Chamada à API e Simulação de Dados ---

const fetchDeveloperData = async () => {
    isLoading.value = true;
    
    const periods = generateWeeklyPeriods(5); 
    
    // Sequências de dados fixas para garantir os totais: 150 Prometido, 120 Realizado
    const fixedPromised = [28, 29, 30, 31, 32]; // Soma: 150
    const fixedDelivered = [20, 22, 24, 26, 28]; // Soma: 120
    
  // --- COMO DEVERIA FUNCIONAR COM A API REAL ---
  // Aqui você faria uma chamada para a API que retorna os dados detalhados do desenvolvedor.
  // Exemplo:
  // const response = await api.get(`/developers/${developerName.value}/details`);
  // Payload esperado:
  // {
  //   summary: {
  //     name: "ArthurCremasco",
  //     total: 150,
  //     closed: 120,
  //     open: 30
  //   },
  //   weeklyStats: [
  //     { period: "2025/09/01", promised: 28, delivered: 20 },
  //     ...
  //   ],
  //   issuesList: [
  //     { number: 1, title: "Refatorar lógica de autenticação", state: "closed", created_at: "2025/09/11", url: "#", assignee: "ArthurCremasco" },
  //     ...
  //   ]
  // }
  // developerSummary.value = response.data.summary;
  // weeklyStats.value = response.data.weeklyStats;
  // issuesList.value = response.data.issuesList;

  // 1. Gerar os dados semanais com base nas sequências fixas
  const mockWeeklyStats = periods.map((period, index) => {
    return {
      period: period, 
      promised: fixedPromised[index] || 0,
      delivered: fixedDelivered[index] || 0,
      closedIssues: fixedDelivered[index] || 0, // Throughput = Realizado
    };
  });

  // 2. Definir o resumo de forma EXATA (Total: 150, Closed: 120, Open: 30)
  const mockSummary = { 
    name: developerName.value, 
    total: 150, 
    closed: 120, 
    open: 30 
  };

  // 3. Dados simulados da Tabela de Issues
  const mockIssuesList = [
    { number: 1, title: 'Refatorar lógica de autenticação', state: 'closed', created_at: '2025/09/11', url: '#', assignee: developerName.value },
    { number: 2, title: 'Implementar cálculo de throughput semanal', state: 'closed', created_at: '2025/09/11', url: '#', assignee: developerName.value },
    { number: 5, title: 'Adicionar filtro de datas ao dashboard', state: 'closed', created_at: '2025/09/17', url: '#', assignee: 'N/A' },
    { number: 6, title: 'Corrigir bug de overflow no mobile', state: 'closed', created_at: '2025/09/23', url: '#', assignee: developerName.value },
    { number: 8, title: 'Ajustar cores do BarChart (Dark Mode)', state: 'open', created_at: '2025/10/01', url: '#', assignee: developerName.value },
    { number: 10, title: 'Atualizar Vue Router para v4.x', state: 'open', created_at: '2025/10/05', url: '#', assignee: 'N/A' },
  ];
    
    try {
        await new Promise(resolve => setTimeout(resolve, 800)); 
        
        developerSummary.value = mockSummary;
        weeklyStats.value = mockWeeklyStats;
        issuesList.value = mockIssuesList; // Atribuir a lista de Issues

    } catch (error) {
        console.error("Erro ao buscar dados do desenvolvedor:", error);
    } finally {
        isLoading.value = false;
    }
};

// --- Lógica para os Gráficos (Computed Properties) ---

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
});


// 1. DADOS PARA GRÁFICO DE BARRAS (Prometido vs Realizado)
const promisedVsDeliveredChartData = computed(() => {
    const labels = weeklyStats.value.map(s => s.period);
    const promisedSeries = { name: 'Prometido', data: weeklyStats.value.map(s => s.promised) };
    const deliveredSeries = { name: 'Realizado', data: weeklyStats.value.map(s => s.delivered) };
    
    return { 
        labels: labels, 
        series: [promisedSeries, deliveredSeries],
    };
});

const barChartOptions = computed(() => ({
    ...chartOptionsBase.value,
    xaxis: commonXAxisOptions(promisedVsDeliveredChartData.value.labels),
    colors: ['#2563EB', '#10B981'], 
    plotOptions: {
      bar: {
        columnWidth: '60%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
}));


// 2. DADOS PARA GRÁFICO DE LINHA (Throughput Semanal)
const throughputChartData = computed(() => {
    const labels = weeklyStats.value.map(s => s.period);
    const closedSeries = { name: 'Issues Fechadas', data: weeklyStats.value.map(s => s.closedIssues) };
    
    return { 
        labels: labels, 
        series: [closedSeries],
    };
});

const lineChartOptions = computed(() => ({
    ...chartOptionsBase.value,
    xaxis: commonXAxisOptions(throughputChartData.value.labels),
    colors: ['#F59E0B'], 
    fill: { 
      gradient: { 
        enabled: true, 
        opacityFrom: 0.55, 
        opacityTo: 0 
      } 
    }, 
    stroke: { curve: 'straight', width: [2, 2] },
}));


// --- Início ---
onMounted(() => {
    developerName.value = route.params.developerName || 'Desenvolvedor';
    fetchDeveloperData();
});
</script>