export default {
  HeavyCrossbow: {
    name: 'HeavyCrossbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'img/Items/RangedWeapons/HeavyCrossbow.png',
    ancientHuntRunes: ['i'],
    stats: { power: 14, speed: 1, ammo: 1 },
    i18n: {
      'fr-FR': 'Arbalète lourde',
      'en-EN': 'Heavy crossbow',
    },
  },
  HeavyCrossbow_Unique1: {
    name: 'HeavyCrossbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'img/Items/RangedWeapons/DoomCrossbow.png',
    ancientHuntRunes: ['i'],
    stats: { power: 14, speed: 1, ammo: 1 },
    activeEnchants: ['Punch'],
    i18n: {
      'fr-FR': 'Arbalète de la mort',
      'en-EN': 'Doom crossbow',
    },
  },
  HeavyCrossbow_Unique2: {
    name: 'HeavyCrossbow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'img/Items/RangedWeapons/SlayerCrossbow.png',
    ancientHuntRunes: ['r', 'i'],
    stats: { power: 14, speed: 1, ammo: 1 },
    activeEnchants: ['Ricochet'],
    i18n: {
      'fr-FR': 'Arbalète du tueur',
      'en-EN': 'Slayer crossbow',
    },
  },
};
