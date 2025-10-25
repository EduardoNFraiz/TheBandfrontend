import type { RouteRecordRaw } from 'vue-router'

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('./views/Signin.vue'),
    meta: {
      title: 'Signin',
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('./views/Signup.vue'),
    meta: {
      title: 'Signup',
    },
  },
]

export default authRoutes