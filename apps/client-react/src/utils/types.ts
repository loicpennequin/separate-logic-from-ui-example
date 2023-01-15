import type {
  UseQueryOptions,
  UseMutationOptions
} from '@tanstack/react-query';
import type { AnyFunction, AsyncReturnType } from '@daria/shared';
import type { ApiClientError } from '@daria/shared';

export type ApiClientQueryOptions<T extends AnyFunction> = Omit<
  UseQueryOptions<
    AsyncReturnType<T>,
    ApiClientError,
    AsyncReturnType<T>,
    string[]
  >,
  'queryKey' | 'queryFn' | 'useErrorBoundary'
>;

export type ApiClientMutationOptions<T extends AnyFunction> = Omit<
  UseMutationOptions<AsyncReturnType<T>, ApiClientError, Parameters<T>[0], any>,
  'mutationFn' | 'mutationKey'
>;
