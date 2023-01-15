import type {
  UseQueryOptions,
  UseMutationOptions
} from '@tanstack/react-query';
import type { AnyFunction, AsyncReturnType } from '@daria/shared';
import type { SdkError } from '@daria/shared';

export type ApiClientQueryOptions<T extends AnyFunction> = Omit<
  UseQueryOptions<AsyncReturnType<T>, SdkError, AsyncReturnType<T>, string[]>,
  'queryKey' | 'queryFn' | 'useErrorBoundary'
>;

export type ApiClientMutationOptions<T extends AnyFunction> = Omit<
  UseMutationOptions<AsyncReturnType<T>, SdkError, Parameters<T>[0], any>,
  'mutationFn' | 'mutationKey'
>;
