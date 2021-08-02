export default {
  VoidBow: {
    dlc: 'Echoing Void',
    name: 'VoidBow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/.png', // TODO
    ancientHuntRunes: ['r'],
    stats: { power: 0, speed: 0, ammo: 0 }, // TODO
    activeEnchants: ['VoidTouchedRanged'],
    i18n: {
      'fr-FR': 'Arc du vide',
      'en-EN': 'Void bow',
    },
  },
  VoidBow_Unique1: {
    dlc: 'Echoing Void',
    name: 'VoidBow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/.png', // TODO
    ancientHuntRunes: ['r', 'a'],
    stats: { power: 0, speed: 0, ammo: 0 }, // TODO
    activeEnchants: ['VoidTouchedRanged', 'FuseShot'],
    i18n: {
      'fr-FR': 'Appel du vide',
      'en-EN': 'Call of the void',
    },
  },
};
