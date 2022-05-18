<template>
  <div :class="`MCDRuneList MCDRuneList--${list.length % 2 === 0 ? 'pair' : 'ipair'}`" v-if="list.length">
    <div class="MCDRuneListContainer" v-if="!compress">
      <img
        :src="`static/img/runes/${rune}.png`"
        :alt="`Rune ${rune.toUpperCase()}`"
        :title="`Rune ${rune.toUpperCase()}`"
        v-for="(rune, i) in list.$list"
        :key="`rune${i}`"
      />
    </div>
    <div class="MCDRuneListContainer--Compressed" v-else>
      <div class="MCDRuneListItem" v-for="([rune, value], i) in Object.entries(list.compressed)" :key="`rune${i}`">
        <img :src="`static/img/runes/${rune}.png`" :alt="`Rune ${rune.toUpperCase()}`" :title="`Rune ${rune.toUpperCase()}`" v-for="n in value" :key="n" :class="`MCDRuneListItemImage MCDRuneListItemImage--${n}`" />
        <span>{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import RuneList from '@/assets/js/classes/RuneList';

export default {
  name: 'MCDRuneList',
  props: {
    list: { type: RuneList, required: true },
    compress: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" src="./RuneList.scss">
</style>
