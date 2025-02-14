import type { ErrorObject } from 'ajv';

import i18n from '@renderer/plugins/i18n';
import GameEnchant from '@renderer/core/entities/enchant/game';
import { enchantsStore } from '@renderer/core/entities/enchant/store';
import type { IGameEnchant } from '@renderer/core/entities/enchant/i';
import { Rarity } from '@renderer/core/entities/item/enums';
import { itemsStore } from '@renderer/core/entities/item/store';
import type { IGameItem } from '@renderer/core/entities/item/i';
import type ValidationErrorReport from '@renderer/core/validators/ValidationErrorReport';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { api } from '@renderer/core/api';

export interface FixupAction {
  label: string;
  apply: () => void;
}

export default class Fixup {
  constructor(public validationErrorReport: ValidationErrorReport) {
  }

  get item(): IGameItem {
    return this.validationErrorReport.item;
  }

  get error(): ErrorObject {
    return this.validationErrorReport.error;
  }

  get index(): number {
    return parseInt(this.error.dataPath.replace(/.*\[([0-9])\].*/, '$1'), 10);
  }

  get methodName(): string {
    const dataPathCamelCase = this.error.dataPath
      .replace(/(.*)\[[0-9]\](.*)/, '$1$2')
      .split('.')
      .map((part) => `${part.substring(0, 1).toUpperCase()}${part.substring(1)}`)
      .join('')
    ;
    const keywordCamelCase = `${this.error.keyword.substring(0, 1).toUpperCase()}${this.error.keyword.substring(1)}`;

    return `getFixup${dataPathCamelCase}${keywordCamelCase}`;
  }

  deleteItem() {
    if (globalStore.state.selectedCharacter) {
      globalStore.state.selectedCharacter.data.items.splice(this.validationErrorReport.itemIndex, 1);
      globalStore.state.selectedCharacter.softReload();
    }
  }

  getInvestedPoints(enchant: IGameEnchant): number {
    const enchantData = enchantsStore.state.enchants[enchant.id];
    let investedPointResult = 0;
    if (enchantData) {
      investedPointResult = enchant.level * 3 + (enchantData.tier === 'Powerful' ? 3 : 0);
    }

    return investedPointResult;
  }

  getFixup(): Array<FixupAction> {
    if (typeof this[this.methodName] === 'function') {
      return this[this.methodName]();
    }
    throw new Error(`Fixup method "${this.methodName}" is not implemented`);
  }

  getFixupGiftedType(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.giftedType1'),
        apply: () => {
          delete this.item.gifted;
        },
      },
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.giftedType2'),
        apply: () => {
          this.item.gifted = true;
        },
      },
    ];
  }

  getFixupGiftedConst(): Array<FixupAction> {
    return this.getFixupGiftedType();
  }

  getFixupMarkedNewType(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.markedNewType1'),
        apply: () => {
          delete this.item.markedNew;
        },
      },
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.markedNewType2'),
        apply: () => {
          this.item.markedNew = true;
        },
      },
    ];
  }

  getFixupMarkedNewConst(): Array<FixupAction> {
    return this.getFixupMarkedNewType();
  }

  getFixupEquipmentSlotRequired(): Array<FixupAction> {
    return this.getFixupInventoryIndexMinimum();
  }

  getFixupInventoryIndexRequired(): Array<FixupAction> {
    return this.getFixupInventoryIndexMinimum();
  }

  getFixupInventoryIndexMinimum(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.inventoryIndexMinimum'),
        apply: () => {
          this.item.inventoryIndex = 0;
        },
      },
    ];
  }

  getFixupInventoryIndexMaximum(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.inventoryIndexMaximum'),
        apply: () => {
          this.item.inventoryIndex = 179;
        },
      },
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.deleteItem'),
        apply: () => {
          this.deleteItem();
        },
      },
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.createIssueOnGithub'),
        apply: () => {
          api.invoke('openGithubLink', 'https://github.com/MatthieuLepers/mcd-save-editor/issues');
        },
      },
    ];
  }

  getFixupEnchantmentsRequired(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsRequired'),
        apply: () => {
          this.item.enchantments = [...Array(9).keys()].map(() => GameEnchant.UNSET.data);
        },
      },
    ];
  }

  getFixupEnchantmentsMinItems(): Array<FixupAction> {
    const missing = 9 - this.item.enchantments!.length;
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsMinItems', [missing]),
        apply: () => {
          this.item.enchantments!.push(...[...Array(missing).keys()].map(() => GameEnchant.UNSET.data));
        },
      },
    ];
  }

  getFixupEnchantmentsMaxItems(): Array<FixupAction> {
    const excess = this.item.enchantments!.length - 9;
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsMinItems', [excess]),
        apply: () => {
          this.item.enchantments!.splice(9, excess);
        },
      },
    ];
  }

  getFixupEnchantmentsIdRequired(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsIdRequired'),
        apply: () => {
          this.item.enchantments![this.index].id = 'Unset';
          this.item.enchantments![this.index].investedPoints = 0;
          this.item.enchantments![this.index].level = 0;
        },
      },
    ];
  }

  getFixupEnchantmentsInvestedPointsRequired(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsInvestedPointsRequired'),
        apply: () => {
          this.item.enchantments![this.index].investedPoints = 0;
        },
      },
    ];
  }

  getFixupEnchantmentsLevelRequired(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsLevelRequired'),
        apply: () => {
          this.item.enchantments![this.index].level = 0;
        },
      },
    ];
  }

  getFixupEnchantmentsIdEnum(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsIdEnum'),
        apply: () => {
          this.item.enchantments![this.index].id = 'Unset';
          this.item.enchantments![this.index].investedPoints = 0;
          this.item.enchantments![this.index].level = 0;
        },
      },
    ];
  }

  getFixupEnchantmentsInvestedPointsMinimum(): Array<FixupAction> {
    const investedPointsResult = this.getInvestedPoints(this.item.enchantments![this.index]);
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsInvestedPointsMinimum', [investedPointsResult]),
        apply: () => {
          this.item.enchantments![this.index].investedPoints = investedPointsResult;
        },
      },
    ];
  }

  getFixupEnchantmentsInvestedPointsMaximum(): Array<FixupAction> {
    return this.getFixupEnchantmentsInvestedPointsMinimum();
  }

  getFixupEnchantmentsLevelMinimum(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsLevelMinimum'),
        apply: () => {
          this.item.enchantments![this.index].level = 0;
          this.item.enchantments![this.index].investedPoints = 0;
        },
      },
    ];
  }

  getFixupEnchantmentsLevelMaximum(): Array<FixupAction> {
    return [
      ...this.getFixupEnchantmentsLevelMinimum(),
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsLevelMaximum'),
        apply: () => {
          this.item.enchantments![this.index].level = 3;
          this.item.enchantments![this.index].investedPoints = this.getInvestedPoints(this.item.enchantments![this.index]);
        },
      },
    ];
  }

  getFixupEnchantmentsChunksLevelConsistency(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsChunksLevelConsistency'),
        apply: () => {
          this.item.enchantments![this.index * 3].level = 0;
          this.item.enchantments![this.index * 3].investedPoints = 0;
          this.item.enchantments![this.index * 3 + 1].level = 0;
          this.item.enchantments![this.index * 3 + 1].investedPoints = 0;
          this.item.enchantments![this.index * 3 + 2].level = 0;
          this.item.enchantments![this.index * 3 + 2].investedPoints = 0;
        },
      },
    ];
  }

  getFixupEnchantmentsChunksUniqueChunkEnchant(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsChunksUniqueChunkEnchant'),
        apply: () => {
          const chunk = this.item.enchantments!.slice(this.index, this.index + 3);
          const lookup = Object.groupBy(chunk, (e) => e.id);
          chunk
            .filter((e) => lookup[e.id]!.length > 1)
            .slice(1)
            .forEach((ench) => {
              ench.id = 'Unset';
              ench.investedPoints = 0;
              ench.level = 0;
            })
          ;
        },
      },
    ];
  }

  getFixupEnchantmentsForbbiden(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.enchantmentsForbbiden'),
        apply: () => {
          delete this.item.enchantments;
        },
      },
    ];
  }

  getFixupEquipmentSlotType(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.equipmentSlotType'),
        apply: () => {
          delete this.item.equipmentSlot;
          this.item.inventoryIndex = 0;
        },
      },
    ];
  }

  getFixupEquipmentSlotEnum(): Array<FixupAction> {
    return this.getFixupEquipmentSlotType();
  }

  getFixupNetheriteEnchantType(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.netheriteEnchantType'),
        apply: () => {
          delete this.item.netheriteEnchant;
        },
      },
    ];
  }

  getFixupNetheriteEnchantIdRequired(): Array<FixupAction> {
    return this.getFixupNetheriteEnchantType();
  }

  getFixupNetheriteEnchantInvestedPointsRequired(): Array<FixupAction> {
    const investedPointResult = this.getInvestedPoints(this.item.netheriteEnchant!);
    return [
      ...this.getFixupNetheriteEnchantType(),
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.netheriteEnchantInvestedPointsRequired', [investedPointResult]),
        apply: () => {
          this.item.netheriteEnchant!.investedPoints = investedPointResult;
        },
      },
    ];
  }

  getFixupNetheriteEnchantLevelRequired(): Array<FixupAction> {
    return [
      ...this.getFixupNetheriteEnchantType(),
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.netheriteEnchantLevelRequired1'),
        apply: () => {
          this.item.netheriteEnchant!.level = 1;
          this.item.netheriteEnchant!.investedPoints = this.getInvestedPoints(this.item.netheriteEnchant!);
        },
      },
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.netheriteEnchantLevelRequired2'),
        apply: () => {
          this.item.netheriteEnchant!.level = 2;
          this.item.netheriteEnchant!.investedPoints = this.getInvestedPoints(this.item.netheriteEnchant!);
        },
      },
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.netheriteEnchantLevelRequired3'),
        apply: () => {
          this.item.netheriteEnchant!.level = 3;
          this.item.netheriteEnchant!.investedPoints = this.getInvestedPoints(this.item.netheriteEnchant!);
        },
      },
    ];
  }

  getFixupNetheriteEnchantLevelMinimum(): Array<FixupAction> {
    return this.getFixupNetheriteEnchantLevelRequired();
  }

  getFixupNetheriteEnchantLevelMaximum(): Array<FixupAction> {
    return this.getFixupNetheriteEnchantLevelRequired();
  }

  getFixupPowerRequired(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.powerRequired'),
        apply: () => {
          this.item.power = 1;
        },
      },
    ];
  }

  getFixupPowerType(): Array<FixupAction> {
    return this.getFixupPowerRequired();
  }

  getFixupRarityRequired(): Array<FixupAction> {
    const itemData = itemsStore.items.value[this.item.type];
    const result: Array<FixupAction> = [];

    if (itemData) {
      result.push({
        label: i18n.global.t('MCD.DataCorruption.Fixup.rarityRequired', [itemData.rarity[0]]),
        apply: () => {
          [this.item.rarity] = itemData.rarity;
        },
      });
    } else {
      result.push({
        label: i18n.global.t('MCD.DataCorruption.Fixup.deleteItem'),
        apply: () => {
          this.deleteItem();
        },
      }, {
        label: i18n.global.t('MCD.DataCorruption.Fixup.createIssueOnGithub'),
        apply: () => {
          api.invoke('openGithubLink', 'https://github.com/MatthieuLepers/mcd-save-editor/issues');
        },
      });
    }

    return result;
  }

  getFixupRarityEnum(): Array<FixupAction> {
    return this.getFixupRarityRequired();
  }

  getFixupTypeRequired(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.deleteItem'),
        apply: () => {
          this.deleteItem();
        },
      },
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.createIssueOnGithub'),
        apply: () => {
          api.invoke('openGithubLink', 'https://github.com/MatthieuLepers/mcd-save-editor/issues');
        },
      },
    ];
  }

  getFixupTypeEnum(): Array<FixupAction> {
    return this.getFixupTypeRequired();
  }

  getFixupUpgradedRequired(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.upgradedRequired'),
        apply: () => {
          this.item.upgraded = false;
        },
      },
    ];
  }

  getFixupUpgradedType(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.upgradedType'),
        apply: () => {
          this.item.upgraded = false;
        },
      },
    ];
  }

  getFixupUpgradedConst(): Array<FixupAction> {
    return this.getFixupUpgradedType();
  }

  getFixupArmorpropertiesMinItems(): Array<FixupAction> {
    const itemData = itemsStore.state.armors[this.item.type];
    const result: Array<FixupAction> = [{
      label: i18n.global.t('MCD.DataCorruption.Fixup.armorpropertiesMinItems1'),
      apply: () => {
        delete this.item.armorproperties;
      },
    }];

    if (itemData) {
      result.push({
        label: i18n.global.t('MCD.DataCorruption.Fixup.armorpropertiesMinItems2'),
        apply: () => {
          this.item.armorproperties = itemData.armorproperties.map((prop) => prop.toGameData());
        },
      });
    } else {
      result.push({
        label: i18n.global.t('MCD.DataCorruption.Fixup.deleteItem'),
        apply: () => {
          this.deleteItem();
        },
      }, {
        label: i18n.global.t('MCD.DataCorruption.Fixup.createIssueOnGithub'),
        apply: () => {
          api.invoke('openGithubLink', 'https://github.com/MatthieuLepers/mcd-save-editor/issues');
        },
      });
    }

    return result;
  }

  getFixupArmorpropertiesMaxItems(): Array<FixupAction> {
    const itemData = itemsStore.state.armors[this.item.type];
    const result: Array<FixupAction> = [];

    if (itemData) {
      result.push({
        label: i18n.global.t('MCD.DataCorruption.Fixup.armorpropertiesMinItems2'),
        apply: () => {
          this.item.armorproperties = itemData.armorproperties.map((prop) => prop.toGameData());
        },
      });
    } else {
      result.push({
        label: i18n.global.t('MCD.DataCorruption.Fixup.deleteItem'),
        apply: () => {
          this.deleteItem();
        },
      }, {
        label: i18n.global.t('MCD.DataCorruption.Fixup.createIssueOnGithub'),
        apply: () => {
          api.invoke('openGithubLink', 'https://github.com/MatthieuLepers/mcd-save-editor/issues');
        },
      });
    }

    return result;
  }

  getFixupArmorpropertiesForbbiden(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.armorpropertiesMinItems1'),
        apply: () => {
          delete this.item.armorproperties;
        },
      },
    ];
  }

  getFixupArmorpropertiesIdRequired(): Array<FixupAction> {
    return this.getFixupArmorpropertiesMaxItems();
  }

  getFixupArmorpropertiesIdType(): Array<FixupAction> {
    return this.getFixupArmorpropertiesMaxItems();
  }

  getFixupArmorpropertiesIdEnum(): Array<FixupAction> {
    return this.getFixupArmorpropertiesMaxItems();
  }

  getFixupArmorpropertiesRarityRequired(): Array<FixupAction> {
    return this.getFixupArmorpropertiesMaxItems();
  }

  getFixupArmorpropertiesRarityType(): Array<FixupAction> {
    return this.getFixupArmorpropertiesMaxItems();
  }

  getFixupArmorpropertiesUniqueItems(): Array<FixupAction> {
    return this.getFixupArmorpropertiesMaxItems();
  }

  getFixupArmorpropertiesRarityEnum(): Array<FixupAction> {
    return [
      {
        label: i18n.global.t('MCD.DataCorruption.Fixup.armorpropertiesRarityEnum'),
        apply: () => {
          this.item.armorproperties![this.index].rarity = Rarity.COMMON;
        },
      },
    ];
  }
}
