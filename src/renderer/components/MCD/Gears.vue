<template>
  <div class="MCDGears" :key="globalStore.state.key">
    <div class="MCDGearsContainers">
      <component
        :is="!!item ? MCDItem : MCDItemEmpty"
        v-for="(item, i) in props.gears"
        :key="i"
        :item="item"
        :itemType="Object.values(Type)[i]"
      />
    </div>

    <img class="MCDGearsSkin" :src="image(`img/CharactersSkins/${globalStore.state.selectedCharacter.data.skin}.png`)" :alt="globalStore.state.selectedCharacter.data.skin" />
    <MCDLevelBadge />

    <div class="MCDArtefacts">
      <component
        :is="!!item ? MCDItem : MCDItemEmpty"
        v-for="(item, i) in props.hotbar"
        :key="i"
        :item="item"
        :itemType="Type.ARTEFACT"
        :hotbarSlot="i + 1"
      />
    </div>
  </div>
</template>

<script setup>
import MCDItem from '@renderer/components/MCD/Item.vue';
import MCDItemEmpty from '@renderer/components/MCD/ItemEmpty.vue';
import MCDLevelBadge from '@renderer/components/MCD/LevelBadge.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { Type } from '@renderer/core/entities/item/enums';
import { image } from '@renderer/core/utils';

defineOptions({ name: 'MCDGears' });

const props = defineProps({
  gears: { type: Array, required: true },
  hotbar: { type: Array, required: true },
});
</script>

<style lang="scss" src="./Gears.scss">
</style>
