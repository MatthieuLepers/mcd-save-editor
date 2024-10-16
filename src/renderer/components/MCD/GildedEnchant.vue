<template>
  <div class="MCDGildedEnchant" @click="actions.handleAddNetheriteEnchant">
    <div class="MCDGildedEnchantImage">
      <img :src="state.ench.enchantData.image" :alt="state.ench.enchantData.getI18n('name')" />
      <span>{{ State.tier }}</span>
    </div>
    <span class="MCDGildedEnchantName">
      {{ state.ench.enchantData.getI18n('name') }}
    </span>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { tutorialStore } from '@renderer/core/tutorial/Store';
import GameEnchant from '@renderer/core/entities/enchant/game';

defineOptions({ name: 'MCDGildedEnchant' });

const modelValue = defineModel({ type: GameEnchant });

const state = reactive({
  ench: modelValue.value,
});

const State = computed(() => ({
  tier: [...Array(state.ench.level).keys()].reduce((acc) => `i${acc}`, ''),
}));

const actions = {
  handleAddNetheriteEnchant() {
    globalStore.setters.setEnchant(modelValue.value);
    tutorialStore.actions.setFullfilled('ClickNetheriteEnchantmentSlot', true);
  },
};

watch(() => modelValue.value, (newModelValue) => {
  state.ench = newModelValue;
});
</script>

<style lang="scss" src="./GildedEnchant.scss">
</style>
