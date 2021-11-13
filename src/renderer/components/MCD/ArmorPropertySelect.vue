<template>
  <div class="MCDArmorPropertySelect" :class="{focus: open}">
    <div class="MCDArmorPropertySelectOuter" @click="open = !open">
      {{ $t(`MCD.Game.ArmorProperties.${property.armorPropertyIdentifier}`) }}
    </div>
    <div class="MCDArmorPropertySelectInner" v-show="open">
      <div class="MCDArmorPropertySelectFiltersContainer">
        <div class="MCDArmorPropertySelectInputSearch">
          <input type="text" v-model="searchString" :placeholder="$t('MCD.ItemSelect.search')" />
          <i class="icon-search"></i>
        </div>
      </div>
      <div class="MCDArmorPropertySelectChoiceList">
        <div class="MCDArmorPropertySelectChoice" v-for="(property, i) in filteredList" :key="i" @click="selectProperty(property)">
          <div class="MCDArmorPropertySelectChoiceName">
            <strong>{{ $t(`MCD.Game.ArmorProperties.${property.name}`) }}</strong>
            <span v-if="property.dlc" :class="`${property.dlc.replace(/ /, '')}`">{{ property.dlc }} DLC</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from '@/js/classes/Item';
import { ArmorProperties } from '@/js/data/Content';
import DLCsData from '@/js/data/DLCs';

export default {
  name: 'MCDArmorPropertySelect',
  props: {
    property: { type: Object, required: true },
    item: { type: Item, required: true },
  },
  data() {
    return {
      open: false,
      searchString: '',
    };
  },
  computed: {
    filteredList() {
      const itemProperties = this.item.$data.armorproperties.map((property) => property.id);
      const list = Object.values(ArmorProperties).filter((data) => !data.disabled && itemProperties.indexOf(data.name) < 0 && data.name !== this.property.id && this.$t(`MCD.Game.ArmorProperties.${data.name}`).toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0);
      list.sort((a, b) => !!a.dlc - !!b.dlc || (!!a.dlc && !!b.dlc && (DLCsData[a.dlc].releasedAt.getTime() - DLCsData[b.dlc].releasedAt.getTime() || this.$t(`MCD.Game.ArmorProperties.${a.name}`).localeCompare(this.$t(`MCD.Game.ArmorProperties.${b.name}`)))) || this.$t(`MCD.Game.ArmorProperties.${a.name}`).localeCompare(this.$t(`MCD.Game.ArmorProperties.${b.name}`)));

      return list;
    },
  },
  methods: {
    selectProperty(property) {
      this.property.id = property.name;
      this.open = false;
    },
  },
  watch: {
    open() {
      document.body.classList.toggle('modal');
    },
  },
  mounted() {
    window.onclick = (e) => {
      if (!e.target.matches('.MCDEnchantSelect') && !e.target.closest('.MCDEnchantSelect') && e.target !== this.$el) {
        this.open = false;
        window.onclick = null;
      }
    };
  },
};
</script>

<style lang="scss" src="./ArmorPropertySelect.scss">
</style>
