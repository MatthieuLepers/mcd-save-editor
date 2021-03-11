<template>
  <svg class="TutorialPoly" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1048 533" xml:space="preserve">
    <path :d="pathList.join(' ')" class="TutorialPolyBackDrop" />
  </svg>
</template>

<script>
import AppSettings from '@/js/AppSettings';

export default {
  name: 'TutorialPoly',
  props: {
    polygonList: { type: Array, default: () => [] },
  },
  computed: {
    pathList() {
      const polyToPath = this.polygonList.map((polygon) => {
        const [fstPoint, ...pointList] = polygon;
        const lineList = pointList.map(([x, y]) => `L${x},${y}`).join('');
        return `M${fstPoint[0]},${fstPoint[1]}${lineList}`;
      });
      return [
        `M0,0V${window.innerHeight}H${window.innerWidth}V0z`,
        ...polyToPath,
      ];
    },
  },
  mounted() {
    this.visible = AppSettings.firstStart;
  },
};
</script>

<style lang="scss" src="./Poly.scss">
</style>
