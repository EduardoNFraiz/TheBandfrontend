import type { RouteRecordRaw } from 'vue-router'

const organizationRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'OrganizationDetails',
    component: () => import('./views/OrganizationDetails.vue'),
    meta: {
      title: 'Organization',
      requiresAuth: true,
    },
  },
]

export default organizationRoutes