<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="flex items-center text-gray-700 dark:text-gray-400"
      @click.prevent="toggleDropdown"
    >
      <span class="mr-3 overflow-hidden rounded-full h-11 w-11">
        <img :src="userAvatar" alt="User" @error="handleImageError" />
      </span>

      <span class="block mr-1 font-medium text-theme-sm">{{ userName }}</span>

      <ChevronDownIcon :class="{ 'rotate-180': dropdownOpen }" />
    </button>

    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
    >
      <div>
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
          {{ userName }}
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
          {{ userEmail }}
        </span>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <component
              :is="item.icon"
              class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            />
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      
      <button @click="signOut" class="px-4 py-2 text-sm text-white rounded bg-red-500 hover:bg-red-600">
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { UserCircleIcon, ChevronDownIcon, LogoutIcon } from '@/common/assets/icons/'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useGravatar } from '@/common/composables/useGravatar'; // ← Importar composable

const router = useRouter();
const { getGravatarUrl } = useGravatar(); // ← Usar composable

// Defina a URL da sua API para buscar o perfil
const USER_PROFILE_API = 'http://localhost:8000/user/me';

// VARIÁVEIS REATIVAS
const userName = ref('Carregando...') 
const userEmail = ref('carregando...') 
const avatarVersion = ref(1) // ← Adicione esta linha para forçar atualização

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

// AVATAR COM GRAVATAR - FORÇANDO ATUALIZAÇÃO
const userAvatar = computed(() => {
  const gravatarUrl = getGravatarUrl(userEmail.value);
  // Adiciona timestamp para evitar cache
  return `${gravatarUrl}&v=${avatarVersion.value}&t=${Date.now()}`;
});

const menuItems = [
  { href: '/profile', icon: UserCircleIcon, text: 'Edit profile' },
]

// Fallback se a imagem não carregar
const handleImageError = (event) => {
  event.target.src = '/images/user/owner.jpg';
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const fetchUserProfile = async () => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        console.warn('Token de acesso não encontrado. Redirecionando para login.');
        router.push('/signin');
        return;
    }

    try {
        const response = await axios.get(USER_PROFILE_API, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const userData = response.data;
        
        userName.value = userData.name || 'Usuário'; 
        userEmail.value = userData.email || 'email@naoencontrado.com';

    } catch (error) {
        console.error('Falha ao carregar perfil do usuário:', error);
        
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn('Sessão expirada ou token inválido. Redirecionando.');
            signOut(); 
        } else {
            userName.value = 'Erro ao Carregar';
            userEmail.value = 'erro-de-conexao';
        }
    }
};

const trackEvent = (eventName, eventData = {}) => {
  axios.post('http://localhost:8000/api/telemetry/', {
    event_name: eventName,
    event_data: eventData,
  })
  .catch(error => {
    console.error('Falha ao enviar evento de telemetria:', error);
  });
};

const signOut = () => {
    trackEvent('auth_logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/signin');
    closeDropdown();
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  fetchUserProfile();
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>