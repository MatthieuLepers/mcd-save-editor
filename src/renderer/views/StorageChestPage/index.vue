<template>
  <section class="StorageChestPage">
    <MCDCharacter :character="props.character" :key="globalStore.state.key">
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
import MCDInventory from '@renderer/components/MCD/Inventory.vue';
import MCDItemDetails from '@renderer/components/MCD/ItemDetails.vue';
import MCDEnchantmentEditor from '@renderer/components/MCD/EnchantmentEditor.vue';
import MCDStorageChest from '@renderer/components/MCD/StorageChest.vue';
import MCDCharacterCorruptionDetection from '@renderer/components/MCD/CharacterCorruptionDetection.vue';

defineOptions({ name: 'StorageChestPage' });

const props = defineProps({
  character: { type: Character, required: true },
});

onMounted(() => {
  globalStore.setters.setItem(props.character.inventory.inventory[0]);
});
</script>
