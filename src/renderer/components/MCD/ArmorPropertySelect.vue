<template>
  <div :class="GenerateModifiers('MCDArmorPropertySelect', { Focus: state.open })" ref="root">
    <div class="MCDArmorPropertySelectOuter" @click="state.open = !state.open">
      {{ t(`MCD.Game.ArmorProperties.${props.property.armorPropertyIdentifier}`) }}
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
            <strong>{{ t(`MCD.Game.ArmorProperties.${property.name}`) }}</strong>
            <span
              v-if="property.dlc"
              :class="`${property.dlc.replace(/ /, '')}`"
            >
              {{ property.dlc }} DLC
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

import Item from '@renderer/core/classes/Item';
import { ArmorProperties } from '@renderer/core/data/Content';
import DLCsData from '@renderer/core/data/DLCs';

defineOptions({ name: 'MCDArmorPropertySelect' });

const { t } = useI18n();
const root = ref(null);

const props = defineProps({
  property: { type: Object, required: true },
  item: { type: Item, required: true },
});

const state = reactive({
  open: false,
  searchString: '',
});

const State = computed(() => ({
  filteredList: (() => {
    const itemProperties = props.item.data.armorproperties.map((property) => property.id);
    const list = Object.values(ArmorProperties).filter((data) => !data.disabled && itemProperties.indexOf(data.name) < 0 && data.name !== props.property.id && t(`MCD.Game.ArmorProperties.${data.name}`).toLowerCase().indexOf(state.searchString.toLowerCase()) >= 0);
    list.sort((a, b) => !!a.dlc - !!b.dlc || (!!a.dlc && !!b.dlc && (DLCsData[a.dlc].releasedAt.getTime() - DLCsData[b.dlc].releasedAt.getTime() || t(`MCD.Game.ArmorProperties.${a.name}`).localeCompare(t(`MCD.Game.ArmorProperties.${b.name}`)))) || t(`MCD.Game.ArmorProperties.${a.name}`).localeCompare(t(`MCD.Game.ArmorProperties.${b.name}`)));

    return list;
  })(),
}));

const actions = {
  selectProperty(property) {
    props.property.id = property.name;
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
