<template>
  <div class="MCDCharacterCorruptionDetection">
    <Modal
      :name="`corruptedDataModal${props.character.id}`"
      :title="t('MCD.CharacterCorruptionDetection.title')"
      :showClose="false"
      @accept="actions.handleConfirm"
    >
      <div v-if="state.availableBackup">
        <p v-for="(line, i) in tm('MCD.CharacterCorruptionDetection.contentBackupAvailable')" :key="i">
          {{ line.replace('{date}', state.availableBackup.formatedDate) }}
        </p>
      </div>
      <div v-else>
        <p v-for="(line, i) in tm('MCD.CharacterCorruptionDetection.contentNoBackupAvailable')" :key="i">
          {{ line }}
        </p>
      </div>
      <template v-slot:footer="{ accept }">
        <router-link custom :to="{ name: 'CorruptedData' }" v-slot="{ navigate }">
          <MaterialButton
            :class="GenerateModifiers('m-modal__btn', { refuse: true })"
            :modifiers="{ danger: true }"
            @click="navigate"
          >
            {{ t('MCD.CharacterCorruptionDetection.showReport') }}
          </MaterialButton>
        </router-link>
        <MaterialButton
          :class="GenerateModifiers('m-modal__btn', { accept: true })"
          :modifiers="{ secondary: true }"
          @click="accept"
        >
          {{ t('MCD.CharacterCorruptionDetection.okLabel') }}
        </MaterialButton>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { reactive, onBeforeMount, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import Modal from '@renderer/components/Materials/Modal/index.vue';

import Character from '@renderer/core/classes/Character';
import { modalStore } from '@renderer/components/Materials/Modal/Store';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';

defineOptions({ name: 'MCDCharacterCorruptionDetection' });

const { t, tm } = useI18n();

const props = defineProps({
  character: { type: Character, required: true },
});

const state = reactive({
  availableBackup: null,
});

const actions = {
  handleConfirm() {
    state.availableBackup.restore()
      .then((success) => {
        if (!success) throw new Error();
        return props.character.reload();
      })
      .then(() => {
        notificationStore.actions.success(t('MCD.CharacterCorruptionDetection.restoreSuccess'));
      })
      .catch(() => {
        notificationStore.actions.error(t('MCD.CharacterCorruptionDetection.restoreError'));
      })
      .finally(() => {
        modalStore.actions.hide(`corruptedDataModal${props.character.id}`);
      })
    ;
  },
};

onBeforeMount(() => {
  [state.availableBackup] = props.character.getAvailableBackup();
});

onMounted(() => {
  modalStore.actions.show(`corruptedDataModal${props.character.id}`);
});
</script>

<style lang="scss" src="./CharacterCorruptionDetection.scss">
</style>
