<template>
  <li :class="GenerateModifiers('MCDTowerFloor', { Current: props.index === props.current, Done: props.index < props.current })">
    {{ t('MCD.TowerFloor.floor') }} {{ props.index }}/{{ props.totalFloors }} - {{ floor.type }}
    <div>
      <span v-if="props.floor.challenge && props.floor.challenge.level">
        {{ t(`MCD.Game.Tower.Challenges.${props.floor.challenge.level}`) }}, {{ t(`MCD.TowerFloor.difficulties.${props.floor.challenge.difficulty}`) }}
      </span>
      <span v-if="props.floor.challenge && props.floor.challenge.boss">
        {{ t(`MCD.Game.Tower.Bosses.${props.floor.challenge.boss}`) }}
      </span>
      <span v-if="props.floor.isMerchant()">
        {{ t(`MCD.Game.Tower.Merchants.${props.floor.data.tile}`) }}
      </span>
    </div>
    <button v-if="props.index > 0" @click="emit('edit')">
      <i class="icon-edit"></i>
    </button>
  </li>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import TowerFloor from '@renderer/core/classes/tower/TowerFloor';

defineOptions({ name: 'MCDTowerFloor' });

const emit = defineEmits(['edit']);
const { t } = useI18n();

const props = defineProps({
  index: { type: Number, required: true },
  current: { type: Number, required: true },
  floor: { type: TowerFloor, required: true },
  totalFloors: { type: Number, default: 30 },
});
</script>

<style lang="scss" src="./TowerFloor.scss">
</style>
