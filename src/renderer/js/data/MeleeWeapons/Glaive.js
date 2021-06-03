export default {
  Glaive: {
    name: 'Glaive',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/Glaive.png',
    ancientHuntRunes: ['s'],
    stats: { power: 8.2, speed: 1.6, area: 6.6 },
    i18n: {
      'fr-FR': 'Hallebarde',
      'en-EN': 'Glaive',
    },
  },
  Glaive_Unique1: {
    name: 'Glaive_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/GraveBane.png',
    ancientHuntRunes: ['s', 'i'],
    stats: { power: 8.2, speed: 1.6, area: 6.6 },
    i18n: {
      'fr-FR': 'Fléau funéraire',
      'en-EN': 'Grave bane',
    },
  },
  Glaive_Unique2: {
    name: 'Glaive_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/VenomGlaive.png',
    ancientHuntRunes: ['s', 'a'],
    stats: { power: 8.2, speed: 1.6, area: 6.6 },
    activeEnchants: ['PoisonedMelee'],
    i18n: {
      'fr-FR': 'Hallebarde venimeuse',
      'en-EN': 'Venom glaive',
    },
  },
};
