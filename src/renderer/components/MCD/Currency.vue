<template>
  <div class="MCDCurrency">
    <img :src="image" :alt="imageAlt" class="MCDCurrencyImage" />
    <input v-if="!readonly" class="MCDCurrencyField" type="number" :value="value" @input="$emit('input', parseInt($event.target.value, 10))" />
    <span v-else class="MCDCurrencySpan">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'MCDCurrency',
  props: {
    value: { type: Number, required: true },
    image: { type: String, required: true },
    imageAlt: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" src="./Currency.scss">
</style>
