export default {
  Bow: {
    name: 'Bow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/Bow.png',
    ancientHuntRunes: ['r'],
    i18n: {
      'fr-FR': 'Arc',
      'en-EN': 'Bow',
    },
  },
  Bow_Unique1: {
    name: 'Bow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/Bonebow.png',
    ancientHuntRunes: ['r'],
    activeEnchants: ['Growing'],
    i18n: {
      'fr-FR': 'Arc d\'os',
      'en-EN': 'Bonebow',
    },
  },
  Bow_Unique2: {
    name: 'Bow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/TwinBow.png',
    ancientHuntRunes: ['s', 'r'],
    activeEnchants: ['BonusShot'],
    i18n: {
      'fr-FR': 'Arc jumeaux',
      'en-EN': 'Twin box',
    },
  },
  Bow_Spooky1: {
    event: 'Spooky Fall',
    name: 'Bow_Spooky1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/HauntedBow.png',
    ancientHuntRunes: ['s', 'i'],
    activeEnchants: ['BonusShot'],
    i18n: {
      'fr-FR': 'Arc hanté',
      'en-EN': 'Haunted bow',
    },
  },
};
