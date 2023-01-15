import '@/styles/global.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router/auto';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { queryKeys } from './utils/queryKeys';
import { createApiClient } from '@daria/sdk';
import { API_INJECTION_KEY } from './composables/useApi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

async function main() {
  const apiClient = createApiClient(import.meta.env.VITE_API_URL);

  try {
    await apiClient.authService.init();
    queryClient.prefetchQuery(
      queryKeys.SESSION(),
      apiClient.authService.getSession
    );
  } finally {
    const app = createApp(App);
    app.provide(API_INJECTION_KEY, apiClient);
    app.use(
      createRouter({
        history: createWebHistory()
      })
    );
    app.use(VueQueryPlugin, { queryClient });
    app.mount('#app');
  }
}

main();
