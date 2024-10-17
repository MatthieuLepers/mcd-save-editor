<template>
  <div :class="GenerateModifiers('MCDArmorPropertySelect', { Focus: state.open })" ref="root">
    <div class="MCDArmorPropertySelectOuter" @click="state.open = !state.open">
      {{ props.property.armorPropertyData.getI18n('name') }}
    </div>
    <div class="MCDArmorPropertySelectInner" v-show="state.open">
      <div class="MCDArmorPropertySelectFiltersContainer">
        <div class="MCDArmorPropertySelectInputSearch">
          <input type="text" v-model="state.searchString" :placeholder="t('MCD.ItemSelect.search')" />
          <i class="icon-search"></i>
        </div>
      </div>
      <div class="MCDArmorPropertySelectChoiceList">
        <div
          class="MCDArmorPropertySelectChoice"
          v-for="(property, i) in State.filteredList"
          :key="i" @click="actions.selectProperty(property)"
        >
          <div class="MCDArmorPropertySelectChoiceName">
            <strong>{{ property.getI18n('name') }}</strong>
            <span v-if="property.dlcId" :class="`${property.dlc.id.replace(/ /, '')}`">
              {{ property.dlc.id }} DLC
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  watch,
  ref,
  onMounted,
} from 'vue';
import { useI18n } from 'vue-i18n';

import GameItem from '@renderer/core/entities/item/game';
import { armorPropertiesStore } from '@renderer/core/entities/armorProperty/store';

defineOptions({ name: 'MCDArmorPropertySelect' });

const { t } = useI18n();
const root = ref(null);

const props = defineProps({
  property: { type: Object, required: true },
  item: { type: GameItem, required: true },
});

const state = reactive({
  open: false,
  searchString: '',
});

const State = computed(() => ({
  filteredList: (() => {
    const itemProperties = props.item.data.armorproperties.map((property) => property.id);
    return Object
      .values(armorPropertiesStore.state.properties)
      .filter((data) => itemProperties.indexOf(data.id) < 0
        && data.id !== props.property.id
        && data.getI18n('name').toLowerCase().indexOf(state.searchString.toLowerCase()) >= 0)
      .sort((a, b) => a.dlc.releasedAt.getTime() - b.dlc.releasedAt.getTime()
        || a.getI18n('name').localeCompare(b.getI18n('name')))
    ;
  })(),
}));

const actions = {
  selectProperty(property) {
    props.property.id = property.id;
    state.open = false;
  },
};

watch(() => state.open, () => {
  document.body.classList.toggle('modal');
});

onMounted(() => {
  window.onclick = (e) => {
    if (!e.target.matches('.MCDEnchantSelect') && !e.target.closest('.MCDEnchantSelect') && e.target !== root.value) {
      state.open = false;
      window.onclick = null;
    }
  };
});
</script>

<style lang="scss" src="./ArmorPropertySelect.scss">
</style>
