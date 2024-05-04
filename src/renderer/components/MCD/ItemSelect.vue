<template>
  <div :class="GenerateModifiers('MCDItemSelect', { Focus: state.open, NoFilters: props.modelValue.isEquipped() })" ref="root">
    <div
      class="MCDItemSelectOuter"
      @click="actions.handleClickToggle"
      @mouseover="actions.refreshTutorialPolygonList"
      @mouseout="actions.refreshTutorialPolygonList"
    >
      {{ props.modelValue.toString() }}
    </div>
    <div class="MCDItemSelectInner" v-show="state.open">
      <div class="MCDItemSelectFiltersContainer">
        <div v-if="!props.modelValue.isEquipped()" class="MCDItemSelectFilters">
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
            :src="image(itemData.image)"
            :alt="t(`MCD.Game.Items.${itemData.name}`)"
          />
          <div class="MCDItemSelectChoiceName">
            <strong>{{ t(`MCD.Game.Items.${itemData.name}`) }}</strong>
            <span>
              <span
                v-for="(rarity, i) in itemData.rarity"
                :key="i"
                :class="rarity.toLowerCase()"
              >
                {{ t(`MCD.RarityLabel.${rarity.toLowerCase()}`) }}
              </span>
            </span>
            <span
              v-if="itemData.dlc"
              :class="`${itemData.dlc.replace(/ /, '')}`"
            >
              {{ itemData.dlc }} DLC
            </span>
            <ul class="MCDItemSelectChoiceEvents" v-if="itemData.events">
              <li
                v-for="(event, i) in itemData.events"
                :key="i"
                :class="`${event.replace(/ /, '')}`"
              >
                {{ event }} Event
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

import { tutorialStore } from '@renderer/core/tutorial/Store';
import PolygonEnum from '@renderer/core/tutorial//PolygonEnum';
import { ItemTypeEnum } from '@renderer/core/classes/enums/ItemTypeEnum';
import { Items } from '@renderer/core/data/Content';
import DLCsData from '@renderer/core/data/DLCs';
import EventsData from '@renderer/core/data/Events';
import { image } from '@renderer/core/utils';

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

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const state = reactive({
  filtersList: FILTERS,
  filter: 'all',
  open: false,
  searchString: '',
});

const State = computed(() => ({
  filteredItemList: (() => {
    const baseFilterFn = (itemData) => !itemData.disabled && itemData.name !== props.modelValue.data.type && t(`MCD.Game.Items.${itemData.name}`).toLowerCase().indexOf(state.searchString.toLowerCase()) >= 0;

    if (props.modelValue.isEquipped()) {
      const slot = (props.modelValue.isGear() ? props.modelValue.gearType : 'Artefact');
      return Object
        .values(Items)
        .filter((itemData) => itemData.type === slot && baseFilterFn(itemData))
      ;
    }
    if (state.filter === 'all') {
      return Object
        .values(Items)
        .filter(baseFilterFn)
      ;
    }
    if (state.filter === 'Event') {
      return Object
        .values(Items)
        .filter((itemData) => itemData.events && baseFilterFn(itemData))
        .sort((a, b) => EventsData[a.events[0]].startedAt.getTime() - EventsData[b.events[0]].startedAt.getTime())
      ;
    }
    if (state.filter === 'DLC') {
      return Object
        .values(Items)
        .filter((itemData) => itemData.dlc && baseFilterFn(itemData))
        .sort((a, b) => DLCsData[a.dlc].releasedAt.getTime() - DLCsData[b.dlc].releasedAt.getTime())
      ;
    }
    return Object
      .values(Items)
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
    props.modelValue.convertTo(itemData);
    if (itemData.type === ItemTypeEnum.ARTEFACT || (itemData.type !== ItemTypeEnum.ARTEFACT && itemData.rarity.length === 1)) {
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
