/**
 * @author Matthieu LEPERS
 * @version 1.0.0
 */
export default {
  ALL: {
    name: 'all',
    icon: 'all',
    filterByItem: () => true,
  },
  MELEE: {
    name: 'melee',
    icon: 'melee',
    filterByItem: item => item.isMelee(),
  },
  ARMOR: {
    name: 'armor',
    icon: 'helm',
    filterByItem: item => item.isArmor(),
  },
  RANGED: {
    name: 'ranged',
    icon: 'ranged',
    filterByItem: item => item.isRanged(),
  },
  ARTEFACT: {
    name: 'artefact',
    icon: 'artefact',
    filterByItem: item => item.isArtefact(),
  },
  ENCHANTED: {
    name: 'enchanted',
    icon: 'enchanted',
    filterByItem: item => item.isEnchanted(),
  },
};
