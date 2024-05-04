<template>
  <section>
    <h1>Data corruption error report</h1>
    <ul>
      <li v-for="(data, i) in State.corruptionData" :key="i">
        {{ data.error.message }} <br />
        <textarea :value="JSON.stringify(data.item, null, 2)" readonly ></textarea>
        {{ data.getLine() }}
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';

const State = computed(() => ({
  corruptionData: globalStore.state.selectedCharacter.corrupted,
}));
</script>
