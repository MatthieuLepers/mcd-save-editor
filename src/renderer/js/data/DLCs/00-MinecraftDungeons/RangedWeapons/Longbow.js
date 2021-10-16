export default {
  Longbow: {
    name: 'Longbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/Longbow.png',
    ancientHuntRunes: ['r'],
    stats: { power: 5.33, speed: 3.41, ammo: 4.1 },
    i18n: {
      'fr-FR': 'Arc long',
      'en-EN': 'Longbow',
    },
  },
  Longbow_Unique1: {
    name: 'Longbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/GuardianBow.png',
    ancientHuntRunes: ['s', 'r'],
    stats: { power: 5.33, speed: 3.41, ammo: 4.1 },
    activeEnchants: ['Supercharge'],
    i18n: {
      'fr-FR': 'Arc de garde',
      'en-EN': 'Guardian bow',
    },
  },
  Longbow_Unique2: {
    name: 'Longbow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/RedSnake.png',
    ancientHuntRunes: ['r', 'a'],
    stats: { power: 5.33, speed: 3.41, ammo: 4.1 },
    activeEnchants: ['FuseShot'],
    i18n: {
      'fr-FR': 'Serpent rouge',
      'en-EN': 'Red snake',
    },
  },
};
