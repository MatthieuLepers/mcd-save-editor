<template>
  <div :class="`MCDItemEnchantmentChoice${actions.hasChosen() ? ` selected-${actions.getChosen()}` : ''}`">
    <div
      :class="`MCDItemEnchantSlot${actions.isChosen(ench) ? ' selected' : ''}`"
      v-for="(ench, i) in props.choices.slice().reverse()"
      :key="`enchant${i}`"
    >
      <button
        :class="`MCDItemEnchant MCDItemEnchant-${i} ${ench.enchantData.tier}`"
        @click="actions.handleSelectEnchant(ench)"
      >
        <img :src="image(ench.enchantData.image)" :alt="ench.enchantIdentifier" />
      </button>
      <div v-if="ench.level > 0" class="MCDItemEnchantSlotTier">
        {{ actions.getTier(ench.level) }}
      </div>
      <div class="MCDItemEnchantSlotInfo" v-if="actions.isChosen(ench)" :title="t(`MCD.Game.Enchants.${ench.enchantIdentifier}.name`)">
        <span class="EnchName">
          {{ t(`MCD.Game.Enchants.${ench.enchantIdentifier}.name`) }}
        </span>
        <span class="Tier">
          {{ t(`MCD.ItemEnchantmentChoice.tiers.${ench.enchantData.tier.toLowerCase()}`) }}
        </span>
      </div>
    </div>
    <div class="MCDItemEnchantSlotInfo" v-if="!actions.hasChosen()">
      <strong class="EmptySlot">
        {{ t('MCD.ItemEnchantmentChoice.emptySlot') }}
      </strong>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { tutorialStore } from '@renderer/core/tutorial/Store';
import { image } from '@renderer/core/utils';

defineOptions({ name: 'MCDItemEnchantmentChoice' });

const { t } = useI18n();

const props = defineProps({
  choices: { type: Array, default: () => [] },
  chunkIndex: { type: Number, required: true },
});

const actions = {
  hasChosen() {
    return props.choices.filter(({ level }) => level > 0).length === 1;
  },
  getChosen() {
    return props.choices.length - 1 - props.choices.indexOf(props.choices.filter(({ level }) => level > 0).pop());
  },
  isChosen(ench) {
    return ench.level > 0;
  },
  getTier(level) {
    return [...Array(level).keys()].reduce((acc) => `i${acc}`, '');
  },
  handleSelectEnchant(ench) {
    globalStore.setters.setEnchant(ench);
    globalStore.state.selectedEnchantChunkIndex = props.chunkIndex;
    if (!actions.isChosen(ench)) {
      tutorialStore.actions.setFullfilled('ChooseEnchantmentToEdit', true);
    } else {
      tutorialStore.actions.setFullfilled('ClickUpgradedEnchantment', true);
    }
  },
};
</script>

<style lang="scss" src="./ItemEnchantmentChoice.scss">
</style>
