<script setup lang="ts">
import { DialogPanel } from '@headlessui/vue';
import { useModal } from '@/composables/useModal';
import { useSlotProps } from '@/composables/useSlotProps';
import Surface from '../Surface.vue';
import ModalHeader from './Header.vue';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

const props = withDefaults(defineProps<Props>(), { size: 'md' });
const maxWidth = computed(() => `var(--breakpoints-${props.size})`);

const modal = useModal();
const { title } = modal;
const slotProps = useSlotProps(modal);
const slots = useSlots();
</script>

<template>
  <DialogPanel as="div" class="modal-content">
    <UiSurface class="inner">
      <slot name="header" v-bind="slotProps">
        <ModalHeader v-if="title" />
      </slot>

      <div class="body">
        <slot v-bind="slotProps" />
      </div>

      <footer v-if="slots.footer">
        <slot name="footer" v-bind="slotProps" />
      </footer>
    </UiSurface>
  </DialogPanel>
</template>

<style scoped lang="postcss">
.modal-content {
  width: 100%;
  max-width: v-bind(maxWidth);
  transition: all var(--duration-2);
  align-self: flex-start;
  overflow-y: auto;
  margin-block-start: var(--space-20);
  position: relative;
  z-index: 1;
}

.inner {
  max-height: 75%;
  display: flex;
  flex-direction: column;
}

.body {
  flex: 1;
}

footer {
  background-color: inherit;
  position: sticky;
  bottom: 0;
}
</style>
