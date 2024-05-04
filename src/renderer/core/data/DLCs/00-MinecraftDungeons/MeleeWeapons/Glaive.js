export default {
  Glaive: {
    name: 'Glaive',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'img/Items/MeleeWeapons/Glaive.png',
    ancientHuntRunes: ['s'],
    stats: { power: 7.1, speed: 1.46, area: 6.17 },
    i18n: {
      'fr-FR': 'Hallebarde',
      'en-EN': 'Glaive',
    },
  },
  Glaive_Unique1: {
    name: 'Glaive_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/GraveBane.png',
    ancientHuntRunes: ['s', 'i'],
    stats: { power: 7.1, speed: 1.46, area: 6.17 },
    i18n: {
      'fr-FR': 'Fléau funéraire',
      'en-EN': 'Grave bane',
    },
  },
  Glaive_Unique2: {
    name: 'Glaive_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/VenomGlaive.png',
    ancientHuntRunes: ['s', 'a'],
    stats: { power: 7.1, speed: 1.46, area: 6.17 },
    activeEnchants: ['PoisonedMelee'],
    i18n: {
      'fr-FR': 'Hallebarde venimeuse',
      'en-EN': 'Venom glaive',
    },
  },
  Glaive_Spooky2: {
    events: ['Spookier Fall'],
    name: 'Glaive_Spooky2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/CracklingBroom.png',
    ancientHuntRunes: ['s', 'i'],
    stats: { power: 7.1, speed: 1.46, area: 6.17 },
    activeEnchants: ['Smiting'],
    i18n: {
      'fr-FR': 'Balai ricaneur',
      'en-EN': 'Crackling broom',
    },
  },
};
