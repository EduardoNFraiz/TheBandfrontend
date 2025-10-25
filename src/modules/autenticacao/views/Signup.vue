<template>
  <FullScreenLayout>
    <div
      class="relative flex flex-col w-full min-h-screen lg:flex-row bg-[#1A1A1A]"
    >
      <div class="flex flex-col flex-1 w-full lg:w-1/2">
        <div class="w-full max-w-md pt-10 mx-auto">
        </div>
        
        <div class="flex flex-col flex-1 w-full max-w-md mx-auto pb-10">
          <div class="mb-5 sm:mb-8">
            <h1
              class="mb-2 font-semibold text-white/90 text-title-sm sm:text-title-md"
            >
              Sign Up
            </h1>
            <p class="text-sm text-[#A0A0A0]">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <form @submit.prevent="handleSubmit">
              <div class="space-y-5">
                <div v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</div>
                <div>
                  <label
                    for="name"
                    class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
                  >
                    Name<span class="text-error-500">*</span>
                  </label>
                  <input
                    v-model="name"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white/90 shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#00CED1] focus:outline-hidden focus:ring-3 focus:ring-[#00CED1]/10"
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
                  >
                    Email<span class="text-error-500">*</span>
                  </label>
                  <input
                    v-model="email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="info@gmail.com"
                    class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] px-4 py-2.5 text-sm text-white/90 shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#00CED1] focus:outline-hidden focus:ring-3 focus:ring-[#00CED1]/10"
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
                  >
                    Password<span class="text-error-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      id="password"
                      placeholder="Enter your password"
                      class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] py-2.5 pl-4 pr-11 text-sm text-white/90 shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#00CED1] focus:outline-hidden focus:ring-3 focus:ring-[#00CED1]/10"
                    />
                    <span
                      @click="togglePasswordVisibility"
                      class="absolute z-30 text-[#A0A0A0] -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      <svg
                        v-if="!showPassword"
                        class="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.0002 13.8619C7.23361 13.8619 4.86803 12.1372 3.92328 9.70241C4.86804 7.26761 7.23361 5.54297 10.0002 5.54297C12.7667 5.54297 15.1323 7.26762 16.0771 9.70243C15.1323 12.1372 12.7667 13.8619 10.0002 13.8619ZM10.0002 4.04297C6.48191 4.04297 3.49489 6.30917 2.4155 9.4593C2.3615 9.61687 2.3615 9.78794 2.41549 9.94552C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C13.5184 15.3619 16.5055 13.0957 17.5849 9.94555C17.6389 9.78797 17.6389 9.6169 17.5849 9.45932C16.5055 6.30919 13.5184 4.04297 10.0002 4.04297ZM9.99151 7.84413C8.96527 7.84413 8.13333 8.67606 8.13333 9.70231C8.13333 10.7286 8.96527 11.5605 9.99151 11.5605H10.0064C11.0326 11.5605 11.8646 10.7286 11.8646 9.70231C11.8646 8.67606 11.0326 7.84413 10.0064 7.84413H9.99151Z"
                          fill="#A0A0A0"
                        />
                      </svg>
                      <svg
                        v-else
                        class="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.63803 3.57709C4.34513 3.2842 3.87026 3.2842 3.57737 3.57709C3.28447 3.86999 3.28447 4.34486 3.57737 4.63775L4.85323 5.91362C3.74609 6.84199 2.89363 8.06395 2.4155 9.45936C2.3615 9.61694 2.3615 9.78801 2.41549 9.94558C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C11.255 15.3619 12.4422 15.0737 13.4994 14.5598L15.3625 16.4229C15.6554 16.7158 16.1302 16.7158 16.4231 16.4229C16.716 16.13 16.716 15.6551 16.4231 15.3622L4.63803 3.57709ZM12.3608 13.4212L10.4475 11.5079C10.3061 11.5423 10.1584 11.5606 10.0064 11.5606H9.99151C8.96527 11.5606 8.13333 10.7286 8.13333 9.70237C8.13333 9.5461 8.15262 9.39434 8.18895 9.24933L5.91885 6.97923C5.03505 7.69015 4.34057 8.62704 3.92328 9.70247C4.86803 12.1373 7.23361 13.8619 10.0002 13.8619C10.8326 13.8619 11.6287 13.7058 12.3608 13.4212ZM16.0771 9.70249C15.7843 10.4569 15.3552 11.1432 14.8199 11.7311L15.8813 12.7925C16.6329 11.9813 17.2187 11.0143 17.5849 9.94561C17.6389 9.78803 17.6389 9.61696 17.5849 9.45938C16.5055 6.30925 13.5184 4.04303 10.0002 4.04303C9.13525 4.04303 8.30244 4.17999 7.52218 4.43338L8.75139 5.66259C9.1556 5.58413 9.57311 5.54303 10.0002 5.54303C12.7667 5.54303 15.1323 7.26768 16.0771 9.70249Z"
                          fill="#98A2B3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    for="confirm-password"
                    class="mb-1.5 block text-sm font-medium text-[#A0A0A0]"
                  >
                    Confirm Password<span class="text-error-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="confirmPassword"
                      :type="showPassword ? 'text' : 'password'"
                      id="confirm-password"
                      placeholder="Confirm your password"
                      class="h-11 w-full rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] py-2.5 pl-4 pr-11 text-sm text-white/90 shadow-theme-xs placeholder:text-[#A0A0A0] focus:border-[#00CED1] focus:outline-hidden focus:ring-3 focus:ring-[#00CED1]/10"
                    />
                    <span
                      @click="togglePasswordVisibility"
                      class="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-gray-400"
                    >
                      <svg
                        v-if="!showPassword"
                        class="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.0002 13.8619C7.23361 13.8619 4.86803 12.1372 3.92328 9.70241C4.86804 7.26761 7.23361 5.54297 10.0002 5.54297C12.7667 5.54297 15.1323 7.26762 16.0771 9.70243C15.1323 12.1372 12.7667 13.8619 10.0002 13.8619ZM10.0002 4.04297C6.48191 4.04297 3.49489 6.30917 2.4155 9.4593C2.3615 9.61687 2.3615 9.78794 2.41549 9.94552C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C13.5184 15.3619 16.5055 13.0957 17.5849 9.94555C17.6389 9.78797 17.6389 9.6169 17.5849 9.45932C16.5055 6.30919 13.5184 4.04297 10.0002 4.04297ZM9.99151 7.84413C8.96527 7.84413 8.13333 8.67606 8.13333 9.70231C8.13333 10.7286 8.96527 11.5605 9.99151 11.5605H10.0064C11.0326 11.5605 11.8646 10.7286 11.8646 9.70231C11.8646 8.67606 11.0326 7.84413 10.0064 7.84413H9.99151Z"
                          fill="#98A2B3"
                        />
                      </svg>
                      <svg
                        v-else
                        class="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.63803 3.57709C4.34513 3.2842 3.87026 3.2842 3.57737 3.57709C3.28447 3.86999 3.28447 4.34486 3.57737 4.63775L4.85323 5.91362C3.74609 6.84199 2.89363 8.06395 2.4155 9.45936C2.3615 9.61694 2.3615 9.78801 2.41549 9.94558C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C11.255 15.3619 12.4422 15.0737 13.4994 14.5598L15.3625 16.4229C15.6554 16.7158 16.1302 16.7158 16.4231 16.4229C16.716 16.13 16.716 15.6551 16.4231 15.3622L4.63803 3.57709ZM12.3608 13.4212L10.4475 11.5079C10.3061 11.5423 10.1584 11.5606 10.0064 11.5606H9.99151C8.96527 11.5606 8.13333 10.7286 8.13333 9.70237C8.13333 9.5461 8.15262 9.39434 8.18895 9.24933L5.91885 6.97923C5.03505 7.69015 4.34057 8.62704 3.92328 9.70247C4.86803 12.1373 7.23361 13.8619 10.0002 13.8619C10.8326 13.8619 11.6287 13.7058 12.3608 13.4212ZM16.0771 9.70249C15.7843 10.4569 15.3552 11.1432 14.8199 11.7311L15.8813 12.7925C16.6329 11.9813 17.2187 11.0143 17.5849 9.94561C17.6389 9.78803 17.6389 9.61696 17.5849 9.45938C16.5055 6.30925 13.5184 4.04303 10.0002 4.04303C9.13525 4.04303 8.30244 4.17999 7.52218 4.43338L8.75139 5.66259C9.1556 5.58413 9.57311 5.54303 10.0002 5.54303C12.7667 5.54303 15.1323 7.26768 16.0771 9.70249Z"
                          fill="#98A2B3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <label
                      for="checkboxLabelOne"
                      class="flex items-center text-sm font-normal cursor-pointer select-none text-[#A0A0A0]"
                    >
                      <div class="relative">
                        <input
                          v-model="agreeToTerms"
                          type="checkbox"
                          id="checkboxLabelOne"
                          class="sr-only"
                        />
                        <div
                          :class="
                            agreeToTerms
                              ? 'border-[#00CED1] bg-[#00CED1]'
                              : 'bg-transparent border-[#2D2D2D]'
                          "
                          class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px]"
                        >
                          <span :class="agreeToTerms ? '' : 'opacity-0'">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                                stroke="white"
                                stroke-width="1.94437"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <p class="inline-block font-normal text-gray-400">
                        By creating an account means you agree to the
                        <span class="text-white/90"> Terms and Conditions, </span>
                        and our <span class="text-white"> Privacy Policy </span>
                      </p>
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-[#00CED1] shadow-theme-xs hover:bg-[#00CED1]/80"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
            <div class="mt-5">
              <p
                class="text-sm font-normal text-center text-[#A0A0A0] sm:text-start"
              >
                Already have an account?
                <router-link
                  to="/signin"
                  class="text-[#00CED1] hover:text-[#00CED1]/80"
                  >Sign In</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative items-center hidden w-full lg:w-1/2 bg-[#2D2D2D] lg:flex min-h-screen overflow-auto">
        <div class="flex items-center justify-center z-1 w-full h-full">
          <common-grid-shape />
          <div class="flex flex-col items-center">
            <div class="flex items-center mb-4">
              <router-link to="/" class="block">
                <img width="231" height="48" src="/images/logo/auth-logo.png" alt="Logo" />
              </router-link>
              <p class="text-white text-4xl font-bold whitespace-nowrap">The Band Solution</p>
            </div>
            <p class="text-center text-white/60">
              Your data orchestra, playing information for your organization
            </p>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CommonGridShape from '@/common/components/common/CommonGridShape.vue';
import FullScreenLayout from '@/common/components/layout/FullScreenLayout.vue';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeToTerms = ref(false);
const error = ref('');
const showPassword = ref(false);

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return re.test(password);
};

// Função para enviar eventos de telemetria diretamente na view
const trackEvent = (eventName, eventData = {}) => {
  axios.post('http://localhost:8000/api/telemetry/', {
    event_name: eventName,
    event_data: eventData,
  })
  .catch(error => {
    console.error('Falha ao enviar evento de telemetria:', error);
  });
};

async function handleSubmit() {
    error.value = '';

    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = 'Todos os campos com * são obrigatórios.';
        // Telemetria: Registro com erro de validação
        trackEvent('auth_register_error', { user_email: email.value, error_message: 'Missing fields' });
        return;
    }

    if (!validateEmail(email.value)) {
        error.value = 'Por favor, insira um endereço de e-mail válido.';
        // Telemetria: Registro com erro de validação de e-mail
        trackEvent('auth_register_error', { user_email: email.value, error_message: 'Invalid email format' });
        return;
    }

    if (!validatePassword(password.value)) {
        error.value = 'A senha deve ter pelo menos 8 caracteres e incluir uma letra e um número.';
        // Telemetria: Registro com erro de validação de senha
        trackEvent('auth_register_error', { user_email: email.value, error_message: 'Weak password' });
        return;
    }

    if (password.value !== confirmPassword.value) {
        error.value = 'As senhas não coincidem!';
        // Telemetria: Registro com erro de senhas que não coincidem
        trackEvent('auth_register_error', { user_email: email.value, error_message: 'Passwords do not match' });
        return;
    }

    if (!agreeToTerms.value) {
        error.value = 'Você deve aceitar os termos e condições.';
        // Telemetria: Registro com erro de termos não aceitos
        trackEvent('auth_register_error', { user_email: email.value, error_message: 'Terms not accepted' });
        return;
    }

    try {
        const registerResponse = await axios.post('http://localhost:8000/auth/register/', {
            name: name.value,
            email: email.value,
            password: password.value,
        });

        if (registerResponse.status === 201) {
            // Registro bem-sucedido
            trackEvent('auth_register_success', { user_email: email.value });

            // Tentar login automático
            try {
                const tokenEndpoint = 'http://localhost:8000/o/token/';
                const clientId = 'IrEowoIxsBBr2MoOsprXMglc5FuLOqIu5Tyi5hmH'; 
                const clientSecret = 'nCuicwa1PCgVnJ6D03dk4jX8P6pBYGUhvG4Mw5lkNsi556YvS9bJHCqruzSXwmMFHSqJLeQyD4UxC3pL1gQcbO1b7zAZz0CZhtllbXxAbiyPIaSjeaC3zMsZQrpVLd34';
                
                const params = new URLSearchParams();
                params.append('grant_type', 'password');
                params.append('username', email.value); 
                params.append('password', password.value); 
                params.append('client_id', clientId);
                params.append('client_secret', clientSecret);

                const tokenResponse = await axios.post(tokenEndpoint, params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                if (tokenResponse.status === 200) {
                    trackEvent('auth_login_success', { user_email: email.value });
                    
                    const accessToken = tokenResponse.data.access_token;
                    const refreshToken = tokenResponse.data.refresh_token;

                    
                    localStorage.setItem('access_token', accessToken);
                    localStorage.setItem('refresh_token', refreshToken);

                    router.push('/');
                } else {
                    // Login automático falhou por algum motivo
                    error.value = 'Registro bem-sucedido, mas o login automático falhou. Por favor, faça login.';
                    trackEvent('auth_login_error', { user_email: email.value, error_message: 'Automatic login failed' });
                }

            } catch (loginErr) {
                // Erro na requisição de login automático
                error.value = 'Registro bem-sucedido, mas ocorreu um erro no login automático. Por favor, faça login.';
                const loginErrorMessage = axios.isAxiosError(loginErr) ? loginErr.message : 'Unknown login error';
                trackEvent('auth_login_error', { user_email: email.value, error_message: loginErrorMessage });
            }

        } else {
            // Registro falhou com outro código de status 
            error.value = 'Ocorreu um erro inesperado no registro. Tente novamente.';
            trackEvent('auth_register_error', { user_email: email.value, error_message: 'Unexpected registration status' });
        }
        
    } catch (err) {
        // Erro na requisição de registro inicial
        const apiError = err.response && err.response.data && err.response.data.error;
        if (apiError === 'This email is already registered.') {
            error.value = 'Este e-mail já está cadastrado. Por favor, faça login.';
            trackEvent('auth_register_error', { user_email: email.value, error_message: 'Email already registered' });
        } else {
            error.value = 'Ocorreu um erro no registro. Tente novamente mais tarde.';
            const errorMessage = axios.isAxiosError(err) ? err.message : 'Unknown registration error';
            trackEvent('auth_register_error', { user_email: email.value, error_message: errorMessage });
            console.error(err);
        }
    }
}
</script>