export default {
  VoidBow: {
    dlc: 'Echoing Void',
    name: 'VoidBow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/VoidBow.png',
    ancientHuntRunes: ['r'],
    stats: { power: 5.1, speed: 2.63, ammo: 4.1 },
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
    image: 'static/img/Items/RangedWeapons/CallOfTheVoid.png',
    ancientHuntRunes: ['r', 'a'],
    stats: { power: 5.1, speed: 2.63, ammo: 4.1 },
    activeEnchants: ['VoidTouchedRanged', 'FuseShot'],
    i18n: {
      'fr-FR': 'Appel du vide',
      'en-EN': 'Call of the void',
    },
  },
};
