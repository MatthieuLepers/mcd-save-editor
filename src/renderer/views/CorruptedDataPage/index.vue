<template>
  <section class="CorruptedDataPage">
    <h1>Data corruption error report</h1>
    <ul class="CorruptedDataPageList">
      <li
        class="CorruptedDataPageListItem"
        v-for="(data, i) in State.corruptionData"
        v-show="i === state.currentErrorIndex"
        :key="i"
      >
        <h2>Error {{ i + 1 }}/{{ State.corruptionData.length }}</h2>
        <textarea :value="JSON.stringify(data.item, null, 2)" readonly></textarea>
        <div class="CorruptedDataPageListItemInfos">
          <p>{{ data.error.message }}</p>
          <p v-if="data.getLine() > 0">found at line {{ data.getLine() }}</p>
        </div>
      </li>
    </ul>
    <MaterialButton
      v-if="state.currentErrorIndex > 0"
      :modifiers="{ secondary: true }"
      @click="state.currentErrorIndex -= 1"
    >
      Previous error
    </MaterialButton>
    <MaterialButton
      v-if="state.currentErrorIndex < State.corruptionData.length - 1"
      :modifiers="{ secondary: true }"
      @click="state.currentErrorIndex += 1"
    >
      Next error
    </MaterialButton>
  </section>
</template>

<script setup>
import { reactive, computed } from 'vue';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';

defineOptions({ name: 'CorruptedDataPage' });

const state = reactive({
  currentErrorIndex: 0,
});

const State = computed(() => ({
  corruptionData: globalStore.state.selectedCharacter.corrupted,
}));
</script>

<style lang="scss" src="./index.scss">
</style>
