<template>
  <AdminLayout>
    <div class="p-6">
      <div class="flex flex-col mb-6 w-full">
        <h1 class="mb-2 font-semibold text-title-md text-[#2563EB]">
          Resumo Geral de Estatísticas por Desenvolvedor
        </h1>
        <p class="text-sm text-[#A0A0A0] mb-4">
          Este documento lista todos os desenvolvedores com seus respectivos relatórios e estatísticas resumidas.
        </p>
      </div>

      <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
        Tabela Resumo por Autor e Status
      </h2>
      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] mb-8">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Autor (link)</th>
              <th scope="col" class="px-6 py-3 text-right">Total</th>
              <th scope="col" class="px-6 py-3 text-right">Closed (%)</th>
              <th scope="col" class="px-6 py-3 text-right">Open (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="4" class="px-6 py-4 text-center">Carregando dados dos desenvolvedores...</td>
            </tr>
            <tr 
              v-else
              v-for="dev in developerStats"
              :key="dev.name"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-[#2563EB] font-medium whitespace-nowrap">
                <router-link :to="`/developer/${dev.name}`" class="hover:underline">
                  {{ dev.name }}
                </router-link>
              </td>
              
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right">
                {{ dev.total }}
              </td>
              
              <td 
                class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right"
              >
                {{ dev.closed }} ({{ dev.closedPercentage.toFixed(1) }}%)
              </td>

              <td 
                class="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap !text-right"
              >
                {{ dev.open }} ({{ dev.openPercentage.toFixed(1) }}%)
              </td>
            </tr>
            <tr v-if="!isLoading && developerStats.length === 0">
               <td colspan="4" class="px-6 py-4 text-center">Nenhum desenvolvedor encontrado.</td>
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

// --- Estado ---
const isLoading = ref(false);
const developerStats = ref([]);

// --- Métodos de Lógica e Formatação ---

const calculateStats = (total, closed) => {
    const open = total - closed;
    const closedPercentage = total > 0 ? (closed / total) * 100 : 0;
    const openPercentage = 100 - closedPercentage; 
    
    return {
        total,
        closed,
        open,
        closedPercentage,
        openPercentage,
    };
};

// --- Simulação de Dados ---
const fetchDeveloperStats = async () => {
    isLoading.value = true;

  // --- COMO DEVERIA FUNCIONAR COM A API REAL ---
  // Aqui você faria uma chamada para a API que retorna os dados resumidos dos desenvolvedores.
  // Exemplo:
  // const response = await api.get('/developers/stats');
  // Payload esperado:
  // [
  //   {
  //     name: "ArthurCremasco",
  //     total: 43,
  //     closed: 38,
  //     open: 5
  //   },
  //   ...
  // ]
  // developerStats.value = response.data;

  // Dados base: Nome, Total de Issues, Issues Fechadas (MOCKADO IGUAL AO SEU EXEMPLO)
  const rawData = [
    { name: '0xdeadbad', total: 15, closed: 15 },
    { name: 'AndreCoelhoS', total: 41, closed: 41 },
    { name: 'ArthurCremasco', total: 43, closed: 38 },
    { name: 'BrenoAmancio', total: 17, closed: 10 },
    { name: 'CaioLessaSimao', total: 36, closed: 32 },
    { name: 'Eduardo2006g', total: 124, closed: 92 },
  ];
    
    const processedData = rawData.map(dev => ({
        name: dev.name,
        ...calculateStats(dev.total, dev.closed)
    }));
    
    try {
        await new Promise(resolve => setTimeout(resolve, 800)); 
        developerStats.value = processedData;
    } catch (error) {
        console.error("Erro ao buscar dados dos desenvolvedores:", error);
    } finally {
        isLoading.value = false;
    }
};

// --- Início ---
onMounted(() => {
    fetchDeveloperStats();
});
</script>