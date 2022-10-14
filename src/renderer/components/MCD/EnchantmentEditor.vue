<template>
  <div class="MCDEnchantmentEditor" v-show="!!GlobalStore.selectedEnchant && !!GlobalStore.selectedEnchant.enchantIdentifier">
    <div class="MCDEnchantmentEditorContainer" v-if="!!GlobalStore.selectedEnchant && !!GlobalStore.selectedEnchant.enchantIdentifier">
      <h2>
        <MCDEnchantSelect v-model="GlobalStore.selectedEnchant" :unallowedEnchants="GlobalStore.getUnallowedEnchantForChunk()" />
        <MCDButton icon="close" @click="closeEditor" variant="dark" />
      </h2>
      <div class="MCDEnchantmentEditorLeft">
        <p>
          {{ $t(`MCD.Game.Enchants.${GlobalStore.selectedEnchant.enchantIdentifier}.desc`) }}
        </p>
        <div class="TierContainer" v-if="GlobalStore.selectedEnchant.enchantIdentifier !== 'Unset'">
          <h3>{{ $t('MCD.EnchantmentEditor.upgradeTiers') }}</h3>
          <ul>
            <li v-for="(level, index) in $t(`MCD.Game.Enchants.${GlobalStore.selectedEnchant.enchantIdentifier}.level`)" :key="`${GlobalStore.selectedEnchant.enchantIdentifier}lvl${index}`" :class="{checked: GlobalStore.selectedEnchant.level >= index + 1}">
              <input :disabled="GlobalStore.selectedEnchant.level < index" :checked="GlobalStore.selectedEnchant.level >= index + 1" :id="`${GlobalStore.selectedEnchant.enchantIdentifier}Level${index}_${_uid}`" type="checkbox" :name="`levelGroup${_uid}`" @click.stop="setLevel($event, index + 1)" />
              <label :for="`${GlobalStore.selectedEnchant.enchantIdentifier}Level${index}_${_uid}`">
                <i v-if="GlobalStore.selectedEnchant.level >= index + 1" class="icon-checked"></i>
                <span v-else class="tier">
                  <span>{{ getUpgradeTier(index + 1) }}</span>
                </span>
                {{ level }}
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="MCDEnchantmentEditorRight">
        <img :src="GlobalStore.selectedEnchant.enchantData.image" :alt="GlobalStore.selectedEnchant.enchantIdentifier" />
        <div class="MCDEnchantmentEditorCost" v-if="!GlobalStore.selectedEnchant.$netherite && GlobalStore.selectedEnchant.level < 3">
          <span>Enchant Cost</span>
          <p><img src="static/img/UI/EnchantmentPoint.png" alt="Enchantment point" /> {{ GlobalStore.selectedEnchant.getInvestmentCostForLevel(GlobalStore.selectedEnchant.level + 1) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';
import TutorialStore from '@/assets/js/tutorial/Store';
import NotificationStore from '@/components/Notification/NotificationStore';

import MCDButton from './Button';
import MCDEnchantSelect from './EnchantSelect';

export default {
  name: 'MCDEnchantmentEditor',
  components: { MCDButton, MCDEnchantSelect },
  data() {
    return { GlobalStore };
  },
  methods: {
    setLevel(e, level) {
      if (e.target.checked) {
        const cost = GlobalStore.selectedEnchant.getInvestmentCostForLevel(level);
        if (GlobalStore.selectedCharacter.enchantmentPoints >= cost) {
          GlobalStore.selectedEnchant.level = level;
        } else {
          NotificationStore.error(this.$t('MCD.EnchantmentEditor.costError', { cost, pluralize: cost >= 1 ? 's' : '' }));
        }
      } else {
        GlobalStore.selectedEnchant.level = level - 1;
      }
      if (GlobalStore.selectedEnchant.level === 3) {
        TutorialStore.setFullfilled('UpgradeEnchantment', true);
      }
      if (GlobalStore.selectedEnchant.level === 0) {
        TutorialStore.setFullfilled('DowngradeEnchantment', true);
      }
    },
    getUpgradeTier(level) {
      return [...Array(level).keys()].reduce((acc) => `${acc}i`, '');
    },
    closeEditor() {
      GlobalStore.selectedEnchant = null;
      TutorialStore.setFullfilled('CloseEditor', true);
    },
  },
};
</script>

<style lang="scss" src="./EnchantmentEditor.scss">
</style>
