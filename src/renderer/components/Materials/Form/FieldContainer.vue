<template>
  <div :class="GenerateModifiers('m-form-field-container', props.modifiers)">
    <slot />
  </div>
</template>

<script setup>
defineOptions({ name: 'FormFieldContainer' });

const props = defineProps({
  modifiers: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" src="./FieldContainer.scss">
</style>
