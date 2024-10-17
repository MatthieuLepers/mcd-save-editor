<template>
  <div :class="GenerateModifiers('MCDItemSelect', {
    Focus: state.open,
    NoFilters: modelValue.isEquipped(),
  })" ref="root">
    <div
      class="MCDItemSelectOuter"
      @click="actions.handleClickToggle"
      @mouseover="actions.refreshTutorialPolygonList"
      @mouseout="actions.refreshTutorialPolygonList"
    >
      {{ modelValue.toString() }}
    </div>
    <div class="MCDItemSelectInner" v-show="state.open">
      <div class="MCDItemSelectFiltersContainer">
        <div v-if="!modelValue.isEquipped()" class="MCDItemSelectFilters">
          <button
            v-for="({ name, icon }, i) in state.filtersList"
            :key="i"
            :class="GenerateModifiers('MCDItemSelectFilter', { Selected: state.filter === name })"
            :title="t(`MCD.Inventory.filters.${name.toLowerCase()}`)"
            @click.stop="actions.setFilter(name)"
          >
            <i :class="`icon-${icon}`"></i>
          </button>
        </div>
        <div class="MCDItemSelectInputSearch">
          <input type="text" v-model="state.searchString" :placeholder="t('MCD.ItemSelect.search')" />
          <i class="icon-search"></i>
        </div>
      </div>
      <div class="MCDItemSelectChoiceList">
        <div
          class="MCDItemSelectChoice"
          v-for="(itemData, i) in State.filteredItemList"
          :key="i"
          @click="actions.selectItem(itemData)"
        >
          <img
            class="MCDItemSelectChoiceImage"
            :src="itemData.image"
            :alt="itemData.getI18n('name')"
          />
          <div class="MCDItemSelectChoiceName">
            <strong>{{ itemData.getI18n('name') }}</strong>
            <span>
              <span
                v-for="(rarity, i) in itemData.rarity"
                :key="i"
                :class="rarity.toLowerCase()"
              >
                {{ t(`MCD.RarityLabel.${rarity.toLowerCase()}`) }}
              </span>
            </span>
            <span v-if="itemData.dlcId" :class="`${itemData.dlc.id.replace(/ /g, '')}`">
              {{ itemData.dlc.id }} DLC
            </span>
            <ul class="MCDItemSelectChoiceEvents" v-if="!!itemData.events.length">
              <li
                v-for="(event, i) in itemData.events"
                :key="i"
                :class="`${event.id.replace(/ /g, '')}`"
              >
                {{ event.id }} Event
              </li>
            </ul>
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

import PolygonEnum from '@renderer/core/tutorial/PolygonEnum';
import { Type } from '@renderer/core/entities/item/enums';
import { tutorialStore } from '@renderer/core/tutorial/Store';
import { itemsStore } from '@renderer/core/entities/item/store';

const FILTERS = [
  { name: 'all', icon: 'all' },
  { name: 'Melee', icon: 'melee' },
  { name: 'Ranged', icon: 'ranged' },
  { name: 'Armor', icon: 'helm' },
  { name: 'Artefact', icon: 'artefact' },
  { name: 'DLC', icon: 'dlc' },
  { name: 'Event', icon: 'calendar' },
];

defineOptions({ name: 'MCDItemSelect' });

const root = ref(null);
const { t } = useI18n();

const modelValue = defineModel({ type: Object, required: true });

const state = reactive({
  filtersList: FILTERS,
  filter: 'all',
  open: false,
  searchString: '',
});

const State = computed(() => ({
  filteredItemList: (() => {
    const baseFilterFn = (data) => !data.disabled
      && data.id !== modelValue.value.data.type
      && data.getI18n('name').toLowerCase().indexOf(state.searchString.toLowerCase()) >= 0;

    if (modelValue.value.isEquipped()) {
      const slot = (modelValue.value.isGear() ? modelValue.value.gearType : 'Artefact');
      return Object
        .values(itemsStore.items.value)
        .filter((data) => data.type === slot && baseFilterFn(data))
      ;
    }
    if (state.filter === 'all') {
      return Object
        .values(itemsStore.items.value)
        .filter(baseFilterFn)
      ;
    }
    if (state.filter === 'Event') {
      return Object
        .values(itemsStore.items.value)
        .filter((itemData) => !!itemData.events.length && baseFilterFn(itemData))
        .sort((a, b) => a.events[0].startedAt.getTime() - b.events[0].startedAt.getTime())
      ;
    }
    if (state.filter === 'DLC') {
      return Object
        .values(itemsStore.items.value)
        .filter((itemData) => itemData.dlcId && baseFilterFn(itemData))
        .sort((a, b) => a.dlc.releasedAt.getTime() - b.dlc.releasedAt.getTime())
      ;
    }
    return Object
      .values(itemsStore.items.value)
      .filter((itemData) => itemData.type === state.filter && baseFilterFn(itemData))
    ;
  })(),
}));

const actions = {
  setFilter(filter) {
    state.filter = filter;
  },
  selectItem(itemData) {
    document.body.classList.remove('modal'); // Force update before re-render component
    modelValue.value.convertTo(itemData);
    if (itemData.type === Type.ARTEFACT || (itemData.type !== Type.ARTEFACT && itemData.rarity.length === 1)) {
      tutorialStore.actions.setFullfilled('OpenSelector', null, null, true);
      tutorialStore.actions.setFullfilled('ChooseNewItem', false, 'InvalidItem');
    } else {
      tutorialStore.actions.setFullfilled('ChooseNewItem', true);
    }
    state.open = false;
  },
  handleClickToggle() {
    if (!state.open) {
      tutorialStore.actions.setFullfilled('OpenSelector', true);
    }
    state.open = !state.open;
  },
  refreshTutorialPolygonList() {
    tutorialStore.actions.refreshPolygonListForObjective('OpenSelector', [PolygonEnum.ITEM_SELECTOR()]);
  },
};

watch(() => state.open, (newOpen) => {
  document.body.classList[newOpen ? 'add' : 'remove']('modal');
});

onMounted(() => {
  window.onclick = (e) => {
    if (!e.target.matches('.MCDItemSelect') && !e.target.closest('.MCDItemSelect') && e.target !== root.value) {
      state.open = false;
      window.onclick = null;
    }
  };
});
</script>

<style lang="scss" src="./ItemSelect.scss">
</style>
