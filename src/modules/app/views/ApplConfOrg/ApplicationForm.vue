<template>
  <FullScreenLayout>
    <div
      class="relative flex flex-col w-full min-h-screen lg:flex-row bg-[#1A1A1A]"
    >
      <div class="flex flex-col flex-1 w-full lg:w-1/2">
        <div class="w-full max-w-md pt-10 mx-auto">
        </div>

        <div class="flex flex-col flex-1 w-full max-w-md mx-auto pb-10">
          <div class="mb-5 sm:mb-8">
            <h1
              class="mb-2 font-semibold text-white/90 text-title-sm sm:text-title-md"
            >
              Criar Aplicação
            </h1>
            <p class="text-sm text-[#A0A0A0]">
              Preencha os dados para criar uma nova aplicação.
            </p>
          </div>
          <div>
            <form @submit.prevent="submitForm">
              <div class="space-y-5">
                <div v-if="errorMessage" class="text-red-500 text-sm mt-2 text-center">{{ errorMessage }}</div>
                <div v-if="successMessage" class="text-green-500 text-sm mt-2 text-center">{{ successMessage }}</div>

                <div>
                  <label
                    for="name"
                    class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
                  >
                    Nome da Aplicação<span class="text-error-500">*</span>
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ex: App de E-commerce"
                    class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white/90 shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#00CED1] focus:outline-hidden focus:ring-3 focus:ring-[#00CED1]/10"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-[#00CED1] shadow-theme-xs hover:bg-[#00CED1]/80"
                    :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
                  >
                    {{ isLoading ? 'Salvando...' : 'Salvar Aplicação' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="relative items-center hidden w-full lg:w-1/2 bg-[#2D2D2D] lg:flex min-h-screen overflow-auto">
        <div class="flex items-center justify-center z-1 w-full h-full">
          <common-grid-shape />
          <div class="flex flex-col items-center">
            <div class="flex items-center mb-4">
              <router-link to="/" class="block">
                <img width="231" height="48" src="/images/logo/auth-logo.png" alt="Logo" />
              </router-link>
              <p class="text-white text-4xl font-bold whitespace-nowrap">The Band Solution</p>
            </div>
            <p class="text-center text-white/60">
              Sua orquestra de dados, tocando informações para sua organização.
            </p>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script>
import api from '../../../../axios';
import CommonGridShape from '@/common/components/common/CommonGridShape.vue';
import FullScreenLayout from '@/common/components/layout/FullScreenLayout.vue';

export default {
  name: 'ApplicationForm',
  components: {
    FullScreenLayout,
    CommonGridShape,
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