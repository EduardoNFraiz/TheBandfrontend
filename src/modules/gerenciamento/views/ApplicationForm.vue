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
        <h1
          class="mb-2 font-semibold text-title-md text-[#2563EB]"
        >
          {{ id ? 'Editar Aplicação' : 'Criar Aplicação' }}
        </h1>
        <p class="text-sm text-[#A0A0A0] mb-4">
          Preencha os dados para {{ id ? 'editar a' : 'criar uma nova' }} aplicação.
        </p>
      </div>

      <div class="w-full max-w-xl bg-white p-6 rounded-lg shadow-theme-xs border border-[#2D2D2D]"> 
        <form @submit.prevent="submitForm">
          <div class="space-y-5">
            <div v-if="errorMessage" class="text-red-500 text-sm mt-2 text-center">{{ errorMessage }}</div>
            <div v-if="successMessage" class="text-green-500 text-sm mt-2 text-center">{{ successMessage }}</div>

            <div>
              <label
                for="name"
                class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
              >
                Nome<span class="text-error-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                name="name"
                placeholder="Ex: App de E-commerce"
                class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-white px-4 py-2.5 text-sm text-black shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#BDBDBD] focus:outline-hidden focus:ring-3 focus:ring-[#BDBDBD]/10"
                required
              />
            </div>

            <div class="pt-2">
              <button
                type="submit"
                :disabled="isLoading"
                class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-[#2563EB] shadow-theme-xs hover:bg-[#1E52C9]" 
                :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
              >
                {{ isLoading ? 'Salvando...' : 'Salvar' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import api from '../../../axios.ts';
import AdminLayout from '../../../layouts/AdminLayout.vue'

export default {
  name: 'ApplicationForm',
  components: {
    AdminLayout, 
  },
  props: ['id'],
  data() {
    return {
      form: { name: '' },
      isLoading: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  async created() {
    if (this.id) {
      await this.fetchApplication(this.id);
    }
  },
  methods: {
    async fetchApplication(id) {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const response = await api.get(`/core/application/${id}/`);
        this.form = response.data; 
        this.successMessage = '';
      } catch (error) {
        this.errorMessage = 'Erro ao carregar os dados da aplicação para edição.';
        if (error.response && error.response.status === 404) {
          this.errorMessage = 'Aplicação não encontrada.';
        }
        console.error("Erro ao buscar aplicação para edição:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async submitForm() {
      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';
      try {
        let response;
        if (this.id) {
          response = await api.put(`/core/application/${this.id}/`, this.form);
          this.successMessage = 'Aplicação atualizada com sucesso!';
        } else {
          response = await api.post('/core/application/', this.form); 
          this.successMessage = 'Aplicação criada com sucesso!';
          this.form.name = '';
        }
        console.log("Resposta da API:", response.data);
      } catch (error) {
        this.errorMessage = 'Erro ao salvar a aplicação. Por favor, tente novamente.';
        if (error.response && error.response.data) {
          let errors = [];
          for (const key in error.response.data) {
            if (Object.hasOwnProperty.call(error.response.data, key)) {
              errors.push(`${key}: ${error.response.data[key].join(', ')}`);
            }
          }
          this.errorMessage = errors.length > 0 ? errors.join('; ') : this.errorMessage;
          console.error("Erro detalhado da API:", error.response.data);
        } else {
          console.error("Erro na requisição:", error.message);
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>