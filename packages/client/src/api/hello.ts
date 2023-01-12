import { trpcClient } from '@/trpc';

export const helloService = {
  hello() {
    return trpcClient.hello.query();
  }
};
