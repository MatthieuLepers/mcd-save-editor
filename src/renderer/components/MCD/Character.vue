<template>
  <div class="MCDCharacter">
    <header class="MCDCharacterHeader col-xs-12">
      <slot name="header" />
    </header>

    <div :class="GenerateModifiers('MCDCharacterColumn', { Fst: true })">
      <slot name="Column1" />
    </div>

    <div :class="GenerateModifiers('MCDCharacterColumn', { Snd: true })">
      <slot name="Column2" />
    </div>

    <div :class="GenerateModifiers('MCDCharacterColumn', { Trd: true })">
      <slot name="Column3" />
    </div>

    <slot />
  </div>
</template>

<script>
import Character from '@/js/classes/Character';

export default {
  name: 'MCDCharacter',
  props: {
    character: { type: Character, required: true },
  },
};
</script>

<style lang="scss" src="./Character.scss">
</style>
