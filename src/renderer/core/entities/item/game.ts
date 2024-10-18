import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import GameEnchant from '@renderer/core/entities/enchant/game';
import GameArmorProperty from '@renderer/core/entities/armorProperty/game';
import { itemsStore } from '@renderer/core/entities/item/store';
import { Type, Rarity } from '@renderer/core/entities/item/enums';
import type { TItem, IGameItem } from '@renderer/core/entities/item/i';
import RuneList from '@renderer/core/classes/RuneList';
import { globalStore } from '@renderer/core/stores/GlobalStore';
import { chunkArray } from '@renderer/core/utils';

export default class GameItem extends AbstractEntity<IGameItem> {
  public $key: number = 0;

  static get SWORD(): GameItem {
    return new GameItem({
      enchantments: [...Array(9).keys()].map(() => GameEnchant.UNSET.data),
      power: 1,
      rarity: Rarity.COMMON,
      type: 'Sword',
      upgraded: false,
    });
  }

  static get ARMOR(): GameItem {
    return new GameItem({
      armorproperties: [
        { id: 'IncreasedArrowBundleSize', rarity: Rarity.COMMON },
        { id: 'RangedDamageBoost', rarity: Rarity.COMMON },
      ],
      enchantments: [...Array(9).keys()].map(() => GameEnchant.UNSET.data),
      power: 1,
      rarity: Rarity.COMMON,
      type: 'ArchersStrappings',
      upgraded: false,
    });
  }

  static get BOW(): GameItem {
    return new GameItem({
      enchantments: [...Array(9).keys()].map(() => GameEnchant.UNSET.data),
      power: 1,
      rarity: Rarity.COMMON,
      type: 'Bow',
      upgraded: false,
    });
  }

  static get ARTEFACT(): GameItem {
    return new GameItem({
      power: 1,
      rarity: Rarity.COMMON,
      type: 'FireworksArrowItem',
      upgraded: false,
    });
  }

  constructor(data: IGameItem) {
    super(data, ['enchantments', 'netheriteEnchant', 'armorproperties']);
    if (this.data.enchantments && this.data.enchantments.length < 9) {
      [...Array(9 - this.data.enchantments.length).keys()].forEach(() => {
        this.data.enchantments?.push(GameEnchant.UNSET.data);
      });
    }
  }

  get itemData() {
    if (!itemsStore.items.value[this.data.type]) {
      return itemsStore.items.value.Unknown;
    }
    return itemsStore.items.value[this.data.type];
  }

  get itemType(): string {
    if (this.itemData.type) {
      return this.itemData.type;
    } if (this.data.armorproperties) {
      return Type.ARMOR;
    } if (this.data.enchantments) {
      const [[type]] = this.enchantments.filter((ench) => ench.enchantData.type && ench.enchantData.type.length === 1).map((ench) => ench.enchantData.type);
      return type;
    }
    return Type.ARTEFACT;
  }

  get itemIdentifier(): string {
    if (this.itemData.type) {
      return this.data.type;
    }
    return 'Unknown';
  }

  isGear(): boolean {
    return !!this.data.equipmentSlot && this.data.equipmentSlot.indexOf('Gear') >= 0;
  }

  isHotbar(): boolean {
    return !!this.data.equipmentSlot && this.data.equipmentSlot.indexOf('Hotbar') >= 0;
  }

  isEquipped(): boolean {
    return this.isGear() || this.isHotbar();
  }

  isStored(): boolean {
    return globalStore.state.selectedCharacter!.storageChest.contains(this);
  }

  get weaponType(): 'Crossbow' | 'Bow' {
    return this.data.type.toLowerCase().indexOf('crossbow') >= 0
      ? 'Crossbow'
      : 'Bow'
    ;
  }

  isEnchanted(): boolean {
    return this.enchantmentPointsInvested > 0;
  }

  isCommon(): boolean {
    return this.data.rarity === Rarity.COMMON;
  }

  isRare(): boolean {
    return this.data.rarity === Rarity.RARE;
  }

  isUnique(): boolean {
    return this.data.rarity === Rarity.UNIQUE;
  }

  isGilded(): boolean {
    return !!this.data.netheriteEnchant
      && this.data.netheriteEnchant.id !== 'Unset'
      && this.data.netheriteEnchant.level > 0
    ;
  }

  isMelee(): boolean {
    return this.itemData.type === Type.MELEE;
  }

  isArmor(): boolean {
    return this.itemData.type === Type.ARMOR;
  }

  isRanged(): boolean {
    return this.itemData.type === Type.RANGED;
  }

  isArtefact(): boolean {
    return this.itemData.type === Type.ARTEFACT;
  }

  get gearType(): `${Type}` {
    return this.itemData.type;
  }

  set gearType(type: `${Type}`) {
    this.data.equipmentSlot = `${type}Gear`;
  }

  get hotbarSlot(): number {
    return parseInt(this.data.equipmentSlot?.replace('HotbarSlot', '') ?? '', 10);
  }

  set hotbarSlot(slot: number) {
    this.data.equipmentSlot = `HotbarSlot${slot}`;
  }

  get powerLevel(): number {
    return Math.floor((this.data.power - 1) * 10) + 1;
  }

  set powerLevel(powerLevel: number) {
    const currentPower = this.data.power;
    const newPower = ((powerLevel - 1) / 10) + 1;
    this.data.power = ((newPower * 10) + ((currentPower * 10) % 1)) / 10;
  }

  get enchantmentPointsInvested(): number {
    return this.enchantments
      .reduce((acc: number, enchantment: GameEnchant) => acc + enchantment.enchantmentPointsInvested, 0)
    ;
  }

  get chunkedEnchantments(): Array<Array<GameEnchant>> {
    const normalize = (enchantments: Array<GameEnchant>) => {
      if (enchantments.length === 9) {
        return enchantments;
      }
      return [...enchantments, ...[...Array((9 - enchantments.length) + 1).keys()]
        .map(() => GameEnchant.UNSET)
        .reduce((acc, val) => [...acc, val], [] as Array<GameEnchant>),
      ];
    };

    return chunkArray(normalize(this.enchantments), 3);
  }

  get enchantments(): Array<GameEnchant> {
    return (this.data.enchantments ?? [])
      .map((enchantmentData) => new GameEnchant(enchantmentData, this.isGilded()))
    ;
  }

  get netheriteEnchant(): GameEnchant {
    const enchant = this.isGilded() ? new GameEnchant(this.data.netheriteEnchant!) : GameEnchant.UNSET;
    enchant.setNetherite(true);
    return enchant;
  }

  set netheriteEnchant(enchant: GameEnchant) {
    this.data.netheriteEnchant = enchant.data;
  }

  get armorproperties(): Array<GameArmorProperty> {
    return (this.data.armorproperties ?? [])
      .map((armorPropertyData) => new GameArmorProperty(armorPropertyData))
    ;
  }

  get runeList(): RuneList {
    return new RuneList(this.itemData.ancientHuntRunes);
  }

  convertTo(itemData: TItem) {
    const { type } = this.itemData;
    const itemType = itemData.type;

    this.data.type = itemData.id;
    [this.data.rarity] = itemData.rarity;
    this.data.upgraded = false;

    if (itemType === Type.ARTEFACT && this.data.enchantments) {
      delete this.data.enchantments;
    }
    if (this.data.netheriteEnchant) {
      delete this.data.netheriteEnchant;
      this.$key += 1;
    }
    if (itemType !== Type.ARTEFACT) {
      this.data.enchantments = [...Array(9).keys()].map(() => GameEnchant.UNSET.data);
    }
    if (itemType !== Type.ARMOR && type !== Type.ARMOR) {
      delete this.data.armorproperties;
    }
    if (itemType === Type.ARMOR) {
      if (itemData.id === 'MysteryArmor') {
        const possibleProperties = itemData.armorproperties.map((prop) => ({ id: prop, rarity: Rarity.COMMON }));
        possibleProperties.sort(() => 0.5 - Math.random());
        this.data.armorproperties = possibleProperties.slice(0, 3);
      } else {
        this.data.armorproperties = itemData.armorproperties.map((prop) => ({ id: prop, rarity: Rarity.COMMON }));
      }
    }
  }

  equip() {
    const { type } = this.itemData;
    let equipedItem: GameItem | null = null;

    delete this.data.inventoryIndex;
    if (type !== Type.ARTEFACT) {
      [equipedItem] = globalStore.state.selectedCharacter!.inventory.gears.filter((item: GameItem) => item && item.gearType === type);
      this.gearType = type;
    } else {
      const equipedSlots = globalStore.state.selectedCharacter!.inventory.hotbar.map((item: GameItem) => (item ? item.hotbarSlot : null));
      const [emptySlot] = [1, 2, 3].filter((slot) => equipedSlots.indexOf(slot) < 0);
      const oldSelectedItemValid = globalStore.state.oldSelectedItem && globalStore.state.oldSelectedItem.isArtefact();
      const slot = emptySlot || (oldSelectedItemValid && globalStore.state.oldSelectedItem!.hotbarSlot) || 1;

      [equipedItem] = globalStore.state.selectedCharacter!.inventory.hotbar.filter((item: GameItem) => item && item.hotbarSlot === slot);
      this.hotbarSlot = slot;
    }
    if (equipedItem) {
      equipedItem.unequip();
    } else {
      globalStore.state.selectedCharacter!.inventory.checkIntegrity();
    }
  }

  unequip() {
    this.data.inventoryIndex = 0;
    delete this.data.equipmentSlot;

    globalStore.state.selectedCharacter!.inventory.checkIntegrity();
  }

  toString(): string {
    return this.itemData.getI18n('name');
  }

  clone(): GameItem {
    return new GameItem(JSON.parse(JSON.stringify(this.data)));
  }
}
