import type { InjectionKey } from 'vue';
import type { ApiClient } from '@daria/shared/dist/client';

export const API_INJECTION_KEY = Symbol('api') as InjectionKey<ApiClient>;

export const useApi = () => useSafeInject(API_INJECTION_KEY);
