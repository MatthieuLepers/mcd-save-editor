<template>
  <section>
    <MCDCharacter :character="props.character" :key="globalStore.state.key">
      <template v-slot:header>
        <MCDCurrency
          v-model="props.character.currencies.Emerald"
          image="img/UI/Emerald.png"
          imageAlt="Emerald"
        />
        <MCDCurrency
          v-model="props.character.currencies.Gold"
          image="img/UI/Gold.png"
          imageAlt="Gold"
        />
        <MCDCurrency
          :modelValue="props.character.enchantmentPoints"
          image="img/UI/EnchantmentPoint.png"
          imageAlt="EnchantmentPoint"
          readonly
        />
      </template>
      <template v-slot:Column1>
        <MCDGears
          :gears="globalStore.state.selectedCharacter.inventory.gears"
          :hotbar="globalStore.state.selectedCharacter.inventory.hotbar"
        />
      </template>
      <template v-slot:Column2>
        <MCDInventory />
      </template>
      <template v-slot:Column3>
        <MCDItemDetails v-if="!!globalStore.state.selectedItem" :item="globalStore.state.selectedItem" />
      </template>
      <MCDEnchantmentEditor />
    </MCDCharacter>
    <MCDCharacterCorruptionDetection v-if="props.character.corrupted.length" :character="props.character" />
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import Character from '@renderer/core/classes/Character';

import MCDCharacter from '@renderer/components/MCD/Character.vue';
import MCDCurrency from '@renderer/components/MCD/Currency.vue';
import MCDCharacterCorruptionDetection from '@renderer/components/MCD/CharacterCorruptionDetection.vue';
import MCDGears from '@renderer/components/MCD/Gears.vue';
import MCDInventory from '@renderer/components/MCD/Inventory.vue';
import MCDItemDetails from '@renderer/components/MCD/ItemDetails.vue';
import MCDEnchantmentEditor from '@renderer/components/MCD/EnchantmentEditor.vue';

defineOptions({ name: 'HomePage' });

const props = defineProps({
  character: { type: Character, required: true },
});

onMounted(() => {
  globalStore.setters.setItem(props.character.inventory.inventory[0]);
});
</script>
