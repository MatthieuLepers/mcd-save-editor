export default {
  Spear: {
    name: 'Spear',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'img/Items/MeleeWeapons/Spear.png',
    ancientHuntRunes: ['s'],
    stats: { power: 5.67, speed: 2.03, area: 8.52 },
    i18n: {
      'fr-FR': 'Lance',
      'en-EN': 'Spear',
    },
  },
  Spear_Unique1: {
    name: 'Spear_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/WhisperingSpear.png',
    ancientHuntRunes: ['s', 'i'],
    stats: { power: 5.67, speed: 2.03, area: 8.52 },
    activeEnchants: ['Echo'],
    i18n: {
      'fr-FR': 'Lance chuchotante',
      'en-EN': 'Whispering spear',
    },
  },
  Spear_Unique2: {
    name: 'Spear_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/FortuneSpear.png',
    ancientHuntRunes: ['s'],
    stats: { power: 5.67, speed: 2.03, area: 8.52 },
    i18n: {
      'fr-FR': 'Lance de chance',
      'en-EN': 'Fortune spear',
    },
  },
  Spear_spooky2: {
    events: ['Spooky Fall 22'],
    name: 'Spear_spooky2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/SpineChillSpear.png',
    ancientHuntRunes: ['s'],
    stats: { power: 5.67, speed: 2.03, area: 8.52 },
    i18n: {
      'fr-FR': 'Lance d\'effroi',
      'en-EN': 'Spine-chill spear',
    },
  },
};
