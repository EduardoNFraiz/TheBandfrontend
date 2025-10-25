<template>
  <AdminLayout>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="mb-2 font-semibold text-title-md text-[#2563EB]">
          Aplicações
        </h1>
        <router-link
          to="/applications/create"
          class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-[#2563EB] shadow-theme-xs hover:bg-[#1E52C9]"
        >
          Criar
        </router-link>
      </div>

      <div v-if="errorMessage" class="text-red-500 text-sm mt-2 mb-4 text-center">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="text-green-500 text-sm mt-2 mb-4 text-center">
        {{ successMessage }}
      </div>

      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A]">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-[#2D2D2D] text-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3">Nome</th>
              <th scope="col" class="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="2" class="px-6 py-4 text-center">Carregando dados...</td>
            </tr>
            <tr v-else-if="applications.length === 0">
              <td colspan="2" class="px-6 py-4 text-center">Nenhuma aplicação encontrada.</td>
            </tr>
            <tr
              v-else
              v-for="app in applications"
              :key="app.id"
              class="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2D2D2D] hover:bg-gray-50 dark:hover:bg-[#2D2D2D]"
            >
              <td class="px-6 py-4 text-gray-700 dark:text-gray-300">{{ app.name }}</td>
              <td class="px-6 py-4">
                <router-link
                  :to="`/applications/edit/${app.id}`"
                  class="text-[#2563EB] hover:underline mr-4"
                >
                  Editar
                </router-link>
                <button
                  @click="deleteApplication(app.id, app.name)"
                  class="text-red-500 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../../axios.ts';
import AdminLayout from '../../../layouts/AdminLayout.vue'

const applications = ref([]);
const configurations = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const fetchConfigurations = async () => {
  try {
    const response = await api.get('/core/configuration/');
    configurations.value = response.data.data || [];
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
  }
};

const fetchApplications = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    await Promise.all([
        api.get('/core/application/').then(res => {
            applications.value = res.data.data || res.data || [];
        }),
        fetchConfigurations()
    ]);
  } catch (error) {
    console.error("Erro ao buscar aplicações:", error);
    errorMessage.value = 'Não foi possível carregar os dados. Verifique a API.';
  } finally {
    isLoading.value = false;
  }
};

const deleteApplication = async (id, name) => {
  
  // 1. Verificação Local de Dependências
  const dependentConfigurations = configurations.value.filter(
    conf => conf.application_configuration === id || (conf.application_configuration && conf.application_configuration.id === id)
  );
  
  const dependencyCount = dependentConfigurations.length;
  
  let confirmMessage = `Tem certeza que deseja excluir a aplicação "${name}"?`;
  
  if (dependencyCount > 0) {
    // CORREÇÃO: Nova redação para a mensagem de dependência
    const plural = dependencyCount > 1 ? 'configurações' : 'configuração';
    confirmMessage = 
      `A aplicação "${name}" está relacionada com ${dependencyCount} ${plural}. ` +
      `Deseja excluí-las junto com a aplicação? (Esta ação não pode ser desfeita)`;
  }
  
  // 2. Confirmação
  if (!confirm(confirmMessage)) {
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    await api.delete(`/core/application/${id}/`);
    
    // Mensagem de sucesso (personalizada)
    let successText = `Aplicação "${name}" excluída com sucesso!`;
    if (dependencyCount > 0) {
        successText = `Aplicação "${name}" e ${dependencyCount} configurações vinculadas foram excluídas com sucesso!`;
    }
    successMessage.value = successText;
    
    await fetchApplications();
  } catch (error) {
    console.error("Erro ao excluir aplicação:", error);
    errorMessage.value = 'Erro ao excluir aplicação. Por favor, tente novamente.';
    if (error.response && error.response.data && error.response.data.detail) {
      errorMessage.value = error.response.data.detail;
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchApplications);
</script>