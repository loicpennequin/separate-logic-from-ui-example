<script lang="ts">
// This components helps to have type inference from the query passed as props inside the slots ot the queryLoader base component
import type { ComponentPublicInstance, VNode } from 'vue';
import QueryLoaderBase from './base.vue';
import type { useQuery } from '@tanstack/vue-query';

interface Props<T extends ReturnType<typeof useQuery>> {
  query: T;
}
type AssertDefined<T> = Exclude<T, undefined>;
type QueryLoader = new <T extends ReturnType<typeof useQuery>>(
  props: Props<T>
) => ComponentPublicInstance & {
  $props: Props<T>;
  $slots: {
    default: ({ data }: { data: AssertDefined<T['data']['value']> }) => VNode[];
    loading: (...args: any[]) => VNode[];
    error: (...args: any[]) => VNode[];
    empty: (...args: any[]) => VNode[];
  };
};

export default QueryLoaderBase as QueryLoader;
</script>
