<template>
  <div class="MCDGildedEnchant" @click="actions.handleAddNetheriteEnchant">
    <div class="MCDGildedEnchantImage">
      <img :src="state.ench.enchantData.image" :alt="t(`MCD.Game.Enchants.${state.ench.id}.name`)" />
      <span>{{ State.tier }}</span>
    </div>
    <span class="MCDGildedEnchantName">{{ t(`MCD.Game.Enchants.${state.ench.id}.name`) }}</span>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { tutorialStore } from '@renderer/core/tutorial/Store';
import Enchantment from '@renderer/core/classes/Enchantment';

defineOptions({ name: 'MCDGildedEnchant' });

const emit = defineEmits(['update:modelValue']);
const { t } = useI18n();

const props = defineProps({
  modelValue: { type: Enchantment, required: true },
});

const state = reactive({
  ench: props.modelValue,
});

const State = computed(() => ({
  tier: [...Array(state.ench.level).keys()].reduce((acc) => `i${acc}`, ''),
}));

const actions = {
  handleAddNetheriteEnchant() {
    tutorialStore.actions.setFullfilled('ClickNetheriteEnchantmentSlot', true);
    globalStore.setters.setEnchant(props.modelValue);
    emit('input', props.modelValue);
  },
};

watch(() => props.modelValue, (newModelValue) => {
  state.ench = newModelValue;
});
</script>

<style lang="scss" src="./GildedEnchant.scss">
</style>
