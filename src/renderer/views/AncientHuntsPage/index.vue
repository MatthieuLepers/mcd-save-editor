<template>
  <main class="AncientHuntsPage Page">
    <div class="AncientHuntsPage--Left">
      <MCDAncientMob v-for="(mob, i) in mobList" :key="i" :ancientMob="mob" />
    </div>
    <div class="AncientHuntsPage--Right">
      <MCDButton class="AncientHuntsPageButtonReset" icon="close" :title="$t('MCD.AncientHunts.reset')" @click="reset" />
      <MCDButton class="AncientHuntsPageButtonReload" icon="reload" :title="$t('MCD.AncientHunts.refresh')" @click="refresh" />

      <div class="AncientHuntsPageRuneList" v-if="AncientHuntsStore.runeList.length">
        <h6>{{ $t('MCD.AncientHunts.invocationRunes') }}</h6>
        <MCDRuneList :list="invocationRuneList" :compress="true" />
        <div class="AncientHuntsPageRuneList--ResidualList" v-if="!residualRuneList.isEmpty()">
          <h6>{{ $t('MCD.AncientHunts.residualRunes', { pluralize: residualRuneList.length > 1 ? 's' : '' }) }}</h6>
          <MCDRuneList :list="residualRuneList" :compress="true" />
        </div>
      </div>

      <div class="AncientHuntsPageItemList">
        <component
          :is="!!item ? 'MCDItem' : 'MCDItemEmpty'"
          v-for="(item, i) in foundOffers"
          :key="i"
          :item="item"
          :itemType="ItemTypeEnum.list[i]"
          :showRuneList="true"
          :noDragEvent="true"
        />
      </div>

      <MCDButton class="AncientHuntsPageButtonAdd" :label="$t('MCD.AncientHunts.button')" @click="addOffersToInventory" :disabled="foundOffersWithoutNull.length === 0" variant="success" />
    </div>
  </main>
</template>

<script>
import AncientMob from '@/assets/js/classes/AncientMob';
import Character from '@/assets/js/classes/Character';
import ItemTypeEnum from '@/assets/js/classes/enums/ItemTypeEnum';
import RuneList from '@/assets/js/classes/RuneList';
import GlobalStore from '@/assets/js/stores/GlobalStore';
import AncientHuntsStore from '@/assets/js/stores/AncientHuntsStore';
import { Items } from '@/assets/js/data/Content';
import AncientMobsData from '@/assets/js/data/AncientMobs';
import MCDAncientMob from '@/components/MCD/AncientMob';
import MCDItem from '@/components/MCD/Item';
import MCDItemEmpty from '@/components/MCD/ItemEmpty';
import MCDRuneList from '@/components/MCD/RuneList';
import MCDButton from '@/components/MCD/Button';
import NotificationStore from '../../components/Notification/NotificationStore';

export default {
  name: 'AncientHuntsPage',
  components: { MCDAncientMob, MCDItem, MCDItemEmpty, MCDRuneList, MCDButton },
  props: {
    character: { type: Character, required: true },
  },
  data() {
    return {
      AncientMobsData,
      AncientHuntsStore,
      Items,
      ItemTypeEnum,
      foundOffers: [null, null, null, null],
    };
  },
  computed: {
    mobList() {
      return Object
        .values(AncientMobsData)
        .map((mobData) => new AncientMob(mobData))
        .sort((a, b) => this.$t(`MCD.Game.AncientMobs.${a.name}`).localeCompare(this.$t(`MCD.Game.AncientMobs.${b.name}`)))
      ;
    },
    foundOffersWithoutNull() {
      return this.foundOffers.filter((item) => !!item);
    },
    invocationRuneList() {
      return AncientHuntsStore.runeList;
    },
    residualRuneList() {
      const offersRuneList = this.foundOffers
        .filter((item) => !!item)
        .reduce((acc, val) => acc.add(val.runeList), new RuneList())
      ;
      return offersRuneList.sub(this.invocationRuneList);
    },
  },
  methods: {
    addOffersToInventory() {
      let count = 0;
      const itemList = this.foundOffersWithoutNull.slice();
      if (GlobalStore.selectedCharacter.inventory.getAvailableSlotCount() >= itemList.length) {
        itemList.forEach((item) => {
          GlobalStore.selectedCharacter.inventory.addItem(item);
          count += 1;
        });
        NotificationStore.success(this.$t('MCD.AncientHunts.successMessage', { count, pluralize: count > 1 ? 's' : '' }));
        this.foundOffers = AncientHuntsStore.findOffers();
      } else {
        NotificationStore.error(this.$t('MCD.AncientHunts.errorMessage'));
      }
    },
    refresh() {
      if (AncientHuntsStore.ancientMobList.length) {
        this.foundOffers = AncientHuntsStore.findOffers();
      }
    },
    reset() {
      AncientHuntsStore.ancientMobList = [];
    },
  },
  mounted() {
    this.refresh();
  },
  watch: {
    AncientHuntsStore: {
      deep: true,
      handler() {
        this.foundOffers = AncientHuntsStore.findOffers();
      },
    },
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
