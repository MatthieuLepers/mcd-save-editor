export default {
  BurstCrossbow: {
    name: 'BurstCrossbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/BurstCrossbow.png',
    ancientHuntRunes: ['r', 'p'],
    stats: { power: 3.6, speed: 4.2, ammo: 4.1 },
    i18n: {
      'fr-FR': 'Arbalète explosive',
      'en-EN': 'Burst crossbow',
    },
  },
  BurstCrossbow_Unique1: {
    name: 'BurstCrossbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/SoulHunterCrossbow.png',
    ancientHuntRunes: ['o', 'r', 'p'],
    stats: { power: 3.6, speed: 4.2, ammo: 4.1 },
    activeEnchants: ['EnigmaResonatorRanged'],
    i18n: {
      'fr-FR': 'Arbalète de chasseur d\'âmes',
      'en-EN': 'Soul hunter crossbow',
    },
  },
  BurstCrossbow_Unique2: {
    name: 'BurstCrossbow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/CorruptedCrossbow.png',
    ancientHuntRunes: ['c', 'r', 'p'],
    stats: { power: 3.6, speed: 4.2, ammo: 4.1 },
    activeEnchants: ['DynamoRanged'],
    i18n: {
      'fr-FR': 'Arbalète corrompue',
      'en-EN': 'Corrupted crossbow',
    },
  },
};
