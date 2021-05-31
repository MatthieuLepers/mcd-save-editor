export default {
  Katana: {
    name: 'Katana',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/Katana.png',
    ancientHuntRunes: ['i'],
    stats: { power: 9.5, speed: 1, area: 7 },
    i18n: {
      'fr-FR': 'Katana',
      'en-EN': 'Katana',
    },
  },
  Katana_Unique1: {
    name: 'Katana_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/Master\'sKatana.png',
    ancientHuntRunes: ['i'],
    stats: { power: 9.5, speed: 1, area: 7 },
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
    image: 'static/img/Items/MeleeWeapons/DarkKatana.png',
    ancientHuntRunes: ['i', 'a'],
    stats: { power: 9.5, speed: 1, area: 7 },
    i18n: {
      'fr-FR': 'Katana sombre',
      'en-EN': 'Dark katana',
    },
  },
};
