<script setup lang="ts">
const props = defineProps<{ error?: string }>();
</script>
<template>
  <div style="color: red">
    {{ props.error }}
  </div>
</template>
