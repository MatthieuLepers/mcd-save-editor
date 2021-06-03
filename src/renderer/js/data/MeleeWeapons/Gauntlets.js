export default {
  Gauntlets: {
    name: 'Gauntlets',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/Gauntlets.png',
    ancientHuntRunes: ['i'],
    stats: { power: 2.6, speed: 6.6, area: 1.8 },
    i18n: {
      'fr-FR': 'Gantelets',
      'en-EN': 'Gauntlets',
    },
  },
  Gauntlets_Unique1: {
    name: 'Gauntlets_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/SoulFists.png',
    ancientHuntRunes: ['s', 'i'],
    stats: { power: 2.6, speed: 6.6, area: 1.8 },
    activeEnchants: ['EnigmaResonatorMelee'],
    i18n: {
      'fr-FR': 'Poings de l\'âme',
      'en-EN': 'Soul fists',
    },
    soulgathering: true,
  },
  Gauntlets_Unique2: {
    name: 'Gauntlets_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/Maulers.png',
    ancientHuntRunes: ['c', 'i'],
    stats: { power: 2.6, speed: 6.6, area: 1.8 },
    i18n: {
      'fr-FR': 'Boxeurs',
      'en-EN': 'Maulers',
    },
  },
  Gauntlets_Unique3: {
    name: 'Gauntlets_Unique3',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/FightersBindings.png',
    ancientHuntRunes: ['c', 'i'],
    stats: { power: 2.5, speed: 14, area: 1.5 },
    i18n: {
      'fr-FR': 'Bandages de combattant',
      'en-EN': 'Fighter\'s bindings',
    },
  },
};
