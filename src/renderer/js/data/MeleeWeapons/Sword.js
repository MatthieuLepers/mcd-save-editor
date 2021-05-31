export default {
  Sword: {
    name: 'Sword',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/Sword.png',
    ancientHuntRunes: ['i'],
    stats: { power: 5.8, speed: 3.3, area: 3.1 },
    i18n: {
      'fr-FR': 'Épée',
      'en-EN': 'Sword',
    },
  },
  Sword_Unique1: {
    name: 'Sword_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/DiamondSword.png',
    ancientHuntRunes: ['i'],
    stats: { power: 5.8, speed: 3.3, area: 3.1 },
    i18n: {
      'fr-FR': 'Épée en diamant',
      'en-EN': 'Diamond sword',
    },
  },
  Sword_Unique2: {
    name: 'Sword_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/Hawkbrand.png',
    ancientHuntRunes: ['i'],
    stats: { power: 5.8, speed: 3.3, area: 3.1 },
    activeEnchants: ['CriticalHit'],
    i18n: {
      'fr-FR': 'Hawkbrand',
      'en-EN': 'Hawkbrand',
    },
  },
  Sword_Spooky1: {
    event: 'Spooky Fall',
    name: 'Sword_Spooky1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/SinisterSword.png',
    ancientHuntRunes: ['i'],
    stats: { power: 5.8, speed: 3.3, area: 3.1 },
    activeEnchants: ['CriticalHit'],
    i18n: {
      'fr-FR': 'Épée sinistre',
      'en-EN': 'Sinister sword',
    },
  },
};
