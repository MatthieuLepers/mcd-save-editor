<template>
  <ul
    v-if="props.messages.length && ((props.valid === false && props.touched) || props.valid || props.valid === null)"
    class="m-form-message-list"
  >
    <li
      v-for="(message, i) in props.messages"
      :key="i"
      :class="GenerateModifiers('m-form-message-item', { error: props.valid === false })"
    >
      <span
        :class="['m-form-message__icon', {
          'icon-info': props.valid !== false,
          'icon-warning': props.valid === false && props.touched,
        }]">
      </span>
      {{ message?.$message ?? message }}
    </li>
  </ul>
</template>

<script setup>
defineOptions({ name: 'FormMessageList' });

const props = defineProps({
  valid: { type: Boolean, default: null },
  touched: { type: Boolean, default: false },
  messages: { type: Array, default: () => [] },
});
</script>

<style lang="scss" src="./MessageList.scss">
</style>
