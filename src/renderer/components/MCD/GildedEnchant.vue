<template>
  <div class="MCDGildedEnchant" @click="handleAddNetheriteEnchant">
    <div class="MCDGildedEnchantImage">
      <img :src="ench.enchantData.image" :alt="$t(`MCD.Game.Enchants.${ench.id}.name`)" />
      <span>{{ tier }}</span>
    </div>
    <span class="MCDGildedEnchantName">{{ $t(`MCD.Game.Enchants.${ench.id}.name`) }}</span>
  </div>
</template>

<script>
import GlobalStore from '@/js/stores/GlobalStore';
import TutorialStore from '@/js/tutorial/Store';
import Enchantment from '@/js/classes/Enchantment';

export default {
  name: 'MCDGildedEnchant',
  props: {
    value: { type: Enchantment, required: true },
  },
  data() {
    return {
      GlobalStore,
      ench: this.value,
    };
  },
  methods: {
    handleAddNetheriteEnchant() {
      TutorialStore.setFullfilled('ClickNetheriteEnchantmentSlot', true);
      GlobalStore.selectedEnchant = this.value;
      this.$emit('input', this.value);
    },
  },
  computed: {
    tier() {
      return [...Array(this.ench.level).keys()].reduce(acc => `i${acc}`, '');
    },
  },
  watch: {
    value(val) {
      this.ench = val;
    },
  },
};
</script>

<style lang="scss" src="./GildedEnchant.scss">
</style>
