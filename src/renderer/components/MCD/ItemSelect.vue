<template>
  <div class="MCDItemSelect" :class="{focus: open, noFilters: value.isEquipped()}">
    <div class="MCDItemSelectOuter" @click="handleClickToggle" @mouseover="refreshTutorialPolygonList" @mouseout="refreshTutorialPolygonList">
      {{ value.toString() }}
    </div>
    <div class="MCDItemSelectInner" v-show="open">
      <div class="MCDItemSelectFiltersContainer">
        <div v-if="!value.isEquipped()" class="MCDItemSelectFilters">
          <button
            class="MCDItemSelectFilter"
            :class="{selected: filter === name}"
            :title="$t(`MCD.Inventory.filters.${name.toLowerCase()}`)"
            @click.stop="setFilter(name)"
            v-for="({ name, icon }, i) in filtersList"
            :key="i"
          >
            <i :class="`icon-${icon}`"></i>
          </button>
        </div>
        <div class="MCDItemSelectInputSearch">
          <input type="text" v-model="searchString" :placeholder="$t('MCD.ItemSelect.search')" />
          <i class="icon-search"></i>
        </div>
      </div>
      <div class="MCDItemSelectChoiceList">
        <div class="MCDItemSelectChoice" v-for="(itemData, i) in filteredItemList" :key="i" @click="selectItem(itemData)">
          <img class="MCDItemSelectChoiceImage" :src="itemData.image" :alt="$t(`MCD.Game.Items.${itemData.name}`)" />
          <div class="MCDItemSelectChoiceName">
            <strong>{{ $t(`MCD.Game.Items.${itemData.name}`) }}</strong>
            <span>
              <span :class="rarity.toLowerCase()" v-for="(rarity, i) in itemData.rarity" :key="i">
                {{ $t(`MCD.RarityLabel.${rarity.toLowerCase()}`) }}
              </span>
            </span>
            <span v-if="itemData.dlc" :class="`${itemData.dlc.replace(/ /, '')}`">{{ itemData.dlc }} DLC</span>
            <span v-if="itemData.event" :class="`${itemData.event.replace(/ /, '')}`">{{ itemData.event }} Event</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialStore from '@/js/tutorial/Store';
import PolygonEnum from '@/js/tutorial//PolygonEnum';
import ItemTypeEnum from '@/js/classes/enums/ItemTypeEnum';
import ItemsData from '@/js/data/Items';
import DLCsData from '@/js/data/DLCs';
import EventsData from '@/js/data/Events';

const FILTERS = [
  { name: 'all', icon: 'all' },
  { name: 'Melee', icon: 'melee' },
  { name: 'Ranged', icon: 'ranged' },
  { name: 'Armor', icon: 'helm' },
  { name: 'Artefact', icon: 'artefact' },
  { name: 'DLC', icon: 'dlc' },
  { name: 'Event', icon: 'calendar' },
];

export default {
  name: 'MCDItemSelect',
  props: {
    value: { type: Object, required: true },
  },
  data() {
    return {
      filtersList: FILTERS,
      filter: 'all',
      open: false,
      searchString: '',
    };
  },
  computed: {
    filteredItemList() {
      const baseFilterFn = itemData => !itemData.disabled && itemData.name !== this.value.$data.type && this.$t(`MCD.Game.Items.${itemData.name}`).toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0;

      if (this.value.isEquipped()) {
        const slot = (this.value.isGear() ? this.value.gearType : 'Artefact');
        return Object
          .values(ItemsData)
          .filter(itemData => itemData.type === slot && baseFilterFn(itemData))
        ;
      }
      if (this.filter === 'all') {
        return Object
          .values(ItemsData)
          .filter(baseFilterFn)
        ;
      }
      if (this.filter === 'Event') {
        return Object
          .values(ItemsData)
          .filter(itemData => itemData.event && baseFilterFn(itemData))
          .sort((a, b) => EventsData[a.event].startedAt.getTime() - EventsData[b.event].startedAt.getTime())
        ;
      }
      if (this.filter === 'DLC') {
        return Object
          .values(ItemsData)
          .filter(itemData => itemData.dlc && baseFilterFn(itemData))
          .sort((a, b) => DLCsData[a.dlc].releasedAt.getTime() - DLCsData[b.dlc].releasedAt.getTime())
        ;
      }
      return Object
        .values(ItemsData)
        .filter(itemData => itemData.type === this.filter && baseFilterFn(itemData))
      ;
    },
  },
  methods: {
    setFilter(filter) {
      this.filter = filter;
    },
    selectItem(itemData) {
      this.value.convertTo(itemData);
      if (itemData.type === ItemTypeEnum.ARTEFACT || (itemData.type !== ItemTypeEnum.ARTEFACT && itemData.rarity.length === 1)) {
        TutorialStore.setFullfilled('OpenSelector', null, null, true);
        TutorialStore.setFullfilled('ChooseNewItem', false, 'InvalidItem');
      } else {
        TutorialStore.setFullfilled('ChooseNewItem', true);
      }
      this.open = false;
    },
    handleClickToggle() {
      if (!this.open) {
        TutorialStore.setFullfilled('OpenSelector', true);
      }
      this.open = !this.open;
    },
    refreshTutorialPolygonList() {
      TutorialStore.refreshPolygonListForObjective('OpenSelector', [PolygonEnum.ITEM_SELECTOR()]);
    },
  },
  watch: {
    open() {
      document.body.classList.toggle('modal');
    },
  },
  mounted() {
    window.onclick = (e) => {
      if (!e.target.matches('.MCDItemSelect') && !e.target.closest('.MCDItemSelect') && e.target !== this.$el) {
        this.open = false;
        window.onclick = null;
      }
    };
  },
};
</script>

<style lang="scss" src="./ItemSelect.scss">
</style>
