<template>
  <AdminLayout>
    <div class="p-6">
      <div class="flex flex-col mb-6 w-full">
        <h1 class="mb-2 font-semibold text-title-md text-[#2563EB]">
          Issue Stats by Repository and Status
        </h1>
        <p class="text-sm text-[#A0A0A0] mb-4">
          Visualização consolidada de Issues abertas e fechadas por repositório.
        </p>
      </div>

      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A]">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Repository</th>
              <th scope="col" class="px-6 py-3 text-right">Open</th>
              <th scope="col" class="px-6 py-3 text-right">Closed</th>
              <th scope="col" class="px-6 py-3 text-right">Total</th>
              <th scope="col" class="px-6 py-3 text-right">% Closed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5" class="px-6 py-4 text-center">Carregando dados dos repositórios...</td>
            </tr>
            <tr 
              v-else
              v-for="repo in repositoryStats"
              :key="repo.name"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-[#2563EB] font-medium whitespace-nowrap">
                <router-link :to="`/repository/${repo.name}`" class="hover:underline">
                  {{ repo.name }}
                </router-link>
              </td>
              
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ repo.open }}
              </td>
              
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ repo.closed }}
              </td>
              
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right font-semibold">
                {{ repo.total }}
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap !text-right" :class="percentageClass(repo.closedPercentage)">
                {{ repo.closedPercentage }}%
              </td>
            </tr>
            <tr v-if="!isLoading && repositoryStats.length === 0">
               <td colspan="5" class="px-6 py-4 text-center">Nenhum repositório encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminLayout from '../../../../layouts/AdminLayout.vue'; 
import api from '../../../../axios.ts'; 

const isLoading = ref(false);
const repositoryStats = ref([]);

const calculatePercentage = (value, total) => {
  if (total === 0) return '0.0';
  return ((value / total) * 100).toFixed(1);
};

const percentageClass = (percentage) => {
    const value = parseFloat(percentage);
    if (value >= 80) return 'text-green-600 dark:text-green-400';
    if (value >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
};

const fetchRepositoryStats = async () => {
  isLoading.value = true;

  // --- COMO DEVERIA FUNCIONAR COM A API REAL ---
  // Aqui você faria uma chamada para a API que retorna os dados dos repositórios.
  // Exemplo:
  // const response = await api.get('/repositories/stats');
  // Payload esperado:
  // [
  //   {
  //     name: "frontend-app",
  //     total: 200,
  //     closed: 155,
  //     open: 45
  //   },
  //   ...
  // ]
  // const processedData = response.data.map(repo => ({
  //     ...repo,
  //     closedPercentage: calculatePercentage(repo.closed, repo.total),
  // }));
  // repositoryStats.value = processedData;

  // Mock para demonstração:
  const mockData = [
    { name: 'frontend-app', open: 45, closed: 155, total: 200 },
    { name: 'backend-service-api', open: 15, closed: 85, total: 100 },
    { name: 'data-pipeline-etl', open: 8, closed: 12, total: 20 },
    { name: 'infrastructure-iac', open: 2, closed: 98, total: 100 },
  ];
  const processedData = mockData.map(repo => ({
    ...repo,
    closedPercentage: calculatePercentage(repo.closed, repo.total),
  }));
  try {
    await new Promise(resolve => setTimeout(resolve, 800)); 
    repositoryStats.value = processedData;
  } catch (error) {
    console.error("Erro ao buscar dados dos repositórios:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
    fetchRepositoryStats();
});
</script>