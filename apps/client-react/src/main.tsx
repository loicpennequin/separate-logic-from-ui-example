import '@/styles/global.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { App } from './components/App';
import { apiClient } from './hooks/apiClient';
import { Providers, queryClient } from './components/Providers';
import { queryKeys } from './utils/queryKeys';

async function main() {
  try {
    await apiClient.authService.init();
    queryClient.prefetchQuery(
      queryKeys.SESSION(),
      apiClient.authService.getSession
    );
  } finally {
    ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
      <React.StrictMode>
        <Providers>
          <App />
        </Providers>
      </React.StrictMode>
    );
  }
}

main();
