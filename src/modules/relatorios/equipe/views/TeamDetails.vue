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
          Estatísticas da Equipe: {{ teamName }}
        </h1>
        <p v-if="teamSummary" class="text-sm text-[#A0A0A0] mb-4">
          Esta equipe possui 
          <span class="font-semibold text-black dark:text-white">{{ teamSummary.members }}</span> membros, 
          com um total de 
          <span class="font-semibold text-black dark:text-white">{{ teamSummary.totalCreated }}</span> issues criadas 
          e 
          <span class="font-semibold text-black dark:text-white">{{ teamSummary.totalAssigned }}</span> designadas.
        </p>
        <p v-else class="text-sm text-[#A0A0A0] mb-4">
          Carregando resumo da equipe...
        </p>
      </div>

      <!-- SEÇÃO DE RELATÓRIOS SEMANAIS -->
      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Relatórios semanais da Equipe
      </h2>
      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-8">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Data</th>
              <th scope="col" class="px-6 py-3 text-right">Relatório (LINK)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="2" class="px-6 py-4 text-center">Carregando relatórios...</td>
            </tr>
            <tr 
              v-else
              v-for="report in weeklyReports"
              :key="report.id"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ formatDate(report.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <router-link 
                  :to="{
                    name: 'TeamResume',
                    params: { 
                      teamName: teamName,
                      reportDate: report.date
                    }
                  }"
                  class="text-[#2563EB] hover:underline font-medium"
                >
                  Ver Relatório
                </router-link>
              </td>
            </tr>
            <tr v-if="!isLoading && weeklyReports.length === 0">
              <td colspan="2" class="px-6 py-4 text-center">Nenhum relatório semanal encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Contribuição dos Membros
      </h2>
      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-8">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Membro</th>
              <th scope="col" class="px-6 py-3 text-right">Issues Criadas</th>
              <th scope="col" class="px-6 py-3 text-right">Issues Designadas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="3" class="px-6 py-4 text-center">Carregando dados dos membros...</td>
            </tr>
            <tr 
              v-else
              v-for="member in membersStats"
              :key="member.name"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                {{ member.name }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ member.created }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ member.assigned }}
              </td>
            </tr>
            <tr v-if="!isLoading && membersStats.length === 0">
              <td colspan="3" class="px-6 py-4 text-center">Nenhum membro encontrado ou sem dados de issues.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Distribuição de Contribuições (Issues Criadas e Designadas)
      </h2>
      <div class="bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D] mb-10">
        <BarChart 
          :series="contributionChartData.series" 
          :chartOptions="contributionChartOptions" 
          v-if="!isLoading && contributionChartData.labels.length"
        />
        <div v-else class="h-96 flex items-center justify-center text-[#A0A0A0] border border-dashed rounded-lg">
          Dados insuficientes para o Gráfico de Contribuição.
        </div>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Throughput Semanal da Equipe (Issues Fechadas)
      </h2>
      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-8">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Período (7 dias)</th>
              <th scope="col" class="px-6 py-3 text-right">Issues Fechadas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="2" class="px-6 py-4 text-center">Carregando dados semanais...</td>
            </tr>
            <tr 
              v-else
              v-for="stat in weeklyThroughput"
              :key="stat.period"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ stat.period }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right font-semibold">
                {{ stat.closed }}
              </td>
            </tr>
            <tr v-if="!isLoading && weeklyThroughput.length === 0">
              <td colspan="2" class="px-6 py-4 text-center">Nenhum dado semanal encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D] mb-10">
        <LineChart 
          :series="weeklyThroughputChartData.series" 
          :chartOptions="weeklyThroughputChartOptions" 
          v-if="!isLoading && weeklyThroughputChartData.labels.length"
        />
        <div v-else class="h-96 flex items-center justify-center text-[#A0A0A0] border border-dashed rounded-lg">
          Dados insuficientes para o Gráfico de Throughput Semanal.
        </div>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Throughput Mensal da Equipe (Issues Fechadas)
      </h2>
      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-8">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Período (Mês)</th>
              <th scope="col" class="px-6 py-3 text-right">Issues Fechadas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="2" class="px-6 py-4 text-center">Carregando dados mensais...</td>
            </tr>
            <tr 
              v-else
              v-for="stat in monthlyThroughput"
              :key="stat.period"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {{ stat.period }}
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right font-semibold">
                {{ stat.closed }}
              </td>
            </tr>
            <tr v-if="!isLoading && monthlyThroughput.length === 0">
              <td colspan="2" class="px-6 py-4 text-center">Nenhum dado mensal encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D] mb-8">
        <LineChart 
          :series="monthlyThroughputChartData.series" 
          :chartOptions="monthlyThroughputChartOptions" 
          v-if="!isLoading && monthlyThroughputChartData.labels.length"
        />
        <div v-else class="h-96 flex items-center justify-center text-[#A0A0A0] border border-dashed rounded-lg">
          Dados insuficientes para o Gráfico de Throughput Mensal.
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

// Importando os componentes de gráfico
import BarChart from '../../components/charts/BarChartOne.vue'; 
import LineChart from '../../components/charts/LineChartOne.vue'; 

// --- Estado ---
const route = useRoute();
const teamName = ref(''); 
const isLoading = ref(false);
const teamSummary = ref(null);
const membersStats = ref([]);
const weeklyThroughput = ref([]);
const monthlyThroughput = ref([]);
const weeklyReports = ref([]);

// --- Função para formatar data CORRIGIDA ---
const formatDate = (dateString) => {
  try {
    // Usar UTC para evitar problemas de fuso horário
    const [year, month, day] = dateString.split('-');
    const date = new Date(Date.UTC(year, month - 1, day));
    
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return dateString;
  }
};

// --- Simulação de Dados Dinâmicos ---
const fetchTeamDetails = async () => {
  isLoading.value = true;
  
  // 1. Dados dos Membros (Simulados)
  const mockMembersStats = [
    { name: 'joao.dev', created: 620, assigned: 120 }, 
    { name: 'maria.silva', created: 100, assigned: 65 },
    { name: 'pedro.xpto', created: 25, assigned: 20 },
    { name: 'ana.code', created: 100, assigned: 75 },
    { name: 'roberto.fix', created: 50, assigned: 40 },
    { name: 'carlos.prog', created: 85, assigned: 45 },
    { name: 'bia.test', created: 80, assigned: 30 },
  ];
  membersStats.value = mockMembersStats;
    
  const totalCreated = mockMembersStats.reduce((sum, m) => sum + m.created, 0);
  const totalAssigned = mockMembersStats.reduce((sum, m) => sum + m.assigned, 0);

  teamSummary.value = {
    members: mockMembersStats.length,
    totalCreated: totalCreated,
    totalAssigned: totalAssigned,
  };

  // 2. Relatórios Semanais (Simulados) - Usando datas consistentes
  const mockWeeklyReports = [
    { 
      id: 'report-001', 
      date: '2025-10-01', // Data no formato YYYY-MM-DD
      title: 'Relatório Semana 40' 
    },
    { 
      id: 'report-002', 
      date: '2025-09-24', 
      title: 'Relatório Semana 39' 
    },
    { 
      id: 'report-003', 
      date: '2025-09-17', 
      title: 'Relatório Semana 38' 
    },
  ];
  weeklyReports.value = mockWeeklyReports;
    
  // 3. Throughput Semanal (Simulado)
  const weeklyPeriods = generatePeriods(8, 'week');
  weeklyThroughput.value = weeklyPeriods.map((period, index) => ({
    period: period,
    closed: 15 + index * 2 + Math.floor(Math.random() * 5)
  }));
    
  // 4. Throughput Mensal (Simulado)
  const monthlyPeriods = generatePeriods(6, 'month');
  monthlyThroughput.value = monthlyPeriods.map((period, index) => ({
    period: period,
    closed: 80 + index * 20 + Math.floor(Math.random() * 15)
  }));

  try {
    await new Promise(resolve => setTimeout(resolve, 800)); 
  } catch (error) {
    console.error("Erro ao buscar dados da equipe:", error);
  } finally {
    isLoading.value = false;
  }
};

// Funções utilitárias para geração de datas
const generatePeriods = (count, interval) => {
  const periods = [];
  const today = new Date('2025-10-09'); 
  
  if (interval === 'week') {
    let currentDay = new Date(today);
    currentDay.setDate(today.getDate() - today.getDay()); 

    for (let i = count - 1; i >= 0; i--) {
      const start = new Date(currentDay);
      start.setDate(currentDay.getDate() - (i * 7));
      const periodStart = `${start.getFullYear()}/${(start.getMonth() + 1).toString().padStart(2, '0')}/${start.getDate().toString().padStart(2, '0')}`;
      periods.push(periodStart); 
    }
  } else if (interval === 'month') {
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthYear = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      periods.push(monthYear);
    }
  }
  return periods;
};

// --- Configurações Comuns de Gráfico ---

const commonXAxisOptions = (labels) => ({
  type: 'category',
  categories: labels,
  axisBorder: { show: false },
  axisTicks: { show: false },
  tooltip: { enabled: false },
  labels: {
    rotate: -45, 
    offsetY: 0,
    style: {
      fontSize: '10px'
    }
  }
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
  fill: { type: 'solid', opacity: 1 },
});


// --- 1. Gráfico de Contribuição dos Membros (Barras Agrupadas) ---

const contributionChartData = computed(() => {
  const labels = membersStats.value.map(m => m.name);
  
  const createdSeries = { name: 'Issues Criadas', data: membersStats.value.map(m => m.created) };
  const assignedSeries = { name: 'Issues Designadas', data: membersStats.value.map(m => m.assigned) };
  
  return { labels: labels, series: [createdSeries, assignedSeries] };
});

const contributionChartOptions = computed(() => ({
  ...chartOptionsBase.value,
  chart: {
    ...chartOptionsBase.value.chart,
    type: 'bar',
  },
  title: {
    text: `Contribuição dos Membros - ${teamName.value}`,
    align: 'left',
    style: { fontSize: '18px', fontWeight: 'bold' }
  },
  xaxis: commonXAxisOptions(contributionChartData.value.labels),
  colors: ['#5C7AFF', '#85C77A'], 
  plotOptions: {
    bar: {
      horizontal: false, 
      columnWidth: '70%',
      endingShape: 'rounded'
    },
  },
  yaxis: {
    title: {
      text: 'Número de Issues',
      style: { color: '#6B7280' }
    }
  },
}));


// --- 2. Gráfico Throughput Semanal (Area Chart Laranja - LINHA RETA) ---

const weeklyThroughputChartData = computed(() => {
  const labels = weeklyThroughput.value.map(w => w.period);
  const closedSeries = { name: 'Issues Fechadas', data: weeklyThroughput.value.map(w => w.closed) };
  
  return { labels: labels, series: [closedSeries] };
});

const weeklyThroughputChartOptions = computed(() => ({
  ...chartOptionsBase.value,
  chart: {
    ...chartOptionsBase.value.chart,
    type: 'area', 
  },
  title: {
    text: 'Throughput Semanal da Equipe',
    align: 'left',
    style: { fontSize: '18px', fontWeight: 'bold' }
  },
  xaxis: commonXAxisOptions(weeklyThroughputChartData.value.labels),
  colors: ['#F97316'], 
  stroke: { 
    curve: 'straight',
    width: 3 
  },
  markers: { size: 0, strokeWidth: 2 }, 
  fill: {
    type: 'gradient', 
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.2,
      stops: [0, 90, 100]
    }
  },
  yaxis: {
    title: {
      text: 'Issues Fechadas',
      style: { color: '#6B7280' }
    }
  },
}));


// --- 3. Gráfico Throughput Mensal (Area Chart Verde - LINHA RETA) ---

const monthlyThroughputChartData = computed(() => {
  const labels = monthlyThroughput.value.map(m => m.period);
  const closedSeries = { name: 'Issues Fechadas', data: monthlyThroughput.value.map(m => m.closed) };
  
  return { labels: labels, series: [closedSeries] };
});

const monthlyThroughputChartOptions = computed(() => ({
  ...chartOptionsBase.value,
  chart: {
    ...chartOptionsBase.value.chart,
    type: 'area', 
  },
  title: {
    text: 'Throughput Mensal da Equipe',
    align: 'left',
    style: { fontSize: '18px', fontWeight: 'bold' }
  },
  xaxis: commonXAxisOptions(monthlyThroughputChartData.value.labels),
  colors: ['#34D399'], 
  stroke: { 
    curve: 'straight',
    width: 3 
  },
  markers: { size: 0, strokeWidth: 2 },
  fill: {
    type: 'gradient', 
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.2,
      stops: [0, 90, 100]
    }
  },
  yaxis: {
    title: {
      text: 'Issues Fechadas',
      style: { color: '#6B7280' }
    }
  },
}));

// --- Início ---
onMounted(() => {
  teamName.value = route.params.teamName || 'Equipe Desconhecida';
  fetchTeamDetails();
});
</script>