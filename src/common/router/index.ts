import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

import authRoutes from '@/modules/autenticacao/router'
import managementRoutes from '@/modules/gerenciamento/router'
import profileRoutes from '@/modules/perfil/router'
import developerRoutes from '@/modules/relatorios/desenvolvedor/router'
import organizationRoutes from '@/modules/relatorios/organizacao/router'
import repositoryRoutes from '@/modules/relatorios/repositorio/router'
import teamRoutes from '@/modules/relatorios/equipe/router'


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalized, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    ...authRoutes,
    ...managementRoutes,
    ...profileRoutes,
    ...developerRoutes,
    ...organizationRoutes,
    ...repositoryRoutes,
    ...teamRoutes,
  ],
})

router.beforeEach((to, from, next) => {

  const title = (to.meta.title as string | undefined) || 'The Band Solution'
  document.title = `The Band Solution | ${title}`
  
  const requiresAuth = !!to.meta.requiresAuth

  const isAuthenticated = !!localStorage.getItem('access_token')
  
  const isAuthRoute = to.name === 'Signin' || to.name === 'Signup'
  const homeRouteName = 'OrganizationDetails'

  if (isAuthRoute && isAuthenticated) {
    return next({ name: homeRouteName })
  }

  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'Signin' })
  }

  next()
})

export default router