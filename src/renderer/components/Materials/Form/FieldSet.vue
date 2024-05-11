<template>
  <fieldset class="m-form-fieldset">
    <legend class="m-form-fieldset__legend">
      <slot name="legend">{{ props.legend }}</slot>
    </legend>
    <div class="m-form-fieldset__content">
      <slot />
    </div>
  </fieldset>
</template>

<script setup>
defineOptions({ name: 'FormFieldSet' });

const props = defineProps({
  legend: { type: String, required: true },
});
</script>

<style lang="scss" src="./FieldSet.scss">
</style>
