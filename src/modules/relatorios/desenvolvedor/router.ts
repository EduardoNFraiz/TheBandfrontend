import type { RouteRecordRaw } from 'vue-router'

const developerRoutes: RouteRecordRaw[] = [
  {
    path: '/developer',
    name: 'DeveloperList',
    component: () => import('./views/DeveloperList.vue'),
    meta: {
      title: 'Developer',
      requiresAuth: true,
    },
  },
  {
    path: '/developer/:developerName',
    name: 'DeveloperDetails',
    component: () => import('./views/DeveloperDetails.vue'), 
    meta: {
      title: 'DeveloperDetails',
      requiresAuth: true,
    },
  },
  {
    path: '/developer/:developerName/competence',
    name: 'DeveloperCompetence',
    component: () => import('./views/DeveloperCompetence.vue'),
    meta: {
      title: 'Competências do Desenvolvedor',
      requiresAuth: true,
    },
  },
]

export default developerRoutes