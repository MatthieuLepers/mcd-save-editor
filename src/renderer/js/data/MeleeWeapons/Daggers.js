export default {
  Daggers: {
    name: 'Daggers',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/Daggers.png',
    ancientHuntRunes: ['i'],
    stats: { power: 3.5, speed: 7.3, area: 1.7 },
    i18n: {
      'fr-FR': 'Dagues',
      'en-EN': 'Daggers',
    },
  },
  Daggers_Unique1: {
    name: 'Daggers_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/FangsOfFrost.png',
    ancientHuntRunes: ['i', 't'],
    stats: { power: 3.5, speed: 7.3, area: 1 },
    activeEnchants: ['Freezing'],
    i18n: {
      'fr-FR': 'Mâchoires du froid',
      'en-EN': 'Fangs of frost',
    },
  },
  Daggers_Unique2: {
    name: 'Daggers_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/MoonDaggers.png',
    ancientHuntRunes: ['s', 'i'],
    stats: { power: 3.5, speed: 7.3, area: 1 },
    activeEnchants: ['EnigmaResonatorMelee'],
    i18n: {
      'fr-FR': 'Dagues lunaires',
      'en-EN': 'Moon daggers',
    },
  },
  Daggers_Unique3: {
    name: 'Daggers_Unique3',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/SheerDaggers.png',
    ancientHuntRunes: ['i'],
    stats: { power: 3.5, speed: 7.3, area: 1 },
    activeEnchants: ['Swirling'],
    i18n: {
      'fr-FR': 'Dagues de cisaillement',
      'en-EN': 'Sheer daggers',
    },
  },
};
