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
              Criar Configuração
            </h1>
            <p class="text-sm text-[#A0A0A0]">
              Preencha os dados para criar uma nova configuração.
            </p>
          </div>
          <div>
            <form @submit.prevent="submitForm">
              <div class="space-y-5">
                <div v-if="errorMessage" class="text-red-500 text-sm mt-2 text-center">{{ errorMessage }}</div>
                <div v-if="successMessage" class="text-green-500 text-sm mt-2 text-center">{{ successMessage }}</div>

                <div>
                  <label
                    for="secret"
                    class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
                  >
                    Secret<span class="text-error-500">*</span>
                  </label>
                  <input
                    v-model="form.secret"
                    type="text"
                    id="secret"
                    name="secret"
                    placeholder="Digite o secret da configuração"
                    class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white/90 shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#00CED1] focus:outline-hidden focus:ring-3 focus:ring-[#00CED1]/10"
                    required
                  />
                </div>

                <div>
                  <label
                    for="user"
                    class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
                  >
                    Usuário<span class="text-error-500">*</span>
                  </label>
                  <input
                    v-model="form.user"
                    type="text"
                    id="user"
                    name="user"
                    placeholder="Digite o nome de usuário"
                    class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white/90 shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#00CED1] focus:outline-hidden focus:ring-3 focus:ring-[#00CED1]/10"
                    required
                  />
                </div>

                <div>
                  <label
                    for="repository"
                    class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
                  >
                    Repositório<span class="text-error-500">*</span>
                  </label>
                  <input
                    v-model="form.repository"
                    type="text"
                    id="repository"
                    name="repository"
                    placeholder="Ex: nome-do-repositorio"
                    class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white/90 shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#00CED1] focus:outline-hidden focus:ring-3 focus:ring-[#00CED1]/10"
                    required
                  />
                </div>

                <div>
                  <label
                    for="organization_configuration"
                    class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
                  >
                    Organização<span class="text-error-500">*</span>
                  </label>
                  <div class="relative">
                    <select
                      v-model="form.organization_configuration"
                      id="organization_configuration"
                      name="organization_configuration"
                      class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white/90 shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#00CED1] focus:outline-hidden focus:ring-3 focus:ring-[#00CED1]/10"
                      required
                    >
                      <option :value="null" disabled>Selecione uma organização</option>
                      <option v-for="org in organizations" :key="org.id" :value="org.id">
                        {{ org.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    for="application_configuration"
                    class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
                  >
                    Aplicação<span class="text-error-500">*</span>
                  </label>
                  <div class="relative">
                    <select
                      v-model="form.application_configuration"
                      id="application_configuration"
                      name="application_configuration"
                      class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white/90 shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#00CED1] focus:outline-hidden focus:ring-3 focus:ring-[#00CED1]/10"
                      required
                    >
                      <option :value="null" disabled>Selecione uma aplicação</option>
                      <option v-for="app in applications" :key="app.id" :value="app.id">
                        {{ app.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-[#00CED1] shadow-theme-xs hover:bg-[#00CED1]/80"
                    :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
                  >
                    {{ isLoading ? 'Salvando...' : 'Salvar Configuração' }}
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
  name: 'ConfigurationForm',
  components: {
    FullScreenLayout,
    CommonGridShape,
  },
  props: ['id'],
  data() {
    return {
      form: {
        secret: '',
        user: '',
        repository: '',
        organization_configuration: null,
        application_configuration: null,
      },
      organizations: [],
      applications: [],
      isLoading: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  async created() {
    await this.fetchOrganizations();
    await this.fetchApplications();

    if (this.id) {
      await this.fetchConfiguration(this.id);
    }
  },
  methods: {
    async fetchOrganizations() {
      this.errorMessage = '';
      try {
        const response = await api.get('/core/organization/');

        this.organizations = response.data.data || [];
        console.log("Organizações carregadas (ajustado):", this.organizations);
      } catch (error) {
        console.error("Erro ao buscar organizações:", error);
        this.errorMessage = 'Não foi possível carregar as organizações. Verifique a API e seu token.';
      }
    },
    async fetchApplications() {
      this.errorMessage = '';
      try {
        const response = await api.get('/core/application/');
        
        this.applications = response.data.data || []; 
        console.log("Aplicações carregadas (ajustado):", this.applications); 
      } catch (error) {
        console.error("Erro ao buscar aplicações:", error);
        this.errorMessage = 'Não foi possível carregar as aplicações. Verifique a API e seu token.';
      }
    },
    async fetchConfiguration(id) {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const response = await api.get(`/core/configuration/${id}/`);
        this.form = response.data;
        this.successMessage = '';
      } catch (error) {
        this.errorMessage = 'Erro ao carregar os dados da configuração para edição.';
        if (error.response && error.response.status === 404) {
          this.errorMessage = 'Configuração não encontrada.';
        }
        console.error("Erro ao buscar configuração para edição:", error);
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
          response = await api.put(`/core/configuration/${this.id}/`, this.form);
          this.successMessage = 'Configuração atualizada com sucesso!';
        } else {
          response = await api.post('/core/configuration/', this.form);
          this.successMessage = 'Configuração criada com sucesso!';
          this.form = { secret: '', user: '', repository: '', organization_configuration: null, application_configuration: null };
        }
        console.log("Resposta da API:", response.data);
      } catch (error) {
        this.errorMessage = 'Erro ao salvar a configuração. Verifique os dados e tente novamente.';
        if (error.response && error.response.data) {
          let errors = [];
          if (error.response.data.detail) {
             errors.push(error.response.data.detail);
          } else {
            for (const key in error.response.data) {
              if (Object.hasOwnProperty.call(error.response.data, key)) {
                errors.push(`${key}: ${Array.isArray(error.response.data[key]) ? error.response.data[key].join(', ') : error.response.data[key]}`);
              }
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