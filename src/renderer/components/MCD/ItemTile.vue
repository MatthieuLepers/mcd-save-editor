<template>
  <div
    :class="`MCDItemTile ${rarity.toLowerCase()} ${isNew ? 'new' : ''}`"
    draggable="true"
    @dragstart="$emit('dragstart', $event)"
    @dragend="$emit('dragend', $event)"
  >
    <div class="MCDItemTileInnerBox">
      <div class="MCDItemTileInnerBoxSegment Top"></div>
      <div class="MCDItemTileInnerBoxSegment Left"></div>
      <div class="MCDItemTileInnerBoxSegment Bottom"></div>
      <div class="MCDItemTileInnerBoxBody"></div>
    </div>
    <img src="static/img/UI/SeasonalTrial.png" v-if="isEvent" class="MCDItemTileEvent" />
    <img :src="item" v-if="item" class="MCDItemTileImage" />
  </div>
</template>

<script>
export default {
  name: 'MCDItemTile',
  props: {
    rarity: { type: String, default: 'Common' },
    item: { type: String, default: null },
    isNew: { type: Boolean, default: false },
    isEvent: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" src="./ItemTile.scss">
</style>
