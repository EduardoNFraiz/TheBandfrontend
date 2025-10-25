<template>
  <AdminLayout>
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex flex-col">
          <h1 class="mb-2 font-semibold text-title-md text-[#2563EB]">
            Resumo de Desempenho - {{ developerData.name }}
          </h1>
        </div>
        
        <div class="flex gap-2">
          <router-link
            :to="`/developer/${developerData.name}`"
            class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-[#2563EB] shadow-theme-xs hover:bg-[#1E52C9]"
          >
            Voltar para Estatísticas
          </router-link>
        </div>
      </div>

      <!-- Visão Geral -->
      <div class="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] p-6 mb-6">
        <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
          Visão Geral
        </h2>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ developerData.summary }}
        </p>
      </div>

      <!-- Competências Técnicas -->
      <div class="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] p-6 mb-6">
        <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
          Competências Técnicas
        </h2>
        <div class="space-y-4">
          <div v-for="skill in technicalSkills" :key="skill.category" class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
            <h3 class="font-medium text-black dark:text-white mb-2">{{ skill.category }}</h3>
            <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {{ skill.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Soft Skills -->
      <div class="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] p-6 mb-6">
        <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
          Soft Skills
        </h2>
        <div class="space-y-4">
          <div v-for="skill in softSkills" :key="skill.name" class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
            <h3 class="font-medium text-black dark:text-white mb-2">{{ skill.name }}</h3>
            <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {{ skill.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Áreas de Alocação -->
      <div class="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] p-6 mb-6">
        <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
          Áreas de Alocação Futura
        </h2>
        <div class="space-y-3">
          <div v-for="area in allocationAreas" :key="area" class="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
            <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {{ area }}
            </p>
          </div>
        </div>
      </div>

      <!-- Recomendações -->
      <div class="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-theme-xs border border-[#E5E7EB] dark:border-[#2D2D2D] p-6">
        <h2 class="mb-4 font-semibold text-lg text-black dark:text-white">
          Recomendações
        </h2>
        <div class="space-y-3">
          <div v-for="recommendation in recommendations" :key="recommendation" class="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
            <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {{ recommendation }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';

const route = useRoute();

// Dados mockados
const developerData = ref({
  name: route.params.developerName || 'AndreCoelhoS',
  summary: 'Desenvolvedor altamente produtivo e confiável com forte perfil de DevOps. Histórico consistente de entregas e habilidades sólidas em infraestrutura e observabilidade.'
});

const technicalSkills = ref([
  {
    category: 'DevOps',
    description: 'Configuração de servidores, deploy com Kubernetes, automação, gestão de certificados HTTPS e rotinas de backup.'
  },
  {
    category: 'Observabilidade',
    description: 'Instrumentação com OpenTelemetry, configuração de coletores OTEL e uso de ferramentas como SigNoz.'
  },
  {
    category: 'Infraestrutura Cloud',
    description: 'Criação de máquinas virtuais AWS, gerenciamento de permissionamento e implementação de arquiteturas escaláveis.'
  },
  {
    category: 'Ferramentas e Tecnologias',
    description: 'Docker, Strapi, WordPress, Kubernetes e estudos em Infraestrutura como Código.'
  }
]);

const softSkills = ref([
  {
    name: 'Confiabilidade',
    description: '100% das issues fechadas, alto comprometimento com prazos e consistência nas entregas.'
  },
  {
    name: 'Proatividade',
    description: 'Assume tarefas independentemente e identifica problemas antecipadamente.'
  },
  {
    name: 'Comunicação',
    description: 'Documenta processos de forma clara e comunica-se eficazmente com a equipe.'
  },
  {
    name: 'Colaboração',
    description: 'Participa ativamente em issues com múltiplos assignees e apoia outros membros.'
  }
]);

const allocationAreas = ref([
  'Projetos de Infraestrutura e DevOps para criação e manutenção de ambientes críticos',
  'Liderança Técnica em automação de infraestrutura e tomada de decisões arquiteturais',
  'Mentoria em temas de DevOps e observabilidade para capacitação da equipe'
]);

const recommendations = ref([
  'Continuar estudos em Infraestrutura como Código com Terraform e CloudFormation',
  'Investigar causas das quinzenas com performance abaixo do esperado',
  'Participar de atividades de compartilhamento de conhecimento como workshops'
]);
</script>