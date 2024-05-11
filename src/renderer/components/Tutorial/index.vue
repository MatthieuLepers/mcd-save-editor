<template>
  <div class="Tutorial" v-show="state.active">
    <TutorialPoly :polygonList="tutorialStore.state.stepData.polygonList" />

    <MaterialModal
      name="TutorialModal"
      :class="`Tutorial${tutorialStore.state.currentStep}Modal ${tutorialStore.state.stepData.currentObjective.name || ''} ${tutorialStore.state.stepData.isFinished() ? 'Finished' : ''}`"
      :title="t(`Tutorial.steps.${tutorialStore.state.currentStep}.title`)"
      :modifiers="{ xs: true }"
      @close="actions.handleClose"
    >
      <p>
        {{ t(`Tutorial.steps.${tutorialStore.state.currentStep}.desc`) }}
      </p>
      <ul class="TutorialStepObjectives" v-if="tutorialStore.state.stepData.hasObjectives()">
        <li v-for="(objective, i) in Object.values(tutorialStore.state.stepData.objectiveList)" :key="i">
          <i :class="`icon-${objective.getIcon()}`"></i>
          <span>
            {{ t(`Tutorial.steps.${tutorialStore.state.currentStep}.objectives.${objective.name}.title`) }}
          </span>
          <div class="TutorialStepObjectivesBubble" v-if="objective.reasonId">
            {{ t(`Tutorial.steps.${tutorialStore.state.currentStep}.objectives.${objective.name}.reasons.${objective.reasonId}`) }}
          </div>
        </li>
      </ul>
      <template v-slot:footer="{ close }">
        <MaterialButton
          v-show="tutorialStore.state.stepData.prevStepId"
          :class="GenerateModifiers('m-modal__btn', { refuse: true })"
          :modifiers="{ danger: true }"
          @click="tutorialStore.state.stepData.prev()"
        >
          {{ t('Tutorial.buttons.prev') }}
        </MaterialButton>
        <MaterialButton
          v-show="tutorialStore.state.stepData.nextStepId && tutorialStore.state.stepData.isFinished()"
          :class="GenerateModifiers('m-modal__btn', { accept: true })"
          :modifiers="{ secondary: true }"
          @click="tutorialStore.state.stepData.next()"
        >
          {{ t('Tutorial.buttons.next') }}
        </MaterialButton>
        <MaterialButton
          v-show="!tutorialStore.state.stepData.nextStepId && tutorialStore.state.stepData.isFinished()"
          :class="GenerateModifiers('m-modal__btn', { accept: true })"
          :modifiers="{ secondary: true }"
          @click="actions.handleFinishTutorial(close)"
        >
          {{ t('Tutorial.buttons.finished') }}
        </MaterialButton>
      </template>
    </MaterialModal>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import TutorialPoly from '@renderer/components/Tutorial/Poly.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { tutorialStore } from '@renderer/core/tutorial/Store';
import { modalStore } from '@renderer/components/Materials/Modal/Store';

defineOptions({ name: 'Tutorial' });

const props = defineProps({
  modelValue: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

const { t } = useI18n();

const state = reactive({
  active: props.modelValue,
});

const actions = {
  characterHasEnoughResources() {
    const hasMinimum2ItemsInInventory = globalStore.state.selectedCharacter.inventory.inventory.length >= 2;
    const hasMeleeWeaponEquipped = globalStore.state.selectedCharacter.inventory.gears.filter((item) => item && item.isMelee()).length === 1;
    const hasMinimum18EnchantmentPoints = globalStore.state.selectedCharacter.enchantmentPoints >= 18;
    return hasMinimum2ItemsInInventory
      && hasMeleeWeaponEquipped
      && hasMinimum18EnchantmentPoints
    ;
  },
  handleFinishTutorial(closeModalFn) {
    if (tutorialStore.state.isDisabled) {
      closeModalFn();
      return;
    }
    globalStore.state.selectedCharacter.reload().then(() => {
      closeModalFn();
    });
  },
  handleClose() {
    state.active = false;
    emit('update:modelValue', props.active);
  },
};

watch(() => props.modelValue, (newModelValue) => {
  state.active = newModelValue;
  if (newModelValue) {
    if (!actions.characterHasEnoughResources()) {
      tutorialStore.actions.disableTutorial();
    } else {
      tutorialStore.actions.enableTutorial();
    }
    modalStore.actions.show('TutorialModal');
  }
});
</script>

<style lang="scss" src="./index.scss">
</style>
