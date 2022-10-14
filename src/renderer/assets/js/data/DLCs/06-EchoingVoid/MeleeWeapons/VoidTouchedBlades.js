export default {
  VoidTouchedBlades: {
    dlc: 'Echoing Void',
    name: 'VoidTouchedBlades',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/VoidTouchedBlades.png',
    ancientHuntRunes: ['s'],
    stats: { power: 5.71, speed: 3.11, area: 2.2 },
    activeEnchants: ['VoidTouchedMelee'],
    i18n: {
      'fr-FR': 'Lames touchées par le vide',
      'en-EN': 'Void touched blades',
    },
  },
  VoidTouchedBlades_Unique1: {
    dlc: 'Echoing Void',
    name: 'VoidTouchedBlades_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/TheBeginningAndTheEnd.png',
    ancientHuntRunes: ['s', 'i'],
    stats: { power: 5.71, speed: 3.11, area: 2.2 },
    activeEnchants: ['VoidTouchedMelee', 'Leeching'],
    i18n: {
      'fr-FR': 'Le début et la fin',
      'en-EN': 'The beginning and the end',
    },
  },
};
