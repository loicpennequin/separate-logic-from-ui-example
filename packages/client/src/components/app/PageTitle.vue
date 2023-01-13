<script setup lang="ts"></script>

<template>
  <h2 class="page-title"><slot /></h2>
</template>

<style scoped>
.page-title {
  text-align: center;
  font-size: var(--text-size-6);
  font-weight: 700;
  margin-block-end: var(--space-8);
}
</style>
