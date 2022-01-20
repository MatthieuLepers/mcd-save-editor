<template>
  <div class="MCDGears" :key="GlobalStore.key">
    <div class="MCDGearsContainers col-xs-12">
      <component
        :is="!!item ? 'MCDItem' : 'MCDItemEmpty'"
        v-for="(item, i) in gears"
        :key="i"
        :item="item"
        :itemType="ItemTypeEnum.list[i]"
      />
    </div>

    <img class="MCDGearsSkin" :src="`static/img/CharactersSkins/${GlobalStore.selectedCharacter.$data.skin}.png`" :alt="GlobalStore.selectedCharacter.$data.skin" />
    <MCDLevelBadge />

    <div class="MCDArtefacts col-xs-12">
      <component
        :is="!!item ? 'MCDItem' : 'MCDItemEmpty'"
        v-for="(item, i) in hotbar"
        :key="i"
        :item="item"
        itemType="Artefact"
        :hotbarSlot="i + 1"
      />
    </div>
  </div>
</template>

<script>
import GlobalStore from '@/js/stores/GlobalStore';
import ItemTypeEnum from '@/js/classes/enums/ItemTypeEnum';

import MCDItem from './Item';
import MCDItemEmpty from './ItemEmpty';
import MCDLevelBadge from './LevelBadge';

export default {
  name: 'MCDGears',
  components: { MCDItem, MCDItemEmpty, MCDLevelBadge },
  props: {
    gears: { type: Array, required: true },
    hotbar: { type: Array, required: true },
  },
  data() {
    return {
      GlobalStore,
      ItemTypeEnum,
    };
  },
};
</script>

<style lang="scss" src="./Gears.scss">
</style>
