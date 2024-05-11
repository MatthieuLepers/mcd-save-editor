<template>
  <div :class="GenerateModifiers('m-form-field-line', { [props.size]: props.size > 1 })">
    <FormFieldContainer
      v-for="i in State.slots"
      :key="i"
      :modifiers="props.modifiers?.[`field${i}`] ?? {}"
    >
      <slot v-if="props.size > 1" :name="`field${i}`" />
      <slot v-else />
    </FormFieldContainer>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import FormFieldContainer from '@renderer/components/Materials/Form/FieldContainer.vue';

defineOptions({ name: 'FormFieldLine' });

const props = defineProps({
  size: { type: Number, default: 1 },
  modifiers: { type: Object, default: () => ({}) },
});

const State = computed(() => ({
  slots: [...Array(props.size).keys()],
}));
</script>

<style lang="scss" src="./FieldLine.scss">
</style>
