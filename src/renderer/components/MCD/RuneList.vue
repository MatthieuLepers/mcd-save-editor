<template>
  <div :class="`MCDRuneList MCDRuneList--${props.list.length % 2 === 0 ? 'pair' : 'ipair'}`" v-if="props.list.length">
    <div class="MCDRuneListContainer" v-if="!props.compress">
      <img
        :src="image(`img/runes/${rune}.png`)"
        :alt="`Rune ${rune.toUpperCase()}`"
        :title="`Rune ${rune.toUpperCase()}`"
        v-for="(rune, i) in list.list"
        :key="`rune${i}`"
      />
    </div>
    <div class="MCDRuneListContainer--Compressed" v-else>
      <div class="MCDRuneListItem" v-for="([rune, value], i) in Object.entries(props.list.compressed)" :key="`rune${i}`">
        <img
          v-for="n in value"
          :key="n"
          :src="image(`img/runes/${rune}.png`)"
          :alt="`Rune ${rune.toUpperCase()}`"
          :title="`Rune ${rune.toUpperCase()}`"
          :class="`MCDRuneListItemImage MCDRuneListItemImage--${n}`"
        />
        <span>{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import RuneList from '@renderer/core/classes/RuneList';
import { image } from '@renderer/core/utils';

defineOptions({ name: 'MCDRuneList' });

const props = defineProps({
  list: { type: RuneList, required: true },
  compress: { type: Boolean, default: false },
});
</script>

<style lang="scss" src="./RuneList.scss">
</style>
