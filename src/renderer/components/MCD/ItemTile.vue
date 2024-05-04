<template>
  <div
    :class="GenerateModifiers('MCDItemTile', { [props.rarity.toLowerCase()]: true, New: props.isNew })"
    draggable="true"
    @dragstart="emit('dragstart', $event)"
    @dragend="emit('dragend', $event)"
  >
    <div class="MCDItemTileInnerBox">
      <div class="MCDItemTileInnerBoxSegment Top"></div>
      <div class="MCDItemTileInnerBoxSegment Left"></div>
      <div class="MCDItemTileInnerBoxSegment Bottom"></div>
      <div class="MCDItemTileInnerBoxBody"></div>
    </div>
    <img :src="image('img/UI/SeasonalTrial.png')" v-if="props.isEvent" class="MCDItemTileEvent" />
    <img :src="image(props.item)" v-if="props.item" class="MCDItemTileImage" />
  </div>
</template>

<script setup>
import { image } from '@renderer/core/utils';

defineOptions({ name: 'MCDItemTile' });

const emit = defineEmits(['dragstart', 'dragend']);

const props = defineProps({
  rarity: { type: String, default: 'Common' },
  item: { type: String, default: null },
  isNew: { type: Boolean, default: false },
  isEvent: { type: Boolean, default: false },
});
</script>

<style lang="scss" src="./ItemTile.scss">
</style>
