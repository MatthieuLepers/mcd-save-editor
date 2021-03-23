<template>
  <MCDCharacter :character="character" />
</template>

<script>
import Character from '@/js/classes/Character';
import MCDCharacter from '@/components/MCD/Character';

export default {
  name: 'HomePage',
  components: { MCDCharacter },
  props: {
    character: { type: Character, required: true },
  },
};
</script>
