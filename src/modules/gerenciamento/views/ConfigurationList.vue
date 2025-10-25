<template>
  <AdminLayout>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="mb-2 font-semibold text-title-md text-[#2563EB]">
          Configurações
        </h1>
        <router-link
          to="/configurations/create"
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

      <div class="overflow-x-auto rounded-lg shadow-theme-xs border border-[#E5E7EB] bg-white">
        <table class="w-full text-left text-sm text-gray-500">
          <thead class="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th scope="col" class="px-6 py-3">Repositório</th>
              <th scope="col" class="px-6 py-3">Organização</th>
              <th scope="col" class="px-6 py-3">Aplicação</th>
              <th scope="col" class="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="4" class="px-6 py-4 text-center">Carregando configurações...</td>
            </tr>
            <tr v-else-if="configurations.length === 0">
              <td colspan="4" class="px-6 py-4 text-center">Nenhuma configuração encontrada.</td>
            </tr>
            <tr
              v-else
              v-for="conf in configurations"
              :key="conf.id"
              class="bg-white border-b border-gray-200 hover:bg-gray-50"
            >
              <td class="px-6 py-4 text-gray-700">{{ conf.repository }}</td>
              <td class="px-6 py-4 text-gray-700">
                  {{ conf.organization_configuration.name || 'N/A' }}
              </td>
              <td class="px-6 py-4 text-gray-700">
                  {{ conf.application_configuration.name || 'N/A' }}
              </td>
              <td class="px-6 py-4">
                <router-link
                  :to="`/configurations/edit/${conf.id}`"
                  class="text-[#2563EB] hover:underline mr-4"
                >
                  Editar
                </router-link>
                <button
                  @click="deleteConfiguration(conf.id, conf.repository)"
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

const configurations = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const fetchConfigurations = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await api.get('/core/configuration/');
    configurations.value = response.data.data || [];
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
    if (error.response && error.response.data && error.response.data.detail) {
      errorMessage.value = `Erro: ${error.response.data.detail}`;
    } else {
      errorMessage.value = 'Não foi possível carregar as configurações. Verifique a API e seu token.';
    }
  } finally {
    isLoading.value = false;
  }
};

const deleteConfiguration = async (id, repository) => {
  if (!confirm(`Tem certeza que deseja excluir a configuração para o repositório "${repository}"?`)) {
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    await api.delete(`/core/configuration/${id}/`);
    successMessage.value = 'Configuração excluída com sucesso!';
    await fetchConfigurations();
  } catch (error) {
    console.error("Erro ao excluir configuração:", error);
    errorMessage.value = 'Erro ao excluir configuração. Por favor, tente novamente.';
    if (error.response && error.response.data && error.response.data.detail) {
      errorMessage.value = error.response.data.detail;
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchConfigurations);
</script>