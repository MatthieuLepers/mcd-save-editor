<template>
  <div class="MCDCharacter" :key="GlobalStore.key">
    <header class="col-xs-12">
      <div class="Slot EmeraldSlot">
        <img src="static/img/UI/Emerald.png" alt="Emerald" />
        <input class="SlotInput" type="number" v-model="character.currencies.Emerald" />
      </div>
      <div class="Slot EmeraldSlot">
        <img src="static/img/UI/EnchantmentPoint.png" alt="EnchantmentPoint" />
        <span>{{ character.enchantmentPoints }}</span>
      </div>
    </header>

    <MCDGears />

    <MCDInventory />

    <MCDEnchantmentEditor />

    <MCDItemDetails :item="GlobalStore.selectedItem" />
  </div>
</template>

<script>
import GlobalStore from '@/js/stores/GlobalStore';
import Character from '@/js/classes/Character';

import MCDGears from './Gears';
import MCDInventory from './Inventory';
import MCDEnchantmentEditor from './EnchantmentEditor';
import MCDItemDetails from './ItemDetails';

export default {
  name: 'MCDCharacter',
  components: { MCDGears, MCDInventory, MCDEnchantmentEditor, MCDItemDetails },
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
