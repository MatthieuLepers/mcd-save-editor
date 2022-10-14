<template>
  <div class="MCDGildedLabel" v-show="item.isGilded()">
    {{ $t('MCD.GildedLabel') }}
  </div>
</template>

<script>
import Item from '@/assets/js/classes/Item';

export default {
  name: 'MCDGildedLabel',
  props: {
    item: { type: Item, required: true },
  },
};
</script>

<style lang="scss" src="./GildedLabel.scss">
</style>
