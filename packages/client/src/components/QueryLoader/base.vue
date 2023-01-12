<script setup lang="ts">
import type { useQuery } from '@tanstack/vue-query';

const props = defineProps<{ query: ReturnType<typeof useQuery> }>();
const { isLoading, error, data, isSuccess } = props.query;
const isEmpty = computed(
  () =>
    (isSuccess.value && !data) ||
    (Array.isArray(data.value) && data.value.length === 0)
);
</script>

<template>
  <slot v-if="isLoading" name="loading">Loading...</slot>
  <slot v-else-if="error" name="error" :error="error">
    <div style="color: red">{{ error }}</div>
  </slot>

  <slot v-else-if="isEmpty" name="empty"><div>No result.</div></slot>

  <slot v-else-if="data" :data="data"></slot>
</template>
