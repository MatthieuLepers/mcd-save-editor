<template>
  <div class="MCDCharacter">
    <header class="MCDCharacterHeader">
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

<script setup>
defineOptions({ name: 'MCDCharacter' });
</script>

<style lang="scss" src="./Character.scss">
</style>
