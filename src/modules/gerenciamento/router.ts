import type { RouteRecordRaw } from 'vue-router'

const managementRoutes: RouteRecordRaw[] = [
  // --- ROTAS PARA ORGANIZAÇÃO ---
  {
    path: '/organizations',
    name: 'OrganizationsList',
    component: () => import('./views/OrganizationList.vue'),
    meta: {
      title: 'Lista de Organizações',
      requiresAuth: true,
    },
  },
  {
    path: '/organizations/create',
    name: 'OrganizationCreate',
    component: () => import('./views/OrganizationForm.vue'),
    meta: {
      title: 'Criar Organização',
      requiresAuth: true,
    },
  },
  {
    path: '/organizations/edit/:id',
    name: 'OrganizationEdit',
    component: () => import('./views/OrganizationForm.vue'),
    props: true,
    meta: {
      title: 'Editar Organização',
      requiresAuth: true,
    },
  },

  // --- ROTAS PARA APLICAÇÃO ---
  {
    path: '/applications',
    name: 'ApplicationsList',
    component: () => import('./views/ApplicationList.vue'),
    meta: {
      title: 'Lista de Aplicações',
      requiresAuth: true,
    },
  },
  {
    path: '/applications/create',
    name: 'ApplicationCreate',
    component: () => import('./views/ApplicationForm.vue'),
    meta: {
      title: 'Criar Aplicação',
      requiresAuth: true,
    },
  },
  {
    path: '/applications/edit/:id',
    name: 'ApplicationEdit',
    component: () => import('./views/ApplicationForm.vue'),
    props: true,
    meta: {
      title: 'Editar Aplicação',
      requiresAuth: true,
    },
  },

  // --- ROTAS PARA CONFIGURAÇÃO ---
  {
    path: '/configurations',
    name: 'ConfigurationsList',
    component: () => import('./views/ConfigurationList.vue'),
    meta: {
      title: 'Lista de Configurações',
      requiresAuth: true,
    },
  },
  {
    path: '/configurations/create',
    name: 'ConfigurationCreate',
    component: () => import('./views/ConfigurationForm.vue'),
    meta: {
      title: 'Criar Configuração',
      requiresAuth: true,
    },
  },
  {
    path: '/configurations/edit/:id',
    name: 'ConfigurationEdit',
    component: () => import('./views/ConfigurationForm.vue'),
    props: true,
    meta: {
      title: 'Editar Configuração',
      requiresAuth: true,
    },
  },
]

export default managementRoutes