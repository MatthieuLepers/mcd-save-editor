export default {
  Sword: {
    name: 'Sword',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'img/Items/MeleeWeapons/Sword.png',
    ancientHuntRunes: ['i'],
    stats: { power: 4.99, speed: 3.16, area: 2.96 },
    i18n: {
      'fr-FR': 'Épée',
      'en-EN': 'Sword',
    },
  },
  Sword_Unique1: {
    name: 'Sword_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/DiamondSword.png',
    ancientHuntRunes: ['i'],
    stats: { power: 4.99, speed: 3.16, area: 2.96 },
    i18n: {
      'fr-FR': 'Épée en diamant',
      'en-EN': 'Diamond sword',
    },
  },
  Sword_Unique2: {
    name: 'Sword_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/Hawkbrand.png',
    ancientHuntRunes: ['i'],
    stats: { power: 4.99, speed: 3.16, area: 2.96 },
    activeEnchants: ['CriticalHit'],
    i18n: {
      'fr-FR': 'Hawkbrand',
      'en-EN': 'Hawkbrand',
    },
  },
  Sword_Spooky1: {
    events: ['Spooky Fall'],
    name: 'Sword_Spooky1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/SinisterSword.png',
    ancientHuntRunes: ['i'],
    stats: { power: 4.99, speed: 3.16, area: 2.96 },
    activeEnchants: ['CriticalHit'],
    i18n: {
      'fr-FR': 'Épée sinistre',
      'en-EN': 'Sinister sword',
    },
  },
};
