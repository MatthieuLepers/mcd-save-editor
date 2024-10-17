<template>
  <div class="m-object-list">
    <h3 class="m-object-list__title">
      {{ props.title }}
      <button
        v-if="!props.max || (!!props.max && state.modelList.length < props.max)"
        type="button"
        :aria-label="t('Materials.Form.ObjectList.addModel')"
        :class="GenerateModifiers('m-object-list__button', { add: true })"
        @click="actions.addModel"
      >+</button>
    </h3>
    <ul class="m-object-list__list">
      <li
        v-for="(item, i) in state.modelList"
        :key="i"
        :class="GenerateModifiers('m-object-list__list-item', { removable: state.modelList.length > props.min })"
      >
        <slot :index="i" :model="item" />
        <button
          v-if="state.modelList.length > props.min"
          type="button"
          :aria-label="t('Materials.Form.ObjectList.removeModel')"
          :class="GenerateModifiers('m-object-list__button', { remove: true })"
          @click="actions.removeModel(item)"
        >-</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'FormObjectList' });

const { t } = useI18n();

const modelValue = defineModel({ type: Array, default: () => [] });

const props = defineProps({
  title: { type: String, required: true },
  model: { type: Object, required: true },
  min: { type: Number, default: 1 },
  max: { type: Number, default: null },
});

const state = reactive({
  modelList: modelValue.value,
});

const actions = {
  addModel() {
    state.modelList.push({ ...props.model });
    modelValue.value = state.modelList;
  },
  removeModel(model) {
    state.modelList = state.modelList.filter((m) => m !== model);
    modelValue.value = state.modelList;
  },
};

const updateModelValue = () => {
  if (state.modelList.length < props.min) {
    state.modelList.push(...[...Array(props.min - state.modelList.length).keys()].map(() => ({ ...props.model })));
  }
  if (props.max) {
    state.modelList = state.modelList.slice(0, props.max);
  }
};

watch(() => modelValue.value, (newVal) => {
  state.modelList = newVal;
});

watch(() => props.min, () => {
  updateModelValue();
});

watch(() => props.max, () => {
  updateModelValue();
});

onMounted(() => {
  updateModelValue();
});
</script>

<style lang="scss" src="./ObjectList.scss">
</style>
