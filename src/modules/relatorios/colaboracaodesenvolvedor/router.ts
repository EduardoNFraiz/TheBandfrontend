import type { RouteRecordRaw } from 'vue-router'

const profileRoutes: RouteRecordRaw[] = [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('./views/UserProfile.vue'),
    meta: {
      title: 'Profile',
      requiresAuth: true,
    },
  },
]

export default profileRoutes