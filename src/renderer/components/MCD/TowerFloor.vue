<template>
  <li :class="GenerateModifiers('MCDTowerFloor', { Current: index === current, Done: index < current })">
    {{ $t('MCD.TowerFloor.floor') }} {{ index }}/30 - {{ floor.type }}
    <div>
      <span v-if="floor.challenge && floor.challenge.level">
        {{ $t(`MCD.Game.Tower.Challenges.${floor.challenge.level}`) }}, {{ $t(`MCD.TowerFloor.difficulties.${floor.challenge.difficulty}`) }}
      </span>
      <span v-if="floor.challenge && floor.challenge.boss">
        {{ $t(`MCD.Game.Tower.Bosses.${floor.challenge.boss}`) }}
      </span>
      <span v-if="floor.isMerchant()">
        {{ $t(`MCD.Game.Tower.Merchants.${floor.$data.tile}`) }}
      </span>
    </div>
    <button v-if="index > 0" @click="$emit('edit')">
      <i class="icon-edit"></i>
    </button>
  </li>
</template>

<script>
import TowerFloor from '@/js/classes/tower/TowerFloor';

export default {
  name: 'MCDTowerFloor',
  props: {
    index: { type: Number, required: true },
    current: { type: Number, required: true },
    floor: { type: TowerFloor, required: true },
  },
};
</script>

<style lang="scss" src="./TowerFloor.scss">
</style>
