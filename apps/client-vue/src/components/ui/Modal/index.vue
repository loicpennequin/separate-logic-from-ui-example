<script setup lang="ts">
import { TransitionRoot, Dialog } from '@headlessui/vue';
import { useModalProvider } from '@/composables/useModal';
import type { Nullable } from '@daria/shared';

type Props = {
  isOpened: boolean;
  closable?: boolean;
  title?: Nullable<string>;
};
const props = withDefaults(defineProps<Props>(), {
  closable: true,
  title: undefined
});
const emit = defineEmits<{ (e: 'update:isOpened', val: boolean): void }>();
const vModel = useVModel(props, 'isOpened', emit);
const containerEl = ref<HTMLElement>();

useModalProvider({
  isOpened: vModel,
  closable: toRef(props, 'closable'),
  title: toRef(props, 'title')
});

const onClose = () => {
  if (props.closable) vModel.value = false;
};
</script>

<template>
  <TransitionRoot appear :show="vModel" as="template">
    <Dialog as="div" class="modal" relative :static="closable" @close="onClose">
      <div ref="containerEl">
        <div class="backdrop" />
        <slot />
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="postcss">
.modal {
  position: relative;
  z-index: 20;
  color: white;
}

.modal > div {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  display: grid;
  justify-items: center;
}

.modal > div > * {
  grid-column: 1;
  grid-row: 1;
}
.backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
