<template>
  <div
    v-show="!!globalStore.state.selectedEnchant && !!globalStore.state.selectedEnchant.enchantIdentifier"
    class="MCDEnchantmentEditor"
  >
    <div
      v-if="!!globalStore.state.selectedEnchant && !!globalStore.state.selectedEnchant.enchantIdentifier"
      class="MCDEnchantmentEditorContainer"
    >
      <h2>
        <MCDEnchantSelect
          v-model="globalStore.state.selectedEnchant"
          :unallowedEnchants="globalStore.actions.getUnallowedEnchantForChunk()"
        />
        <MCDButton icon="close" @click="actions.closeEditor" variant="dark" />
      </h2>
      <div class="MCDEnchantmentEditorLeft">
        <p>
          {{ globalStore.state.selectedEnchant.enchantData.getI18n('desc') }}
        </p>
        <div class="TierContainer" v-if="globalStore.state.selectedEnchant.enchantIdentifier !== 'Unset'">
          <h3>{{ t('MCD.EnchantmentEditor.upgradeTiers') }}</h3>
          <ul>
            <li
              v-for="(level, index) in globalStore.state.selectedEnchant.enchantData.getI18n('level')"
              :key="`${globalStore.state.selectedEnchant.enchantIdentifier}lvl${index}`"
              :class="{ checked: globalStore.state.selectedEnchant.level >= index + 1 }"
            >
              <input
                :disabled="globalStore.state.selectedEnchant.level < index"
                :checked="globalStore.state.selectedEnchant.level >= index + 1"
                :id="`${globalStore.state.selectedEnchant.enchantIdentifier}Level${index}_${$uid}`"
                type="checkbox"
                :name="`levelGroup${$uid}`"
                @click.stop="actions.setLevel($event, index + 1)"
              />
              <label :for="`${globalStore.state.selectedEnchant.enchantIdentifier}Level${index}_${$uid}`">
                <i v-if="globalStore.state.selectedEnchant.level >= index + 1" class="icon-checked"></i>
                <span v-else class="tier">
                  <span>{{ actions.getUpgradeTier(index + 1) }}</span>
                </span>
                {{ level }}
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="MCDEnchantmentEditorRight">
        <img :src="globalStore.state.selectedEnchant.enchantData.image" :alt="globalStore.state.selectedEnchant.enchantIdentifier" />
        <div class="MCDEnchantmentEditorCost" v-if="!globalStore.state.selectedEnchant.netherite && globalStore.state.selectedEnchant.level < 3">
          <span>Enchant Cost</span>
          <p><img :src="image('img/UI/EnchantmentPoint.png')" alt="Enchantment point" /> {{ globalStore.state.selectedEnchant.getInvestmentCostForLevel(globalStore.state.selectedEnchant.level + 1) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';

import MCDButton from '@renderer/components/MCD/Button.vue';
import MCDEnchantSelect from '@renderer/components/MCD/EnchantSelect.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { tutorialStore } from '@renderer/core/tutorial/Store';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import { image } from '@renderer/core/utils';

defineOptions({ name: 'MCDEnchantmentEditor' });

const $uid = ref(getCurrentInstance().uid);
const { t } = useI18n();

const actions = {
  setLevel(e, level) {
    if (e.target.checked) {
      const cost = globalStore.state.selectedEnchant.getInvestmentCostForLevel(level);
      if (globalStore.state.selectedCharacter.enchantmentPoints >= cost) {
        globalStore.state.selectedEnchant.level = level;
      } else {
        notificationStore.actions.error(t('MCD.EnchantmentEditor.costError', { cost, pluralize: cost >= 1 ? 's' : '' }));
      }
    } else {
      globalStore.state.selectedEnchant.level = level - 1;
    }
    if (globalStore.state.selectedEnchant.level === 3) {
      tutorialStore.actions.setFullfilled('UpgradeEnchantment', true);
    }
    if (globalStore.state.selectedEnchant.level === 0) {
      tutorialStore.actions.setFullfilled('DowngradeEnchantment', true);
    }
  },
  getUpgradeTier(level) {
    return [...Array(level).keys()].reduce((acc) => `${acc}i`, '');
  },
  closeEditor() {
    globalStore.setters.setEnchant(null);
    tutorialStore.actions.setFullfilled('CloseEditor', true);
  },
};
</script>

<style lang="scss" src="./EnchantmentEditor.scss">
</style>
