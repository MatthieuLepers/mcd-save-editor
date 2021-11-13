<template>
  <div class="Tutorial" v-show="active">
    <TutorialPoly :polygonList="TutorialStore.stepData.polygonList" />

    <Modal
      name="TutorialModal"
      :class="`Tutorial${TutorialStore.currentStep}Modal ${TutorialStore.stepData.currentObjective.name || ''} ${TutorialStore.stepData.isFinished() ? 'Finished' : ''}`"
      :title="$t(`Tutorial.steps.${TutorialStore.currentStep}.title`)"
      size="xs"
      @close="handleClose"
    >
      <p>
        {{ $t(`Tutorial.steps.${TutorialStore.currentStep}.desc`) }}
      </p>
      <ul class="TutorialStepObjectives" v-if="TutorialStore.stepData.hasObjectives()">
        <li v-for="(objective, i) in Object.values(TutorialStore.stepData.objectiveList)" :key="i">
          <i :class="`icon-${objective.getIcon()}`"></i>
          <span>
            {{ $t(`Tutorial.steps.${TutorialStore.currentStep}.objectives.${objective.name}.title`) }}
          </span>
          <div class="TutorialStepObjectivesBubble" v-if="objective.reasonId">
            {{ $t(`Tutorial.steps.${TutorialStore.currentStep}.objectives.${objective.name}.reasons.${objective.reasonId}`) }}
          </div>
        </li>
      </ul>
      <template v-slot:footer="{ close }">
        <button class="btn" v-if="TutorialStore.stepData.prevStepId && TutorialStore.stepData.isFinished()" @click="TutorialStore.stepData.prev()">
          {{ $t('Tutorial.buttons.prev') }}
        </button>
        <button class="btn" v-if="TutorialStore.stepData.nextStepId && TutorialStore.stepData.isFinished()" @click="TutorialStore.stepData.next()">
          {{ $t('Tutorial.buttons.next') }}
        </button>
        <button class="btn" v-if="!TutorialStore.stepData.nextStepId && TutorialStore.stepData.isFinished()" @click="handleFinishTutorial(close)">
          {{ $t('Tutorial.buttons.finished') }}
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import AppSettings from '@/js/AppSettings';
import GlobalStore from '@/js/stores/GlobalStore';
import TutorialStore from '@/js/tutorial/Store';

import Modal from '@/components/Modal/index';
import ModalStore from '@/components/Modal/Store';

import TutorialPoly from './Poly';

export default {
  name: 'Tutorial',
  components: { TutorialPoly, Modal },
  props: {
    value: { type: Boolean, default: false },
  },
  data() {
    return {
      active: this.value,
      TutorialStore,
    };
  },
  methods: {
    characterHasEnoughResources() {
      const hasMinimum2ItemsInInventory = GlobalStore.selectedCharacter.inventory.inventory.length >= 2;
      const hasMeleeWeaponEquipped = GlobalStore.selectedCharacter.inventory.gears.filter((item) => item && item.isMelee()).length === 1;
      const hasMinimum18EnchantmentPoints = GlobalStore.selectedCharacter.enchantmentPoints >= 18;
      return hasMinimum2ItemsInInventory
        && hasMeleeWeaponEquipped
        && hasMinimum18EnchantmentPoints
      ;
    },
    handleFinishTutorial(closeModalFn) {
      if (TutorialStore.isDisabled) {
        closeModalFn();
        return;
      }
      GlobalStore.selectedCharacter.reload().then(() => {
        closeModalFn();
        AppSettings.firstStart = false;
      });
    },
    handleClose() {
      this.active = false;
      this.$emit('input', this.active);
    },
  },
  watch: {
    value(value) {
      this.active = value;
      if (value) {
        if (!this.characterHasEnoughResources()) {
          TutorialStore.disableTutorial();
        } else {
          TutorialStore.enableTutorial();
        }
        ModalStore.showModal('TutorialModal');
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
