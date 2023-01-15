import { FetchError, ofetch, type FetchOptions } from 'ofetch';

const requestInterceptors = new Set<FetchOptions['onRequest']>();
const requestErrorInterceptors = new Set<FetchOptions['onRequestError']>();
const responseInterceptors = new Set<FetchOptions['onResponse']>();
const responseErrorInterceptors = new Set<FetchOptions['onResponseError']>();

const http = ofetch.create?.({
  retry: false,
  credentials: 'include',
  async onRequest(ctx) {
    for (const cb of requestInterceptors.values()) {
      await cb?.(ctx);
    }
  },
  async onRequestError(ctx) {
    for (const cb of requestErrorInterceptors.values()) {
      await cb?.(ctx);
    }
  },
  async onResponse(ctx) {
    for (const cb of responseInterceptors.values()) {
      await cb?.(ctx);
    }
  },
  async onResponseError(ctx) {
    for (const cb of responseErrorInterceptors.values()) {
      await cb?.(ctx);
    }
  }
});

export const httpService = {
  trpcFetch: (input: RequestInfo | URL, options?: RequestInit) => {
    return http
      .raw(input.toString(), options)
      .catch(e => {
        if (e instanceof FetchError && e.response) return e.response;

        throw e;
      })
      .then(response => ({
        ...response,
        json: () => Promise.resolve(response._data)
      }));
  },
  fetch: http,
  onRequest(listener: FetchOptions['onRequest']) {
    requestInterceptors.add(listener);
  },
  onRequestError(listener: FetchOptions['onRequestError']) {
    requestErrorInterceptors.add(listener);
  },
  onResponse(listener: FetchOptions['onResponse']) {
    responseInterceptors.add(listener);
  },
  onResponseError(listener: FetchOptions['onResponseError']) {
    responseErrorInterceptors.add(listener);
  }
};
