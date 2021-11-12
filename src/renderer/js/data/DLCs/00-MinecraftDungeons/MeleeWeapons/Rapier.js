export default {
  Rapier: {
    name: 'Rapier',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/RapierSword.png',
    ancientHuntRunes: ['i', 'p'],
    stats: { power: 1, speed: 11.66, area: 5.66 },
    i18n: {
      'fr-FR': 'Rapière',
      'en-EN': 'Rapier',
    },
  },
  Rapier_Unique1: {
    name: 'Rapier_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/BeeStingerSword.png',
    ancientHuntRunes: ['u', 'i', 'p'],
    stats: { power: 1, speed: 11.66, area: 5.66 },
    activeEnchants: ['BusyBee'],
    i18n: {
      'fr-FR': 'Dard d\'abeille',
      'en-EN': 'Bee stinger',
    },
  },
  Rapier_Unique2: {
    name: 'Rapier_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/FreezingFoilSword.png',
    ancientHuntRunes: ['s', 'i', 'p'],
    stats: { power: 1.07, speed: 11.34, area: 5.66 },
    activeEnchants: ['Freezing'],
    i18n: {
      'fr-FR': 'Feuille de congélation',
      'en-EN': 'Freezing foil',
    },
  },
};
