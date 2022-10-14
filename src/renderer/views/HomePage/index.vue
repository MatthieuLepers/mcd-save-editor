<template>
  <section>
    <MCDCharacter :character="character" :key="GlobalStore.key">
      <template v-slot:header>
        <MCDCurrency v-model="character.currencies.Emerald" image="static/img/UI/Emerald.png" imageAlt="Emerald" />
        <MCDCurrency v-model="character.currencies.Gold" image="static/img/UI/Gold.png" imageAlt="Gold" />
        <MCDCurrency :value="character.enchantmentPoints" image="static/img/UI/EnchantmentPoint.png" imageAlt="EnchantmentPoint" readonly />
      </template>
      <template v-slot:Column1>
        <MCDGears
          :gears="GlobalStore.selectedCharacter.inventory.gears"
          :hotbar="GlobalStore.selectedCharacter.inventory.hotbar"
        />
      </template>
      <template v-slot:Column2>
        <MCDInventory />
      </template>
      <template v-slot:Column3>
        <MCDItemDetails v-if="!!GlobalStore.selectedItem" :item="GlobalStore.selectedItem" />
      </template>
      <MCDEnchantmentEditor />
    </MCDCharacter>
    <MCDCharacterCorruptionDetection v-if="character.$corrupted.length" :character="character" />
  </section>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';
import Character from '@/assets/js/classes/Character';

import MCDCharacter from '@/components/MCD/Character';
import MCDCurrency from '@/components/MCD/Currency';
import MCDCharacterCorruptionDetection from '@/components/MCD/CharacterCorruptionDetection';
import MCDGears from '@/components/MCD/Gears';
import MCDInventory from '@/components/MCD/Inventory';
import MCDItemDetails from '@/components/MCD/ItemDetails';
import MCDEnchantmentEditor from '@/components/MCD/EnchantmentEditor';

export default {
  name: 'HomePage',
  components: { MCDCharacter, MCDCurrency, MCDCharacterCorruptionDetection, MCDGears, MCDInventory, MCDEnchantmentEditor, MCDItemDetails },
  props: {
    character: { type: Character, required: true },
  },
  data() {
    return { GlobalStore };
  },
  mounted() {
    [GlobalStore.selectedItem] = this.character.inventory.inventory;
  },
};
</script>
