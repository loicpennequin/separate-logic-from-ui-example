import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { apiClientContext, apiClient } from '@/hooks/apiClient';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

type Props = { children: ReactNode };
export const Providers = ({ children }: Props) => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <apiClientContext.Provider value={apiClient}>
        {children}
      </apiClientContext.Provider>
    </QueryClientProvider>
  </Router>
);
