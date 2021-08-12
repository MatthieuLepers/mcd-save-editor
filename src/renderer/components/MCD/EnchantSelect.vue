<template>
  <div class="MCDEnchantSelect" :class="{focus: open}">
    <div class="MCDEnchantSelectOuter" @click="handleClickToggle">
      {{ value.toString() }}
    </div>
    <div class="MCDEnchantSelectInner" v-show="open">
      <div class="MCDEnchantSelectFiltersContainer">
        <div class="MCDEnchantSelectInputSearch">
          <input type="text" v-model="searchString" :placeholder="$t('MCD.ItemSelect.search')" />
          <i class="icon-search"></i>
        </div>
      </div>
      <div class="MCDEnchantSelectChoiceList">
        <div class="MCDEnchantSelectChoice" v-for="(ench, i) in filteredList" :key="i" @click="selectEnchant(ench)">
          <img class="MCDEnchantSelectChoiceImage" :src="ench.image" :alt="$t(`MCD.Game.Enchants.${ench.name}.name`)" />
          <div class="MCDEnchantSelectChoiceName">
            <strong>{{ $t(`MCD.Game.Enchants.${ench.name}.name`) }}</strong>
            <span>{{ $t(`MCD.ItemEnchantmentChoice.tiers.${ench.tier.toLowerCase()}`) }}</span>
            <span v-if="ench.dlc" :class="`${ench.dlc.replace(/ /, '')}`">{{ ench.dlc }} DLC</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalStore from '@/js/stores/GlobalStore';
import { Enchants } from '@/js/data/Content';
import DLCsData from '@/js/data/DLCs';
import TutorialStore from '@/js/tutorial/Store';

export default {
  name: 'MCDEnchantSelect',
  props: {
    value: { type: Object, required: true },
  },
  data() {
    return {
      Enchants,
      open: false,
      searchString: '',
    };
  },
  computed: {
    filteredList() {
      const { type, soulgathering, activeEnchants } = GlobalStore.selectedItem.itemData;
      const checkSoulgathering = data => (data.soulgathering ? data.soulgathering === soulgathering : true);
      const checkActiveEnchants = data => (activeEnchants ? activeEnchants.indexOf(data.name) < 0 : true);
      const checkWeaponType = data => (GlobalStore.selectedItem.weaponType && data.weaponType ? GlobalStore.selectedItem.weaponType === data.weaponType : true);

      return Object.values(Enchants)
        .filter(data => !data.disabled && data.name !== this.value.id && this.$t(`MCD.Game.Enchants.${data.name}.name`).toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0 && data.type.indexOf(type) >= 0 && checkSoulgathering(data) && checkActiveEnchants(data) && checkWeaponType(data))
        .sort((a, b) => !!a.dlc - !!b.dlc || (!!a.dlc && !!b.dlc && (DLCsData[a.dlc].releasedAt.getTime() - DLCsData[b.dlc].releasedAt.getTime() || this.$t(`MCD.Game.Enchants.${a.name}.name`).localeCompare(this.$t(`MCD.Game.Enchants.${b.name}.name`)))) || this.$t(`MCD.Game.Enchants.${a.name}.name`).localeCompare(this.$t(`MCD.Game.Enchants.${b.name}.name`)))
      ;
    },
  },
  methods: {
    selectEnchant(ench) {
      this.value.id = ench.name;
      TutorialStore.setFullfilled('ChooseNewEnchantment', true);
      GlobalStore.selectedItem.$key += 1;
      if (ench.name === 'Unset') {
        this.value.level = 0;
        TutorialStore.setFullfilled('ChooseUnsetEnchantment', true);
      } else {
        TutorialStore.setFullfilled('ChooseUnsetEnchantment', false, 'InvalidSelection');
        TutorialStore.stepData.currentObjective.onError = () => { this.open = true; };
      }
      this.open = false;
    },
    handleClickToggle() {
      if (!this.open) {
        TutorialStore.setFullfilled('OpenSelector', true);
      }
      this.open = !this.open;
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

<style lang="scss" src="./EnchantSelect.scss">
</style>
