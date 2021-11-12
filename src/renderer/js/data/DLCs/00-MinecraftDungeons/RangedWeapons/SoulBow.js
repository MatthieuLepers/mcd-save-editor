export default {
  SoulBow: {
    name: 'SoulBow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/SoulBow.png',
    ancientHuntRunes: ['o'],
    stats: { power: 4.18, speed: 3.41, ammo: 5.33 },
    soulgathering: true,
    i18n: {
      'fr-FR': 'Arc des âmes',
      'en-EN': 'Soul bow',
    },
  },
  SoulBow_Unique1: {
    name: 'SoulBow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/NocturnalBow.png',
    ancientHuntRunes: ['c', 'o'],
    stats: { power: 4.18, speed: 3.41, ammo: 5.33 },
    activeEnchants: ['TempoTheft'],
    soulgathering: true,
    i18n: {
      'fr-FR': 'Arc nocturne',
      'en-EN': 'Nocturnal bow',
    },
  },
  SoulBow_Unique2: {
    name: 'SoulBow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/BowOfLostSouls.png',
    ancientHuntRunes: ['o', 'r'],
    stats: { power: 4.18, speed: 3.41, ammo: 5.33 },
    activeEnchants: ['Multishot'],
    soulgathering: true,
    i18n: {
      'fr-FR': 'Arc des âmes perdues',
      'en-EN': 'Bow of lost souls',
    },
  },
  SoulBow_Winter1: {
    event: 'Chills and Thrills',
    name: 'SoulBow_Winter1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/ShiveringBow.png',
    ancientHuntRunes: ['o', 't'],
    stats: { power: 4.18, speed: 3.41, ammo: 5.33 },
    activeEnchants: ['TempoTheft'],
    soulgathering: true,
    i18n: {
      'fr-FR': 'Arc frissonnant',
      'en-EN': 'Shivering bow',
    },
  },
};