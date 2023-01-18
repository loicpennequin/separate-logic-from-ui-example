<script setup lang="ts">
import { useAcceptTos, useLatestTos } from '@/composables/tos';
import { isDefined } from '@daria/shared';

const props = defineProps<{ isOpened?: boolean; isControlled?: boolean }>();
const emit = defineEmits<{
  (e: 'update:isOpened', value: boolean): void;
}>();

const query = useLatestTos();
const { data: tos } = query;
const { data: session, refetch } = useSession();

const isOpened = computed({
  get() {
    if (props.isControlled) return props.isOpened as boolean;

    if (!session.value) return false;
    if (!tos.value) return false;
    if (!session.value.tosAcceptedAt) return true;

    return (
      tos.value.createdAt.getTime() > session.value.tosAcceptedAt?.getTime()
    );
  },
  set(val) {
    emit('update:isOpened', val);
  }
});

const { mutate: logout } = useLogout();
const { mutate: acceptTos } = useAcceptTos({
  onSuccess() {
    refetch();
  }
});
</script>

<template>
  <UiModal
    v-model:is-opened="isOpened"
    title="Terms and Conditions"
    :closable="props.isControlled"
  >
    <UiModalContent class="tos-modal">
      <p>Please accept our updated terms and conditions</p>
      <QueryLoader :query="query" v-slot="{ data }">
        <div class="content" v-html="data?.content" />
      </QueryLoader>

      <template #footer>
        <div class="footer-inner" v-if="!isControlled">
          <UiButtonCta variant="error" @click="logout(undefined)">
            Refuse
          </UiButtonCta>
          <UiButtonCta @click="acceptTos(undefined)">Accept</UiButtonCta>
        </div>
      </template>
    </UiModalContent>
  </UiModal>
</template>

<style>
.tos-modal {
  max-height: 75vh;
  overflow: auto;
}

.tos-modal .content {
  padding: var(--space-10);
}
.tos-modal .content ol {
  display: flex;
  flex-direction: column;
  line-height: 1.8;
  gap: var(--space-3);
  list-style-type: decimal;
}

.tos-modal .footer-inner {
  padding: var(--space-3);
  display: flex;
  justify-content: space-between;
}
</style>
