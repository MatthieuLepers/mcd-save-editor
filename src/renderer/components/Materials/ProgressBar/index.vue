<template>
  <div :class="GenerateModifiers('m-progress-bar', props.modifiers)">
    <span v-if="props.label || slots.label" class="m-progress-bar__label">
      <slot name="label">
        {{ props.label }}
      </slot>
    </span>
    <div
      class="m-progress-bar__track"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="Math.round((props.percent * 100) * 10) / 10"
      :aria-valuetext="`${Math.round((props.percent * 100) * 10) / 10}%`"
      :aria-label="props.ariaLabel"
    >
      <span
        class="m-progress-bar__progress"
        :style="{ width: `calc(${props.percent * 100}% - 4px)` }"
      >
        <slot name="track">
          {{ Math.round((props.percent * 100) * 10) / 10 }}%
        </slot>
      </span>
    </div>
  </div>
</template>

<script setup>
import { useSlots } from 'vue';

defineOptions({ name: 'ProgressBar' });

const slots = useSlots();

const props = defineProps({
  label: { type: String, default: null },
  ariaLabel: { type: String, default: null },
  percent: { type: Number, default: 0 },
  modifiers: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" src="./index.scss">
</style>
