<template>
  <div class="MCDItemEnchantmentList">
    <h3 class="MCDItemEnchantmentListTitle">
      {{ t('MCD.ItemEnchantmentList.title') }}
    </h3>
    <div class="MCDItemEnchantmentListContainer">
      <MCDItemEnchantmentChoice
        v-for="(chunk, i) in props.item.chunkedEnchantments"
        :key="`enchChoice${i}`"
        :choices="chunk"
        :chunkIndex="i"
      />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import MCDItemEnchantmentChoice from '@renderer/components/MCD/ItemEnchantmentChoice.vue';

import GameItem from '@renderer/core/entities/item/game';

defineOptions({ name: 'MCDItemEnchantmentList' });

const { t } = useI18n();

const props = defineProps({
  item: { type: GameItem },
});
</script>

<style lang="scss" src="./ItemEnchantmentList.scss">
</style>
