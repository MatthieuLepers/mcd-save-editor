<template>
  <svg
    class="TutorialPoly"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 1048 554"
    xml:space="preserve"
  >
    <path :d="State.pathList.join(' ')" class="TutorialPolyBackDrop" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'TutorialPoly' });

const props = defineProps({
  polygonList: { type: Array, default: () => [] },
});

const State = computed(() => {
  const polyToPath = props.polygonList.map((polygon) => {
    const [fstPoint, ...pointList] = polygon;
    const lineList = pointList.map(([x, y]) => `L${x},${y}`).join('');
    return `M${fstPoint[0]},${fstPoint[1]}${lineList}`;
  });

  return {
    pathList: [
      `M0,0V${window.innerHeight}H${window.innerWidth}V0z`,
      ...polyToPath,
    ],
  };
});
</script>

<style lang="scss" src="./Poly.scss">
</style>
