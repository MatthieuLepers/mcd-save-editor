<template>
  <div :class="GenerateModifiers('MCDEnchantSelect', { Focus: state.open })" ref="root">
    <div class="MCDEnchantSelectOuter" @click="actions.handleClickToggle">
      {{ props.modelValue.toString() }}
    </div>
    <div class="MCDEnchantSelectInner" v-show="state.open">
      <div class="MCDEnchantSelectFiltersContainer">
        <div class="MCDEnchantSelectInputSearch">
          <input type="text" v-model="state.searchString" :placeholder="t('MCD.ItemSelect.search')" />
          <i class="icon-search"></i>
        </div>
      </div>
      <div class="MCDEnchantSelectChoiceList">
        <div
          class="MCDEnchantSelectChoice"
          v-for="(ench, i) in State.filteredList"
          :key="i"
          @click="actions.selectEnchant(ench)"
        >
          <img
            class="MCDEnchantSelectChoiceImage"
            :src="image(ench.image)"
            :alt="t(`MCD.Game.Enchants.${ench.name}.name`)"
          />
          <div class="MCDEnchantSelectChoiceName">
            <strong>{{ t(`MCD.Game.Enchants.${ench.name}.name`) }}</strong>
            <span>{{ t(`MCD.ItemEnchantmentChoice.tiers.${ench.tier.toLowerCase()}`) }}</span>
            <span v-if="ench.dlc" :class="`${ench.dlc.replace(/ /, '')}`">{{ ench.dlc }} DLC</span>
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
  ref,
  onMounted,
} from 'vue';
import { useI18n } from 'vue-i18n';

import { Enchants } from '@renderer/core/data/Content';
import DLCsData from '@renderer/core/data/DLCs';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { tutorialStore } from '@renderer/core/tutorial/Store';
import { image } from '@renderer/core/utils';

defineOptions({ name: 'MCDEnchantSelect' });

const root = ref(null);
const { t } = useI18n();

const props = defineProps({
  modelValue: { type: Object, required: true },
  unallowedEnchants: { type: Array, default: () => [] },
});

const state = reactive({
  open: false,
  searchString: '',
});

const State = computed(() => ({
  filteredList: (() => {
    const { type, soulgathering, activeEnchants } = globalStore.state.selectedItem.itemData;
    const checkSoulgathering = (data) => (data.soulgathering ? data.soulgathering === soulgathering : true);
    const checkActiveEnchants = (data) => (activeEnchants ? activeEnchants.indexOf(data.name) < 0 : true);
    const checkWeaponType = (data) => (globalStore.state.selectedItem.weaponType && data.weaponType ? globalStore.state.selectedItem.weaponType === data.weaponType : true);

    return Object.values(Enchants)
      .filter((data) => !props.unallowedEnchants.includes(data.name) && !data.disabled && data.name !== props.modelValue.id && t(`MCD.Game.Enchants.${data.name}.name`).toLowerCase().indexOf(state.searchString.toLowerCase()) >= 0 && data.type.indexOf(type) >= 0 && checkSoulgathering(data) && checkActiveEnchants(data) && checkWeaponType(data))
      .sort((a, b) => (a.name === 'Unset' ? -1 : 1) || !!a.dlc - !!b.dlc || (!!a.dlc && !!b.dlc && (DLCsData[a.dlc].releasedAt.getTime() - DLCsData[b.dlc].releasedAt.getTime() || t(`MCD.Game.Enchants.${a.name}.name`).localeCompare(t(`MCD.Game.Enchants.${b.name}.name`)))) || t(`MCD.Game.Enchants.${a.name}.name`).localeCompare(t(`MCD.Game.Enchants.${b.name}.name`)))
    ;
  })(),
}));

const actions = {
  selectEnchant(ench) {
    props.modelValue.id = ench.name;
    tutorialStore.actions.setFullfilled('ChooseNewEnchantment', true);
    globalStore.state.selectedItem.$key += 1;
    if (ench.name === 'Unset') {
      props.modelValue.level = 0;
      tutorialStore.actions.setFullfilled('ChooseUnsetEnchantment', true);
    } else {
      tutorialStore.actions.setFullfilled('ChooseUnsetEnchantment', false, 'InvalidSelection');
      tutorialStore.state.stepData.currentObjective.onError = () => { state.open = true; };
    }
    state.open = false;
  },
  handleClickToggle() {
    if (!state.open) {
      tutorialStore.actions.setFullfilled('OpenSelector', true);
    }
    state.open = !state.open;
  },
};

onMounted(() => {
  window.onclick = (e) => {
    if (!e.target.matches('.MCDEnchantSelect') && !e.target.closest('.MCDEnchantSelect') && e.target !== root.value) {
      state.open = false;
      window.onclick = null;
    }
  };
});
</script>

<style lang="scss" src="./EnchantSelect.scss">
</style>
