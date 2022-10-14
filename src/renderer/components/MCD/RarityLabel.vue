<template>
  <div
    :class="`MCDRarityLabel ${item.$data.rarity.toLowerCase()} ${!item.isUnique() ? 'pointer' : ''}`"
    :title="`${!item.isUnique() ? $t('MCD.RarityLabel.clickToToggle') : ''}`"
    @click="handleChangeRarity"
  >
    {{ $t(`MCD.RarityLabel.${item.$data.rarity.toLowerCase()}`) }}
  </div>
</template>

<script>
import Item from '@/assets/js/classes/Item';
import RarityEnum from '@/assets/js/classes/enums/RarityEnum';
import TutorialStore from '@/assets/js/tutorial/Store';

export default {
  name: 'MCDRarityLabel',
  props: {
    item: { type: Item, required: true },
  },
  data() {
    return { RarityEnum };
  },
  methods: {
    handleChangeRarity() {
      if (!this.item.isUnique()) {
        this.item.$data.rarity = this.item.isCommon() ? RarityEnum.RARE : RarityEnum.COMMON;
        TutorialStore.setFullfilled('ChangeRarity', true);
      }
    },
  },
};
</script>

<style lang="scss" src="./RarityLabel.scss">
</style>
