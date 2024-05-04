export default {
  Katana: {
    name: 'Katana',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: '/assets/img/Items/MeleeWeapons/Katana.png',
    ancientHuntRunes: ['i'],
    stats: { power: 8.24, speed: 1.52, area: 6.51 },
    i18n: {
      'fr-FR': 'Katana',
      'en-EN': 'Katana',
    },
  },
  Katana_Unique1: {
    name: 'Katana_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: '/assets/img/Items/MeleeWeapons/Master\'sKatana.png',
    ancientHuntRunes: ['i'],
    stats: { power: 8.24, speed: 1.52, area: 6.51 },
    activeEnchants: ['CriticalHit'],
    i18n: {
      'fr-FR': 'Katana du maître',
      'en-EN': 'Master\'s katana',
    },
  },
  Katana_Unique2: {
    name: 'Katana_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: '/assets/img/Items/MeleeWeapons/DarkKatana.png',
    ancientHuntRunes: ['i', 'a'],
    stats: { power: 8.24, speed: 1.52, area: 6.51 },
    i18n: {
      'fr-FR': 'Katana sombre',
      'en-EN': 'Dark katana',
    },
  },
};
