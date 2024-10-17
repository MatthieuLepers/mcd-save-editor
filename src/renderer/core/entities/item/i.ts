import type { IArmor } from '@renderer/core/entities/armor/i';
import type { IArtefact } from '@renderer/core/entities/artefact/i';
import type { IWeapon } from '@renderer/core/entities/weapon/i';
import type { IGameEnchant } from '@renderer/core/entities/enchant/i';
import type { IGameArmorProperty } from '@renderer/core/entities/armorProperty/i';

export type TItem = IArmor | IArtefact | IWeapon;

export interface IGameItem {
  markedNew?: boolean;
  gifted?: boolean;
  armorproperties?: Array<IGameArmorProperty>;
  enchantments?: Array<IGameEnchant>;
  equipmentSlot?: string;
  inventoryIndex?: number;
  netheriteEnchant?: IGameEnchant;
  power: number;
  rarity: string;
  type: string;
  upgraded: boolean;
}
