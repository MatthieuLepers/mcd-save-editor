export default {
  SoulScythe: {
    name: 'SoulScythe',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/SoulScythe.png',
    ancientHuntRunes: ['o'],
    stats: { power: 7.5, speed: 1.8, area: 9 },
    soulgathering: true,
    i18n: {
      'fr-FR': 'Faux des âmes',
      'en-EN': 'Soul scythe',
    },
  },
  SoulScythe_Unique1: {
    name: 'SoulScythe_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/JailorsScythe.png',
    ancientHuntRunes: ['o', 'a'],
    stats: { power: 7.5, speed: 1.8, area: 9 },
    soulgathering: true,
    i18n: {
      'fr-FR': 'Faux du geôlier',
      'en-EN': 'Jailor\'s scythe',
    },
  },
  SoulScythe_Unique2: {
    name: 'SoulScythe_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/FrostScythe.png',
    ancientHuntRunes: ['o', 's'],
    stats: { power: 7.5, speed: 1.8, area: 9 },
    activeEnchants: ['Freezing'],
    soulgathering: true,
    i18n: {
      'fr-FR': 'Faux du froid',
      'en-EN': 'Frost scythe',
    },
  },
};
