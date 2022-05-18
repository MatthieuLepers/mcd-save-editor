<template>
  <div :class="`MCDItemEnchantmentChoice${this.hasChosen() ? ` selected-${this.getChosen()}` : ''}`">
    <div :class="`MCDItemEnchantSlot${isChosen(ench) ? ' selected' : ''}`" v-for="(ench, i) in choices.slice().reverse()" :key="`enchant${i}`" @click="handleSelectEnchant(ench)">
      <button :class="`MCDItemEnchant MCDItemEnchant-${i} ${ench.enchantData.tier}`">
        <img :src="ench.enchantData.image" :alt="ench.enchantIdentifier" />
      </button>
      <div v-if="ench.level > 0" class="MCDItemEnchantSlotTier">
        {{ getTier(ench.level) }}
      </div>
      <div class="MCDItemEnchantSlotInfo" v-if="isChosen(ench)" :title="$t(`MCD.Game.Enchants.${ench.enchantIdentifier}.name`)">
        <span class="EnchName">
          {{ $t(`MCD.Game.Enchants.${ench.enchantIdentifier}.name`) }}
        </span>
        <span class="Tier">
          {{ $t(`MCD.ItemEnchantmentChoice.tiers.${ench.enchantData.tier.toLowerCase()}`) }}
        </span>
      </div>
    </div>
    <div class="MCDItemEnchantSlotInfo" v-if="!hasChosen()">
      <strong class="EmptySlot">
        {{ $t('MCD.ItemEnchantmentChoice.emptySlot') }}
      </strong>
    </div>
  </div>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';
import TutorialStore from '@/assets/js/tutorial/Store';

export default {
  name: 'MCDItemEnchantmentChoice',
  props: {
    choices: { type: Array, default: () => [] },
  },
  methods: {
    hasChosen() {
      return this.choices.filter(({ level }) => level > 0).length === 1;
    },
    getChosen() {
      return this.choices.length - 1 - this.choices.indexOf(this.choices.filter(({ level }) => level > 0).pop());
    },
    isChosen(ench) {
      return ench.level > 0;
    },
    getTier(level) {
      return [...Array(level).keys()].reduce((acc) => `i${acc}`, '');
    },
    handleSelectEnchant(ench) {
      GlobalStore.selectedEnchant = ench;
      if (!this.isChosen(ench)) {
        TutorialStore.setFullfilled('ChooseEnchantmentToEdit', true);
      } else {
        TutorialStore.setFullfilled('ClickUpgradedEnchantment', true);
      }
    },
  },
};
</script>

<style lang="scss" src="./ItemEnchantmentChoice.scss">
</style>
