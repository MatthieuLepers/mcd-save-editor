<template>
  <section>
    <h1>Data corruption error report</h1>
    <ul>
      <li v-for="(data, i) in corruptionData" :key="i">
        {{ data.error.message }} <br />
        <textarea :value="JSON.stringify(data.item, null, 2)" readonly ></textarea>
        {{ data.getLine() }}
      </li>
    </ul>
  </section>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';

export default {
  name: 'CorruptedDataPage',
  computed: {
    corruptionData() {
      return GlobalStore.selectedCharacter.$corrupted;
    },
  },
};
</script>
