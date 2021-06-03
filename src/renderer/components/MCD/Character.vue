<template>
  <div class="MCDCharacter" :key="GlobalStore.key">
    <div class="MCDCharacterContainer">
      <header class="col-xs-12">
        <div class="Slot EmeraldSlot">
          <img src="static/img/UI/Emerald.png" alt="Emerald" />
          <input class="SlotInput" type="number" v-model="character.currencies.Emerald" />
        </div>
        <div class="Slot EmeraldSlot">
          <img src="static/img/UI/Gold.png" alt="Gold" />
          <input class="SlotInput" type="number" v-model="character.currencies.Gold" />
        </div>
        <div class="Slot EmeraldSlot">
          <img src="static/img/UI/EnchantmentPoint.png" alt="EnchantmentPoint" />
          <span>{{ character.enchantmentPoints }}</span>
        </div>
      </header>

      <MCDGears />

      <MCDInventory />

      <MCDEnchantmentEditor />

      <MCDItemDetails v-if="!!GlobalStore.selectedItem" :item="GlobalStore.selectedItem" />
    </div>
    <MCDCharacterCorruptionDetection v-if="character.$corrupted.length" :character="character" />
  </div>
</template>

<script>
import GlobalStore from '@/js/stores/GlobalStore';
import Character from '@/js/classes/Character';

import MCDGears from './Gears';
import MCDCharacterCorruptionDetection from './CharacterCorruptionDetection';
import MCDInventory from './Inventory';
import MCDEnchantmentEditor from './EnchantmentEditor';
import MCDItemDetails from './ItemDetails';

export default {
  name: 'MCDCharacter',
  components: { MCDGears, MCDInventory, MCDEnchantmentEditor, MCDItemDetails, MCDCharacterCorruptionDetection },
  props: {
    character: { type: Character, required: true },
  },
  data() {
    return { GlobalStore };
  },
};
</script>

<style lang="scss" src="./Character.scss">
</style>
