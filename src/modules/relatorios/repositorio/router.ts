import type { RouteRecordRaw } from 'vue-router'

const repositoryRoutes: RouteRecordRaw[] = [
  {
    path: '/repository',
    name: 'RepositoryList',
    component: () => import('./views/RepositoryList.vue'),
    meta: {
      title: 'Repository',
      requiresAuth: true,
    },
  },
  {
    path: '/repository/:repositoryName',
    name: 'RepositoryDetails',
    component: () => import('./views/RepositoryDetails.vue'), 
    meta: {
      title: 'RepositoryDetails',
      requiresAuth: true,
    },
  },
]

export default repositoryRoutes