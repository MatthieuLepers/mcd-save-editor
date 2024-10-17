<template>
  <div class="MCDGildedLabel" v-show="props.item.isGilded()">
    {{ t('MCD.GildedLabel') }}
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import GameItem from '@renderer/core/entities/item/game';

const { t } = useI18n();

defineOptions({ name: 'MCDGildedLabel' });

const props = defineProps({
  item: { type: GameItem },
});
</script>

<style lang="scss" src="./GildedLabel.scss">
</style>
