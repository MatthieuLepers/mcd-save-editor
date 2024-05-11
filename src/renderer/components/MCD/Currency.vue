<template>
  <div class="MCDCurrency">
    <img :src="utils.image(props.image)" :alt="props.imageAlt" class="MCDCurrencyImage" />
    <input
      v-if="!props.readonly"
      class="MCDCurrencyField"
      type="number"
      :value="props.modelValue"
      @input="emit('update:modelValue', parseInt($event.target.value, 10))"
    />
    <span v-else class="MCDCurrencySpan">{{ props.modelValue }}</span>
  </div>
</template>

<script setup>
import * as utils from '@renderer/core/utils';

defineOptions({ name: 'MCDCurrency' });

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: { type: Number, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
});
</script>

<style lang="scss" src="./Currency.scss">
</style>
