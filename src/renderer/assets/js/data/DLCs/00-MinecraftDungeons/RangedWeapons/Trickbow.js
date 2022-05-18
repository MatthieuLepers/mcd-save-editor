export default {
  Trickbow: {
    name: 'Trickbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/Trickbow.png',
    ancientHuntRunes: ['r'],
    stats: { power: 1.87, speed: 3.41, ammo: 5.33 },
    i18n: {
      'fr-FR': 'Arc piège',
      'en-EN': 'Trickbow',
    },
  },
  Trickbow_Unique1: {
    name: 'Trickbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/TheGreenMenace.png',
    ancientHuntRunes: ['r', 'a'],
    stats: { power: 1.87, speed: 3.41, ammo: 5.33 },
    activeEnchants: ['PoisonedRanged'],
    i18n: {
      'fr-FR': 'La menace verte',
      'en-EN': 'The green menace',
    },
  },
  Trickbow_Unique2: {
    name: 'Trickbow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/ThePinkScoundrel.png',
    ancientHuntRunes: ['r', 'i'],
    stats: { power: 1.87, speed: 3.41, ammo: 5.33 },
    activeEnchants: ['WildRage'],
    i18n: {
      'fr-FR': 'La crapule rose',
      'en-EN': 'The pink scoundrel',
    },
  },
  Trickbow_Year1: {
    event: 'Anniversary',
    name: 'Trickbow_Year1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/SugarRush.png',
    ancientHuntRunes: ['r', 'i'],
    stats: { power: 1.87, speed: 3.41, ammo: 5.33 },
    activeEnchants: ['WildRage', 'Ricochet'],
    i18n: {
      'fr-FR': 'Arc en sucre',
      'en-EN': 'Sugar Rush',
    },
  },
};
