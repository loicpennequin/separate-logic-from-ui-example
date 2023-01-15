import { createApiClient } from '@daria/sdk';
import { createContext } from 'react';

export const apiClient = createApiClient(import.meta.env.VITE_API_URL);

export const apiClientContext = createContext(apiClient);

export const useApiClient = () => useContext(apiClientContext);
