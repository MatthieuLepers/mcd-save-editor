<template>
  <div :class="GenerateModifiers('MCDEnchantSelect', { Focus: state.open })" ref="root">
    <div class="MCDEnchantSelectOuter" @click="actions.handleClickToggle">
      {{ modelValue.toString() }}
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
          v-for="(enchantData, i) in State.filteredList"
          :key="i"
          @click="actions.selectEnchant(enchantData)"
        >
          <img
            class="MCDEnchantSelectChoiceImage"
            :src="enchantData.image"
            :alt="enchantData.getI18n('name')"
          />
          <div class="MCDEnchantSelectChoiceName">
            <strong>{{ enchantData.getI18n('name') }}</strong>
            <span>{{ t(`MCD.ItemEnchantmentChoice.tiers.${enchantData.tier.toLowerCase()}`) }}</span>
            <span v-if="enchantData.dlcId" :class="`${enchantData.dlc.id.replace(/ /, '')}`">
              {{ enchantData.dlc.id }} DLC
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
  ref,
  onMounted,
} from 'vue';
import { useI18n } from 'vue-i18n';

import GameEnchant from '@renderer/core/entities/enchant/game';
import { enchantsStore } from '@renderer/core/entities/enchant/store';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { tutorialStore } from '@renderer/core/tutorial/Store';

defineOptions({ name: 'MCDEnchantSelect' });

const root = ref(null);
const { t } = useI18n();

const modelValue = defineModel({ type: GameEnchant });

const props = defineProps({
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
    const checkActiveEnchants = (data) => (activeEnchants ? activeEnchants.indexOf(data.id) < 0 : true);
    const checkWeaponType = (data) => (globalStore.state.selectedItem.weaponType && data.weaponType ? globalStore.state.selectedItem.weaponType === data.weaponType : true);

    return Object
      .values(enchantsStore.state.enchants)
      .filter((data) => !props.unallowedEnchants.includes(data.id)
        && data.id !== modelValue.value.id
        && data.getI18n('name').toLowerCase().indexOf(state.searchString.toLowerCase()) >= 0
        && data.type.indexOf(type) >= 0
        && checkSoulgathering(data)
        && checkActiveEnchants(data)
        && checkWeaponType(data))
      .sort((a, b) => (a.id === 'Unset' ? -1 : 1)
        || a.dlc.releasedAt.getTime() - b.dlc.releasedAt.getTime()
        || a.getI18n('name').localeCompare(b.getI18n('name')))
    ;
  })(),
}));

const actions = {
  selectEnchant(ench) {
    modelValue.value.id = ench.id;
    tutorialStore.actions.setFullfilled('ChooseNewEnchantment', true);
    globalStore.state.selectedItem.$key += 1;
    if (ench.id === 'Unset') {
      modelValue.value.level = 0;
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
