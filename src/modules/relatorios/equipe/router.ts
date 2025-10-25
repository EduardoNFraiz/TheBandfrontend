import type { RouteRecordRaw } from 'vue-router'

const teamRoutes: RouteRecordRaw[] = [
  {
    path: '/team',
    name: 'TeamList',
    component: () => import('./views/TeamList.vue'),
    meta: {
      title: 'Índice de Equipes',
      requiresAuth: true,
    },
  },
  {
    path: '/team/:teamName', 
    name: 'TeamDetails', 
    component: () => import('./views/TeamDetails.vue'), 
    meta: {
      title: 'Detalhes da Equipe',
      requiresAuth: true,
    },
  },
  {
    path: '/team/:teamName/report/:reportDate', 
    name: 'TeamResume', 
    component: () => import('./views/TeamResume.vue'), 
    meta: {
      title: 'Relatório Semanal da Equipe',
      requiresAuth: true,
    },
    props: true,
  },
]

export default teamRoutes