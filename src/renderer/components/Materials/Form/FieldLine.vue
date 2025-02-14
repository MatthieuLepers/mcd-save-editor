<template>
  <div :class="GenerateModifiers('m-form-field-line', { [props.size]: props.size > 1 })">
    <FormFieldContainer
      v-for="i in State.slots"
      :key="i"
      :modifiers="props.modifiers"
    >
      <slot v-if="props.size > 1" :name="`field${i}`" />
      <slot v-else />
    </FormFieldContainer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import FormFieldContainer from '@renderer/components/Materials/Form/FieldContainer.vue';

import type { ISlots, IProps } from './FieldLine';

defineOptions({ name: 'FormFieldLine' });

defineSlots<ISlots>();

const props = withDefaults(defineProps<IProps>(), {
  size: 1,
  modifiers: () => ({}),
});

const State = computed(() => ({
  slots: [...Array(props.size).keys()],
}));
</script>

<style lang="scss" src="./FieldLine.scss">
</style>
