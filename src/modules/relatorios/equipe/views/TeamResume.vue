<template>
  <AdminLayout>
    <div class="p-6">
      <!-- Cabeçalho -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-[#2563EB]">
            Relatório Semanal de Desempenho da Equipe {{ teamName }}
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Período: {{ formattedReportDate }}
          </p>
        </div>
        <button
          @click="$router.go(-1)"
          class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-[#2563EB] shadow-theme-xs hover:bg-[#1E52C9]"
        >
          Voltar
        </button>
      </div>

      <!-- ✅ Destaques da Semana -->
      <section class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-black dark:text-white flex items-center">
          <span class="text-green-500 mr-2">✅</span>
          Destaques da Semana
        </h2>
        <div class="bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D]">
          <div v-if="highlights" class="space-y-3">
            <p class="text-gray-700 dark:text-gray-300">{{ highlights.summary }}</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li v-for="highlight in highlights.keyAchievements" :key="highlight">
                {{ highlight }}
              </li>
            </ul>
          </div>
          <div v-else class="text-center text-gray-500 py-4">
            Carregando destaques...
          </div>
        </div>
      </section>

      <!-- 👤 Entregas por Membro -->
      <section class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-black dark:text-white flex items-center">
          <span class="text-blue-500 mr-2">👤</span>
          Entregas por Membro
        </h2>
        <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A]">
          <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" class="px-6 py-3">Membro</th>
                <th scope="col" class="px-6 py-3">Entregas Realizadas</th>
                <th scope="col" class="px-6 py-3">Data</th>
                <th scope="col" class="px-6 py-3">Links</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="4" class="px-6 py-4 text-center">Carregando entregas...</td>
              </tr>
              <tr 
                v-else
                v-for="delivery in memberDeliveries"
                :key="`${delivery.member}-${delivery.id}`"
                class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
              >
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {{ delivery.member }}
                </td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {{ delivery.task }}
                </td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {{ formatDeliveryDate(delivery.date) }}
                </td>
                <td class="px-6 py-4">
                  <a 
                    v-if="delivery.link"
                    :href="delivery.link" 
                    target="_blank" 
                    class="text-[#2563EB] hover:underline text-sm"
                  >
                    Ver Detalhes
                  </a>
                  <span v-else class="text-gray-400 text-sm">-</span>
                </td>
              </tr>
              <tr v-if="!isLoading && memberDeliveries.length === 0">
                <td colspan="4" class="px-6 py-4 text-center">Nenhuma entrega registrada nesta semana.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 📊 Indicadores Comparativos -->
      <section class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-black dark:text-white flex items-center">
          <span class="text-purple-500 mr-2">📊</span>
          Indicadores Comparativos
        </h2>
        <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A]">
          <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" class="px-6 py-3">Membro</th>
                <th scope="col" class="px-6 py-3 text-center">Issues Semanais</th>
                <th scope="col" class="px-6 py-3 text-center">% de Fechamento</th>
                <th scope="col" class="px-6 py-3 text-center">Pendências Abertas</th>
                <th scope="col" class="px-6 py-3 text-center">Throughput</th>
                <th scope="col" class="px-6 py-3 text-center">Prometido vs Entregue</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="6" class="px-6 py-4 text-center">Carregando indicadores...</td>
              </tr>
              <tr 
                v-else
                v-for="indicator in comparativeIndicators"
                :key="indicator.member"
                class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
              >
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {{ indicator.member }}
                </td>
                <td class="px-6 py-4 text-center">
                  <span :class="{
                    'font-semibold text-green-600': indicator.weeklyIssues > 0,
                    'text-gray-500': indicator.weeklyIssues === 0
                  }">
                    {{ indicator.weeklyIssues }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span :class="{
                    'font-semibold text-green-600': indicator.closureRate === '100%',
                    'font-semibold text-red-600': indicator.closureRate === '0%',
                    'font-semibold text-yellow-600': indicator.closureRate !== '100%' && indicator.closureRate !== '0%'
                  }">
                    {{ indicator.closureRate }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span :class="{
                    'font-semibold text-red-600': indicator.openPending > 0,
                    'text-green-600': indicator.openPending === 0
                  }">
                    {{ indicator.openPending }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <a 
                    :href="`http://localhost:5173/developer/${getDeveloperSlug(indicator.member)}#throughput`"
                    target="_blank"
                    class="text-[#2563EB] hover:underline font-medium"
                  >
                    Ver Gráfico
                  </a>
                </td>
                <td class="px-6 py-4 text-center">
                  <a 
                    :href="`http://localhost:5173/developer/${getDeveloperSlug(indicator.member)}#promised-vs-delivered`"
                    target="_blank"
                    class="text-[#2563EB] hover:underline font-medium"
                  >
                    Ver Gráfico
                  </a>
                </td>
              </tr>
              <tr v-if="!isLoading && comparativeIndicators.length === 0">
                <td colspan="6" class="px-6 py-4 text-center">Nenhum indicador disponível.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 💡 Recomendações e 🔜 Próximos Passos -->
      <section class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-black dark:text-white flex items-center">
          <span class="text-yellow-500 mr-2">💡</span>
          Recomendações e 
          <span class="text-blue-500 ml-2">🔜</span>
          Próximos Passos
        </h2>
        
        <!-- Recomendações Individuais -->
        <div class="bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recomendações Individuais</h3>
          <div class="space-y-4">
            <div 
              v-for="recommendation in recommendations"
              :key="recommendation.member"
              class="border-l-4 border-yellow-500 pl-4 py-2"
            >
              <h4 class="font-medium text-gray-900 dark:text-white">{{ recommendation.member }}</h4>
              <p class="text-gray-700 dark:text-gray-300 text-sm">{{ recommendation.suggestion }}</p>
            </div>
          </div>
        </div>

        <!-- Próximos Passos da Equipe -->
        <div class="bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D]">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Próximos Passos da Equipe</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li v-for="step in nextSteps" :key="step">
              {{ step }}
            </li>
          </ul>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '../../../../layouts/AdminLayout.vue';

// --- Estado ---
const route = useRoute();
const isLoading = ref(false);

// Use os parâmetros da rota diretamente
const teamName = ref(route.params.teamName || 'Equipe Desconhecida');
const reportDate = ref(route.params.reportDate || '2025-10-09');

// Dados do relatório
const highlights = ref(null);
const memberDeliveries = ref([]);
const comparativeIndicators = ref([]);
const recommendations = ref([]);
const nextSteps = ref([]);

// Computed property para formatar a data do período
const formattedReportDate = computed(() => {
  return formatDate(reportDate.value);
});

// Função para formatar a data do período do relatório CORRIGIDA
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
      timeZone: 'UTC' // Forçar UTC para manter a data exata
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return dateString;
  }
};

// Função para formatar a data das entregas CORRIGIDA
const formatDeliveryDate = (dateString) => {
  try {
    const [year, month, day] = dateString.split('-');
    const date = new Date(Date.UTC(year, month - 1, day));
    
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    return date.toLocaleDateString('pt-BR', {
      timeZone: 'UTC'
    });
  } catch (error) {
    console.error('Erro ao formatar data de entrega:', error);
    return dateString;
  }
};

// Função para criar slug do desenvolvedor para URLs
const getDeveloperSlug = (developerName) => {
  return developerName.toLowerCase().replace(/[^a-z0-9]/g, '-');
};

// --- Simulação de dados do relatório ---
const fetchReportData = async () => {
  isLoading.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dados dos destaques - usar a data formatada corretamente
    highlights.value = {
      summary: `A equipe ${teamName.value} demonstrou excelente produtividade na semana de ${formattedReportDate.value}. Quatro membros alcançaram 100% de taxa de fechamento.`,
      keyAchievements: [
        "4 desenvolvedores com 100% de taxa de fechamento",
        "Entrega de funcionalidades críticas do projeto principal",
        "Redução de 15% no backlog de pendências",
        `Relatório referente à data: ${reportDate.value}`
      ]
    };

    // Entregas por membro - usar a data do relatório como referência
    const reportDateObj = new Date(reportDate.value + 'T00:00:00Z'); // Usar UTC
    
    memberDeliveries.value = [
      {
        id: 1,
        member: "vincius-je",
        task: "Implementação do módulo de autenticação",
        date: reportDate.value, // Usar a mesma data do relatório
        link: "https://github.com/projeto/issue/123"
      },
      {
        id: 2,
        member: "guihocosta",
        task: "Refatoração do sistema de cache",
        date: new Date(reportDateObj.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 dias antes
        link: "https://github.com/projeto/issue/124"
      },
      {
        id: 3,
        member: "JoaoRicardoCetto",
        task: "Otimização de performance da API",
        date: new Date(reportDateObj.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 dia antes
        link: "https://github.com/projeto/issue/125"
      }
    ];

    // ... resto dos dados simulados permanece igual
    comparativeIndicators.value = [
      { member: "vincius-je", weeklyIssues: 4, closureRate: "0%", openPending: 19 },
      { member: "ManoelRL", weeklyIssues: 0, closureRate: "0%", openPending: 19 },
      { member: "JoelHanerth", weeklyIssues: 0, closureRate: "0%", openPending: 0 },
      { member: "guihocosta", weeklyIssues: 4, closureRate: "100%", openPending: 0 },
      { member: "JoaoRicardoCetto", weeklyIssues: 2, closureRate: "100%", openPending: 3 },
      { member: "OficialMark", weeklyIssues: 3, closureRate: "100%", openPending: 3 },
      { member: "Victor-Marins-Dev", weeklyIssues: 4, closureRate: "100%", openPending: 0 }
    ];

    recommendations.value = [
      {
        member: "vincius-je",
        suggestion: "Focar na finalização das issues em andamento para reduzir o acumulo de pendências. Considerar pair programming para issues complexas."
      },
      {
        member: "ManoelRL",
        suggestion: "Retomar atividades e priorizar as pendências mais críticas. Participar das daily meetings para realinhar com o time."
      }
    ];

    nextSteps.value = [
      "Finalizar o módulo de relatórios até sexta-feira",
      "Iniciar planejamento do próximo sprint"
    ];

  } catch (error) {
    console.error("Erro ao carregar relatório:", error);
  } finally {
    isLoading.value = false;
  }
};

// --- Inicialização ---
onMounted(() => {
  fetchReportData();
});
</script>