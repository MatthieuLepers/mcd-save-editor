export default {
  Rapier: {
    name: 'Rapier',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/RapierSword.png',
    ancientHuntRunes: ['i', 'p'],
    stats: { power: 1.1, speed: 11.7, area: 6.1 },
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
    stats: { power: 1, speed: 11.7, area: 6.1 },
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
    stats: { power: 1.2, speed: 11.4, area: 6.1 },
    activeEnchants: ['Freezing'],
    i18n: {
      'fr-FR': 'Feuille de congélation',
      'en-EN': 'Freezing foil',
    },
  },
};
