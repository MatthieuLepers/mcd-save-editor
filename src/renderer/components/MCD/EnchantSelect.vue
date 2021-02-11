<template>
  <div class="MCDEnchantSelect" :class="{focus: open}">
    <div class="MCDEnchantSelectOuter" @click="handleClickToggle">
      {{ $t(`MCD.Game.Enchants.${value.enchantIdentifier}.name`) }}
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
import DLCsData from '@/js/data/DLCs';
import EnchantsData from '@/js/data/Enchants';
import TutorialStore from '@/js/tutorial/Store';

export default {
  name: 'MCDEnchantSelect',
  props: {
    value: { type: Object, required: true },
  },
  data() {
    return {
      EnchantsData,
      open: false,
      searchString: '',
      DLCsData,
    };
  },
  computed: {
    filteredList() {
      const { type, soulgathering, activeEnchants } = GlobalStore.selectedItem.itemData;
      const checkDlc = data => (data.dlc ? GlobalStore.selectedCharacter.isDLCEnabled(data.dlc) : true);
      const checkSoulgathering = data => (data.soulgathering ? data.soulgathering === soulgathering : true);
      const checkActiveEnchants = data => (activeEnchants ? activeEnchants.indexOf(data.name) < 0 : true);

      return Object.values(EnchantsData).filter(data => !data.disabled && data.name !== this.value.id && this.$t(`MCD.Game.Enchants.${data.name}.name`).toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0 && data.type.indexOf(type) >= 0 && checkSoulgathering(data) && checkDlc(data) && checkActiveEnchants(data));
    },
  },
  methods: {
    selectEnchant(ench) {
      this.value.id = ench.name;
      TutorialStore.setFullfilled('ChooseNewEnchantment', true);
      if (ench.name === 'Unset') {
        this.value.level = 0;
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
