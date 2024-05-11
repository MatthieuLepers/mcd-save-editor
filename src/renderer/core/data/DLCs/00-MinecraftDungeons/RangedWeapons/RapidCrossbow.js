export default {
  RapidCrossbow: {
    name: 'RapidCrossbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'img/Items/RangedWeapons/RapidCrossbow.png',
    ancientHuntRunes: ['r'],
    stats: { power: 1, speed: 9.28, ammo: 11.52 },
    i18n: {
      'fr-FR': 'Arbalète rapide',
      'en-EN': 'Rapid crossbow',
    },
  },
  RapidCrossbow_Unique1: {
    name: 'RapidCrossbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'img/Items/RangedWeapons/ButterflyCrossbow.png',
    ancientHuntRunes: ['s', 'r'],
    stats: { power: 1, speed: 9.28, ammo: 11.52 },
    activeEnchants: ['BonusShot'],
    i18n: {
      'fr-FR': 'Arbalète papillon',
      'en-EN': 'Butterfly crossbow',
    },
  },
  RapidCrossbow_Unique2: {
    name: 'RapidCrossbow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'img/Items/RangedWeapons/AutoCrossbow.png',
    ancientHuntRunes: ['c', 'r'],
    stats: { power: 1, speed: 9.28, ammo: 11.52 },
    activeEnchants: ['Accelerating'],
    i18n: {
      'fr-FR': 'Arbalète automatique',
      'en-EN': 'Auto crossbow',
    },
  },
};
