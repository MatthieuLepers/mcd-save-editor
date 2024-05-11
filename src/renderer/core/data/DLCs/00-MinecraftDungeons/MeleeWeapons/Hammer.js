export default {
  Hammer: {
    name: 'Hammer',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'img/Items/MeleeWeapons/GreatHammer.png',
    ancientHuntRunes: ['t'],
    stats: { power: 8.69, speed: 1, area: 7.76 },
    i18n: {
      'fr-FR': 'Grand marteau',
      'en-EN': 'Great hammer',
    },
  },
  Hammer_Unique1: {
    name: 'Hammer_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/Stormlander.png',
    ancientHuntRunes: ['t', 'a'],
    stats: { power: 8.69, speed: 1, area: 7.76 },
    activeEnchants: ['Thundering'],
    i18n: {
      'fr-FR': 'Faiseur de tempêtes',
      'en-EN': 'Stormlander',
    },
  },
  Hammer_Unique2: {
    name: 'Hammer_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/HammerOfGravity.png',
    ancientHuntRunes: ['t', 'a'],
    stats: { power: 8.69, speed: 1, area: 7.76 },
    activeEnchants: ['GravityMelee'],
    i18n: {
      'fr-FR': 'Marteau de la gravité',
      'en-EN': 'Hammer of gravity',
    },
  },
  SkeletonHammer: {
    events: ['Spooky Fall 22'],
    name: 'SkeletonHammer',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/BoneheadHammer.png',
    ancientHuntRunes: ['t', 'a'],
    stats: { power: 8.69, speed: 1, area: 7.76 },
    activeEnchants: ['GravityMelee'],
    i18n: {
      'fr-FR': 'Marteau à tête d\'os',
      'en-EN': 'Bonehead hammer',
    },
  },
};
