import i18n from '@renderer/plugins/i18n';
import Enchantment, { type IEnchantment } from '@renderer/core/classes/Enchantment';
import ArmorProperty, { type IArmorProperty } from '@renderer/core/classes/ArmorProperty';
import RuneList from '@renderer/core/classes/RuneList';
import { ItemTypeEnum } from '@renderer/core/classes/enums/ItemTypeEnum';
import { RarityEnum } from '@renderer/core/classes/enums/RarityEnum';
import { Items } from '@renderer/core/data/Content';
import { globalStore } from '@renderer/core/stores/GlobalStore';

export interface IItemArmorData {
  disabled?: boolean;
  name: string;
  type: 'Armor';
  rarity: Array<string>;
  image: string;
  ancientHuntRunes: Array<string>;
  soulgathering?: boolean;
  armorproperties: Array<string>;
  i18n: Record<string, string>;
}

export interface IItemArtefactData {
  disabled?: boolean;
  name: string;
  type: 'Artefact';
  rarity: Array<string>;
  image: string;
  ancientHuntRunes: Array<string>;
  i18n: Record<string, string>;
}

export interface IItemMeleeData {
  disabled?: boolean;
  name: string;
  type: 'Melee';
  rarity: Array<string>;
  image: string;
  ancientHuntRunes: Array<string>;
  stats: {
    power: number;
    speed: number;
    area: number;
  };
  activeEnchants?: Array<string>;
  soulgathering?: boolean;
  i18n: Record<string, string>;
}

export interface IItemRangedData {
  disabled?: boolean;
  name: string;
  type: 'Ranged';
  rarity: Array<string>;
  image: string;
  ancientHuntRunes: Array<string>;
  stats: {
    power: number;
    speed: number;
    ammo: number;
  };
  activeEnchants?: Array<string>;
  soulgathering?: boolean;
  i18n: Record<string, string>;
}

export type IItemData = IItemArmorData | IItemArtefactData | IItemMeleeData | IItemRangedData;

export interface IItem {
  markedNew?: boolean;
  gifted?: boolean;
  armorproperties?: Array<IArmorProperty>;
  enchantments?: Array<IEnchantment>;
  equipmentSlot?: string;
  inventoryIndex?: number;
  netheriteEnchant?: IEnchantment;
  power: number;
  rarity: string;
  type: string;
  upgraded: boolean;
}

export default class Item {
  public $key: number;

  constructor(public data: IItem) {
    this.$key = 0;

    if (this.data.enchantments && this.data.enchantments.length < 9) {
      [...Array(9 - this.data.enchantments.length).keys()].forEach(() => {
        this.data.enchantments?.push(Enchantment.UNSET.data);
      });
    }
  }

  get itemData(): IItemData {
    if (!Items[this.data.type]) {
      return Items.Unknown;
    }
    return Items[this.data.type];
  }

  get itemType(): string {
    if (this.itemData.type) {
      return this.itemData.type;
    } if (this.data.armorproperties) {
      return ItemTypeEnum.ARMOR;
    } if (this.data.enchantments) {
      const [[type]] = this.enchantments.filter((ench) => ench.enchantData.type && ench.enchantData.type.length === 1).map((ench) => ench.enchantData.type);
      return type;
    }
    return ItemTypeEnum.ARTEFACT;
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
    return this.data.type.toLowerCase().indexOf('crossbow') >= 0 ? 'Crossbow' : 'Bow';
  }

  isEnchanted(): boolean {
    return this.enchantmentPointsInvested > 0;
  }

  isCommon(): boolean {
    return this.data.rarity === RarityEnum.COMMON;
  }

  isRare(): boolean {
    return this.data.rarity === RarityEnum.RARE;
  }

  isUnique(): boolean {
    return this.data.rarity === RarityEnum.UNIQUE;
  }

  isGilded(): boolean {
    return !!this.data.netheriteEnchant && this.data.netheriteEnchant.id !== 'Unset' && this.data.netheriteEnchant.level > 0;
  }

  isMelee(): boolean {
    return this.itemData.type === ItemTypeEnum.MELEE;
  }

  isArmor(): boolean {
    return this.itemData.type === ItemTypeEnum.ARMOR;
  }

  isRanged(): boolean {
    return this.itemData.type === ItemTypeEnum.RANGED;
  }

  isArtefact(): boolean {
    return this.itemData.type === ItemTypeEnum.ARTEFACT;
  }

  get gearType(): string {
    return this.itemData.type;
  }

  set gearType(type: string) {
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
      .reduce((acc: number, enchantment: Enchantment) => acc + enchantment.enchantmentPointsInvested, 0)
    ;
  }

  get chunkedEnchantments(): Array<Array<Enchantment>> {
    const normalize = (enchantments: Array<Enchantment>) => {
      if (enchantments.length === 9) {
        return enchantments;
      }
      return [...enchantments, ...[...Array((9 - enchantments.length) + 1).keys()]
        .map(() => Enchantment.UNSET)
        .reduce((acc, val) => [...acc, val], [] as Array<Enchantment>),
      ];
    };

    return normalize(this.enchantments).reduce((acc, val, i) => {
      const ch = Math.floor(i / 3);
      acc[ch] = ([] as Array<Enchantment>).concat(acc[ch] ?? [], val);
      return acc;
    }, [] as Array<Array<Enchantment>>);
  }

  get enchantments(): Array<Enchantment> {
    return (this.data.enchantments ?? [])
      .map((enchantmentData) => new Enchantment(enchantmentData, this.isGilded()))
    ;
  }

  get netheriteEnchant(): Enchantment {
    const enchant = this.isGilded() ? new Enchantment(this.data.netheriteEnchant!) : Enchantment.UNSET;
    enchant.setNetherite(true);
    return enchant;
  }

  set netheriteEnchant(enchant: Enchantment) {
    this.data.netheriteEnchant = enchant.data;
  }

  get armorproperties(): Array<ArmorProperty> {
    return (this.data.armorproperties ?? [])
      .map((armorPropertyData) => new ArmorProperty(armorPropertyData))
    ;
  }

  get runeList(): RuneList {
    return new RuneList(this.itemData.ancientHuntRunes);
  }

  convertTo(itemData: IItemData) {
    const { type } = this.itemData;
    const itemType = itemData.type;

    this.data.type = itemData.name;
    [this.data.rarity] = itemData.rarity;
    this.data.upgraded = false;

    if (itemType === ItemTypeEnum.ARTEFACT && this.data.enchantments) {
      delete this.data.enchantments;
    }
    if (this.data.netheriteEnchant) {
      delete this.data.netheriteEnchant;
      this.$key += 1;
    }
    if (itemType !== ItemTypeEnum.ARTEFACT) {
      this.data.enchantments = [...Array(9).keys()].map(() => Enchantment.UNSET.data);
    }
    if (itemType !== ItemTypeEnum.ARMOR && type !== ItemTypeEnum.ARMOR) {
      delete this.data.armorproperties;
    }
    if (itemType === ItemTypeEnum.ARMOR) {
      if (itemData.name === 'MysteryArmor') {
        const possibleProperties = itemData.armorproperties.map((prop) => ({ id: prop, rarity: RarityEnum.COMMON }));
        possibleProperties.sort(() => 0.5 - Math.random());
        this.data.armorproperties = possibleProperties.slice(0, 3);
      } else {
        this.data.armorproperties = itemData.armorproperties.map((prop) => ({ id: prop, rarity: RarityEnum.COMMON }));
      }
    }
  }

  equip() {
    const { type } = this.itemData;
    let equipedItem: Item | null = null;

    delete this.data.inventoryIndex;
    if (type !== ItemTypeEnum.ARTEFACT) {
      [equipedItem] = globalStore.state.selectedCharacter!.inventory.gears.filter((item: Item) => item && item.gearType === type);
      this.gearType = type;
    } else {
      const equipedSlots = globalStore.state.selectedCharacter!.inventory.hotbar.map((item: Item) => (item ? item.hotbarSlot : null));
      const [emptySlot] = [1, 2, 3].filter((slot) => equipedSlots.indexOf(slot) < 0);
      const oldSelectedItemValid = globalStore.state.oldSelectedItem && globalStore.state.oldSelectedItem.isArtefact();
      const slot = emptySlot || (oldSelectedItemValid && globalStore.state.oldSelectedItem!.hotbarSlot) || 1;

      [equipedItem] = globalStore.state.selectedCharacter!.inventory.hotbar.filter((item: Item) => item && item.hotbarSlot === slot);
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
    return i18n.global.t(`MCD.Game.Items.${this.itemIdentifier}`);
  }

  clone(): Item {
    return new Item(JSON.parse(JSON.stringify(this.data)));
  }
}
