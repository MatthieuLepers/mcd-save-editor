<template>
  <div class="MCDItemEnchantmentList">
    <h3 class="MCDItemEnchantmentListTitle">{{ $t('MCD.ItemEnchantmentList.title') }}</h3>
    <div class="MCDItemEnchantmentListContainer">
      <MCDItemEnchantmentChoice
        v-for="(chunk, i) in item.chunkedEnchantments"
        :key="`enchChoice${i}`"
        :choices="chunk"
        :chunkIndex="i"
      />
    </div>
  </div>
</template>

<script>
import Item from '@/assets/js/classes/Item';

import MCDItemEnchantmentChoice from './ItemEnchantmentChoice';

export default {
  name: 'MCDItemEnchantmentList',
  components: { MCDItemEnchantmentChoice },
  props: {
    item: { type: Item, required: true },
  },
};
</script>

<style lang="scss" src="./ItemEnchantmentList.scss">
</style>
