
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Ecommerce',
      component: () => import('../views/Ecommerce.vue'),
      meta: {
        title: 'eCommerce Dashboard',
      },
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: {
        title: 'Calendar',
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
        requiresAuth: true,
      },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
        requiresAuth: true,
      },
    },
    {
      path: '/basic-tables',
      name: 'Basic Tables',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: {
        title: 'Basic Tables',
        requiresAuth: true,
      },
    },
    {
      path: '/line-chart',
      name: 'Line Chart',
      component: () => import('../views/Chart/LineChart/LineChart.vue'),
      meta: {
        title: 'Line Chart',
        requiresAuth: true,
      },
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
      meta: {
        title: 'Bar Chart',
        requiresAuth: true,
      },
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: {
        title: 'Alerts',
        requiresAuth: true,
      },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: {
        title: 'Avatars',
        requiresAuth: true,
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
        requiresAuth: true,
      },
    },
    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
        requiresAuth: true,
      },
    },
    {
      path: '/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: {
        title: 'Images',
        requiresAuth: true,
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: {
        title: 'Videos',
        requiresAuth: true,
      },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: {
        title: 'Blank',
        requiresAuth: true,
      },
    },
    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },

    // --- NOVAS ROTAS PARA ORGANIZAÇÃO ---
    {
      path: '/organizations',
      name: 'OrganizationsList',
      // Você pode criar um componente de listagem real aqui, por agora, usando BlankPage
      component: () => import('../views/Pages/BlankPage.vue'), 
      meta: {
        title: 'Lista de Organizações',
        requiresAuth: true,
      },
    },
    {
      path: '/organizations/create',
      name: 'OrganizationCreate',
      component: () => import('../views/ApplConfOrg/OrganizationForm.vue'), // Assumindo views/Forms/
      meta: {
        title: 'Criar Organização',
        requiresAuth: true,
      },
    },
    {
        // Rota para editar uma organização existente
        path: '/organizations/edit/:id',
        name: 'OrganizationEdit',
        component: () => import('../views/ApplConfOrg/OrganizationForm.vue'), // Reutiliza o mesmo formulário
        props: true, // Permite que o ID seja passado como prop para o componente
        meta: {
            title: 'Editar Organização',
            requiresAuth: true,
        },
    },


    // --- NOVAS ROTAS PARA APLICAÇÃO ---
    {
      path: '/applications',
      name: 'ApplicationsList',
      // Você pode criar um componente de listagem real aqui, por agora, usando BlankPage
      component: () => import('../views/Pages/BlankPage.vue'), 
      meta: {
        title: 'Lista de Aplicações',
        requiresAuth: true,
      },
    },
    {
      path: '/applications/create',
      name: 'ApplicationCreate',
      component: () => import('../views/ApplConfOrg/ApplicationForm.vue'), // Assumindo views/Forms/
      meta: {
        title: 'Criar Aplicação',
        requiresAuth: true,
      },
    },
    {
        // Rota para editar uma aplicação existente
        path: '/applications/edit/:id',
        name: 'ApplicationEdit',
        component: () => import('../views/ApplConfOrg/ApplicationForm.vue'), // Reutiliza o mesmo formulário
        props: true,
        meta: {
            title: 'Editar Aplicação',
            requiresAuth: true,
        },
    },

    // --- NOVAS ROTAS PARA CONFIGURAÇÃO ---
    {
      path: '/configurations',
      name: 'ConfigurationsList',
      // Você pode criar um componente de listagem real aqui, por agora, usando BlankPage
      component: () => import('../views/Pages/BlankPage.vue'), 
      meta: {
        title: 'Lista de Configurações',
        requiresAuth: true,
      },
    },
    {
      path: '/configurations/create',
      name: 'ConfigurationCreate',
      component: () => import('../views/ApplConfOrg/ConfigurationForm.vue'), // Assumindo views/Forms/
      meta: {
        title: 'Criar Configuração',
        requiresAuth: true,
      },
    },
    {
        // Rota para editar uma configuração existente
        path: '/configurations/edit/:id',
        name: 'ConfigurationEdit',
        component: () => import('../views/ApplConfOrg/ConfigurationForm.vue'), // Reutiliza o mesmo formulário
        props: true,
        meta: {
            title: 'Editar Configuração',
            requiresAuth: true,
        },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const defaultTitle = to.meta.title || 'The Band Solution';
  document.title = `The Band Solution | ${defaultTitle}`; 

  const requiresAuth = to.meta.requiresAuth;
  const isAuthenticated = !!localStorage.getItem('access_token');

  // Lógica de proteção de rotas
  if (requiresAuth && !isAuthenticated) {
    next('/signin');
  } else if ((to.name === 'Signin' || to.name === 'Signup') && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;