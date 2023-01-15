import type { Ref } from 'vue';

import type { UseQueryOptions } from '@tanstack/vue-query';
import type { AnyFunction, AsyncReturnType } from '@daria/shared';
import type { VueMutationObserverOptions } from '@tanstack/vue-query/build/lib/useMutation';
import type { SdkError } from '@daria/sdk';

export type ApiClientQueryOptions<T extends AnyFunction> = Omit<
  UseQueryOptions<AsyncReturnType<T>, SdkError, AsyncReturnType<T>, string[]>,
  'queryKey' | 'queryFn' | 'useErrorBoundary'
>;

export type ApiClientMutationOptions<T extends AnyFunction> = Omit<
  VueMutationObserverOptions<
    AsyncReturnType<T>,
    SdkError,
    Parameters<T>[0],
    any
  >,
  'mutationFn' | 'mutationKey'
>;

export type MaybeRef<T> = T | Ref<T>;
