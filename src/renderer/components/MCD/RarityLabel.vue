<template>
  <div
    :class="`MCDRarityLabel ${props.item.data.rarity.toLowerCase()} ${!props.item.isUnique() ? 'pointer' : ''}`"
    :title="`${!props.item.isUnique() ? t('MCD.RarityLabel.clickToToggle') : ''}`"
    @click="actions.handleChangeRarity"
  >
    {{ t(`MCD.RarityLabel.${props.item.data.rarity.toLowerCase()}`) }}
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import Item from '@renderer/core/entities/item/game';
import { Rarity } from '@renderer/core/entities/item/enums';
import { tutorialStore } from '@renderer/core/tutorial/Store';

defineOptions({ name: 'MCDRarityLabel' });

const { t } = useI18n();

const props = defineProps({
  item: { type: Item, required: true },
});

const actions = {
  handleChangeRarity() {
    if (!props.item.isUnique()) {
      props.item.data.rarity = props.item.isCommon() ? Rarity.RARE : Rarity.COMMON;
      tutorialStore.actions.setFullfilled('ChangeRarity', true);
    }
  },
};
</script>

<style lang="scss" src="./RarityLabel.scss">
</style>
