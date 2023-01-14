import type { inferRouterOutputs } from '@trpc/server';
import type { TrpcRouter } from '@daria/server';
import type { TRPCClientError } from '@trpc/client';
import type {
  UseQueryOptions,
  UseMutationOptions
} from '@tanstack/react-query';
import type { AnyFunction, AsyncReturnType } from '@daria/shared';

export type RouterOutput = inferRouterOutputs<TrpcRouter>;
export type ErrorOutput = TRPCClientError<TrpcRouter>;

export type ApiClientQueryOptions<T extends AnyFunction> = Omit<
  UseQueryOptions<AsyncReturnType<T>, ErrorOutput, any, string[]>,
  'queryKey' | 'queryFn' | 'useErrorBoundary'
>;

export type ApiClientMutationOptions<T extends AnyFunction> = Omit<
  UseMutationOptions<AsyncReturnType<T>, ErrorOutput, Parameters<T>[0], any>,
  'mutationFn' | 'mutationKey'
>;
