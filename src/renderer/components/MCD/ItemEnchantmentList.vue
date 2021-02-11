<template>
  <div class="MCDItemEnchantmentList">
    <h3 class="MCDItemEnchantmentListTitle">{{ $t('MCD.ItemEnchantmentList.title') }}</h3>
    <div class="MCDItemEnchantmentListContainer">
      <MCDItemEnchantmentChoice v-for="(chunk, i) in enchantmentsChunk" :key="`enchChoice${i}`" :choices="chunk" />
    </div>
  </div>
</template>

<script>
import Item from '@/js/classes/Item';
import Enchantment from '@/js/classes/Enchantment';

import MCDItemEnchantmentChoice from './ItemEnchantmentChoice';

export default {
  name: 'MCDItemEnchantmentList',
  components: { MCDItemEnchantmentChoice },
  props: {
    item: { type: Item, required: true },
  },
  data() {
    return {
      enchantmentsChunk: this.chunked(this.normalize(this.item.enchantments)),
    };
  },
  methods: {
    normalize(value) {
      if (value.length === 9) {
        return value;
      }
      return [...value, ...[...Array((9 - value.length) + 1).keys()]
        .map(() => Enchantment.UNSET.$data)
        .reduce((acc, val) => [...acc, val]),
      ];
    },
    chunked(value) {
      return value.reduce((acc, val, i) => {
        const ch = Math.floor(i / 3);
        acc[ch] = [].concat((acc[ch] || []), val);
        return acc;
      }, []);
    },
  },
  watch: {
    item: {
      deep: true,
      handler(item) {
        this.enchantmentsChunk = this.chunked(this.normalize(item.enchantments));
      },
    },
  },
};
</script>

<style lang="scss" src="./ItemEnchantmentList.scss">
</style>
