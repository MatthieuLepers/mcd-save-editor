<template>
  <section class="StorageChestPage">
    <MCDCharacter :character="character" :key="GlobalStore.key">
      <template v-slot:Column1>
        <MCDStorageChest />
      </template>
      <template v-slot:Column2>
        <MCDInventory
          :disableEquipControl="true"
          :noDragEvent="false"
        />
      </template>
      <template v-slot:Column3>
        <MCDItemDetails v-if="!!GlobalStore.selectedItem" :item="GlobalStore.selectedItem" />
      </template>
      <MCDEnchantmentEditor />
    </MCDCharacter>
  </section>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';
import Character from '@/assets/js/classes/Character';

import MCDCharacter from '@/components/MCD/Character';
import MCDInventory from '@/components/MCD/Inventory';
import MCDItemDetails from '@/components/MCD/ItemDetails';
import MCDEnchantmentEditor from '@/components/MCD/EnchantmentEditor';
import MCDStorageChest from '@/components/MCD/StorageChest';

export default {
  name: 'StorageChestPage',
  components: { MCDCharacter, MCDInventory, MCDItemDetails, MCDEnchantmentEditor, MCDStorageChest },
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
