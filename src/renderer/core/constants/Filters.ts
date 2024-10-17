import type Item from '@renderer/core/entities/item/game';

export default {
  ALL: {
    name: 'all',
    icon: 'all',
    filterByItem: () => true,
  },
  MELEE: {
    name: 'melee',
    icon: 'melee',
    filterByItem: (item: Item) => item.isMelee(),
  },
  ARMOR: {
    name: 'armor',
    icon: 'helm',
    filterByItem: (item: Item) => item.isArmor(),
  },
  RANGED: {
    name: 'ranged',
    icon: 'ranged',
    filterByItem: (item: Item) => item.isRanged(),
  },
  ARTEFACT: {
    name: 'artefact',
    icon: 'artefact',
    filterByItem: (item: Item) => item.isArtefact(),
  },
  ENCHANTED: {
    name: 'enchanted',
    icon: 'enchanted',
    filterByItem: (item: Item) => item.isEnchanted(),
  },
};
