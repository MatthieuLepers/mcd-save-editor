<template>
  <div class="MCDCharacterCorruptionDetection">
    <Modal
      :name="`corruptedDataModal${character.id}`"
      :title="$t('MCD.CharacterCorruptionDetection.title')"
      :closable="false"
      :autoCloseOnConfirm="false"
      :okOnly="true"
      :okLabel="$t('MCD.CharacterCorruptionDetection.okLabel')"
      @confirm="handleConfirm"
    >
      <div v-if="availableBackup">
        <p v-for="(line, i) in $t('MCD.CharacterCorruptionDetection.contentBackupAvailable')" :key="i">
          {{ line.replace('{date}', availableBackup.formatedDate) }}
        </p>
      </div>
      <div v-else>
        <p v-for="(line, i) in $t('MCD.CharacterCorruptionDetection.contentNoBackupAvailable')" :key="i">
          {{ line }}
        </p>
      </div>
    </Modal>
  </div>
</template>

<script>
import Character from '@/assets/js/classes/Character';
import Modal from '@/components/Modal/index';
import ModalStore from '@/components/Modal/Store';
import NotificationStore from '@/components/Notification/NotificationStore';

export default {
  name: 'MCDCharacterCorruptionDetection',
  components: { Modal },
  props: {
    character: { type: Character, required: true },
  },
  data() {
    return {
      availableBackup: null,
    };
  },
  methods: {
    handleConfirm() {
      this.availableBackup.restore()
        .then((success) => {
          if (!success) throw new Error();
          return this.character.reload();
        })
        .then(() => {
          NotificationStore.success('Restauration terminée !');
        })
        .catch(() => {
          NotificationStore.error('Échec de la restauration.');
        })
        .finally(() => {
          ModalStore.hideModal(`corruptedDataModal${this.character.id}`);
        })
      ;
    },
  },
  created() {
    [this.availableBackup] = this.character.getAvailableBackup();
  },
  mounted() {
    ModalStore.showModal(`corruptedDataModal${this.character.id}`);
  },
};
</script>

<style lang="scss" src="./CharacterCorruptionDetection.scss">
</style>
