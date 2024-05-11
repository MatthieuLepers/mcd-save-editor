<template>
  <div class="MCDGildedLabel" v-show="props.item.isGilded()">
    {{ t('MCD.GildedLabel') }}
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import Item from '@renderer/core/classes/Item';

const { t } = useI18n();

defineOptions({ name: 'MCDGildedLabel' });

const props = defineProps({
  item: { type: Item, required: true },
});
</script>

<style lang="scss" src="./GildedLabel.scss">
</style>
