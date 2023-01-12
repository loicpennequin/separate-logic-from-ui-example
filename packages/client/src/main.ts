import '@/styles/global.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router/auto';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { authService } from './api/auth';
import { queryKeys } from './utils/queryKeys';

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
  try {
    await authService.init();
    queryClient.prefetchQuery(queryKeys.SESSION(), authService.getSession);
  } finally {
    const app = createApp(App);

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
