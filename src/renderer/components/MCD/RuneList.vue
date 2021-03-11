<template>
  <div :class="`MCDRuneList MCDRuneList--${list.$runeList.length % 2 === 0 ? 'pair' : 'ipair'}`" v-if="list.$runeList.length">
    <div class="MCDRuneListContainer" v-if="!compress">
      <img
        :src="`static/img/runes/${rune}.png`"
        :alt="`Rune ${rune.toUpperCase()}`"
        :title="`Rune ${rune.toUpperCase()}`"
        v-for="(rune, i) in list.$runeList"
        :key="`rune${i}`"
      />
    </div>
    <div class="MCDRuneListContainer--Compressed" v-else>
      <div class="MCDRuneListItem" v-for="([rune, value], i) in Object.entries(list.sequence)" :key="`rune${i}`">
        <img :src="`static/img/runes/${rune}.png`" :alt="`Rune ${rune.toUpperCase()}`" :title="`Rune ${rune.toUpperCase()}`" v-for="n in value" :key="n" :class="`MCDRuneListItemImage MCDRuneListItemImage--${n}`" />
        <span>{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import RuneSequence from '@/js/classes/RuneSequence';

export default {
  name: 'MCDRuneList',
  props: {
    list: { type: RuneSequence, required: true },
    compress: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" src="./RuneList.scss">
</style>
