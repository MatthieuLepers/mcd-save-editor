<template>
  <div class="MCDLevelBadge" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
    <svg version="1.1" width="70px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 121.5 140.1" xml:space="preserve">
      <path fill="none" stroke="#373434" stroke-width="8" stroke-miterlimit="10" d="M9.6,40.6l51.1-29.5l51.1,29.5l0,59l-51.1,29.5L9.6,99.6L9.6,40.6z"/>
      <path
        fill="none"
        stroke="#933FB9"
        stroke-width="8"
        stroke-miterlimit="10"
        :stroke-dasharray="`${354 * percent} 354`"
        stroke-dashoffset="0"
        style="transform:rotate(60deg);transform-origin:50% 50%;"
        d="M9.6,40.6l51.1-29.5l51.1,29.5l0,59l-51.1,29.5L9.6,99.6L9.6,40.6z"
      />
      <path fill="#0F1013" d="M61,0.1L0.3,34.9l-0.3,70l60.5,35.2l60.8-34.8l0.3-70L61,0.1z M115.3,101.9l-54.8,31.3L6,101.4l0.2-63.1L61,7l54.5,31.8L115.3,101.9z M12.8,42l48.4-27.5l48,28.1l-0.4,55.6l-0.1,0.1l-48.3,27.4l-0.1-0.1L12.4,97.6L12.8,42z"/>
      <path fill="#131418" d="M46,8.6L60.8,0l14.8,8.6l0,17.1l-14.8,8.6L46,25.7V8.6z"/>
      <path fill="#D372F4" d="M61.7,29.8c-2.8,0-5.6-1-7.5-2.7c-2.2-1.9-3.5-4.7-3.6-7.9c-0.1-3.4,1.2-6.8,3.4-9c3.1-3,8-4,12.6-2.5l-0.5,1.4c-4-1.4-8.4-0.5-11.1,2.1c-2,1.9-3.1,4.9-3,7.9c0.1,2.8,1.2,5.2,3.1,6.8c2,1.7,4.9,2.6,7.6,2.3c2.2-0.2,4-1.2,5.2-2.7c2-2.6,2.3-7.4-0.6-10.2c-2-2-6.2-3.5-8.9-1.1c-1.3,1.1-2,2.9-1.9,4.9c0.1,1.7,0.7,3.1,1.8,3.9c1.6,1.2,4.7,1.3,6-0.5c0.9-1.2,1.1-3.4,0-4.3c-0.5-0.4-1.3-0.6-1.9-0.6c-0.2,0-0.5,0.1-0.7,0.3c-0.3,0.3-0.2,0.9-0.1,1.4l-1.4,0.4c-0.2-0.5-0.4-1.8,0.3-2.7c0.4-0.5,1-0.8,1.7-0.9c1-0.1,2.2,0.3,3,0.9c1.8,1.5,1.6,4.6,0.2,6.4c-1.9,2.4-5.9,2.4-8.1,0.8c-1.4-1.1-2.3-2.9-2.4-5c-0.1-2.4,0.8-4.7,2.4-6.1c3.1-2.7,8.1-1.6,10.9,1.2c3.1,3.1,3.5,8.6,0.7,12.2c-1.4,1.9-3.6,3-6.2,3.3C62.5,29.8,62.1,29.8,61.7,29.8z"/>
      <text x="60.75" y="60" text-anchor="middle" font-size="18" letter-spacing="1.5" fill="#fff">
        {{ $t('MCD.LevelBadge.level').toUpperCase() }}
      </text>
      <text x="60.75" y="95" text-anchor="middle" font-size="34" letter-spacing="1.5" fill="#fff">
        {{ level }}
      </text>
    </svg>
  </div>
</template>

<script>
import CharacterUtils from '@/assets/js/utils/CharacterUtils';
import GlobalStore from '@/assets/js/stores/GlobalStore';

export default {
  name: 'MCDLevelBadge',
  data() {
    return {
      xp: this.characterXp,
    };
  },
  computed: {
    level() {
      return CharacterUtils.xp2Level(GlobalStore.selectedCharacter.$data.xp);
    },
    percent() {
      return (GlobalStore.selectedCharacter.$data.xp - CharacterUtils.level2Xp(this.level)) / CharacterUtils.getXpForLevel(this.level + 1);
    },
  },
  methods: {
    handleMouseOver() {
      window.onmousewheel = (e) => {
        const direction = (e.deltaY > 0 ? -1 : 1);
        GlobalStore.selectedCharacter.$data.xp += CharacterUtils.getXpForLevel(this.level) * (direction / 10);
      };
    },
    handleMouseOut() {
      window.onmousewheel = null;
    },
  },
};
</script>

<style lang="scss" src="./LevelBadge.scss">
</style>
