import type { Ref } from 'vue';
import type { inferRouterOutputs } from '@trpc/server';
import type { TrpcRouter } from '@daria/server';
import type { TRPCClientError } from '@trpc/client';
import type { UseQueryOptions } from '@tanstack/vue-query';
import type { AnyFunction, AsyncReturnType } from '@daria/shared';
import type { VueMutationObserverOptions } from '@tanstack/vue-query/build/lib/useMutation';

export type RouterOutput = inferRouterOutputs<TrpcRouter>;
export type ErrorOutput = TRPCClientError<TrpcRouter>;

export type ApiClientQueryOptions<T extends AnyFunction> = Omit<
  UseQueryOptions<AsyncReturnType<T>, ErrorOutput, any, string[]>,
  'queryKey' | 'queryFn' | 'useErrorBoundary'
>;

export type ApiClientMutationOptions<T extends AnyFunction> = Omit<
  VueMutationObserverOptions<
    AsyncReturnType<T>,
    ErrorOutput,
    Parameters<T>[0],
    any
  >,
  'mutationFn' | 'mutationKey'
>;

export type MaybeRef<T> = T | Ref<T>;
