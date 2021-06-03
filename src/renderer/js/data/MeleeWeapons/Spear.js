export default {
  Spear: {
    name: 'Spear',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/Spear.png',
    ancientHuntRunes: ['s'],
    stats: { power: 6.6, speed: 2.2, area: 9.2 },
    i18n: {
      'fr-FR': 'Lance',
      'en-EN': 'Spear',
    },
  },
  Spear_Unique1: {
    name: 'Spear_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/WhisperingSpear.png',
    ancientHuntRunes: ['s', 'i'],
    stats: { power: 6.6, speed: 2.2, area: 9.2 },
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
    image: 'static/img/Items/MeleeWeapons/FortuneSpear.png',
    ancientHuntRunes: ['s'],
    stats: { power: 6.6, speed: 2.2, area: 9.2 },
    i18n: {
      'fr-FR': 'Lance de chance',
      'en-EN': 'Fortune spear',
    },
  },
};
