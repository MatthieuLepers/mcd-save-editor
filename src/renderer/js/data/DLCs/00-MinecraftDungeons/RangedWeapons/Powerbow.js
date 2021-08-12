export default {
  Powerbow: {
    name: 'Powerbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/PowerBow.png',
    ancientHuntRunes: ['r', 'i'],
    stats: { power: 7.1, speed: 3.7, ammo: 1.6 },
    i18n: {
      'fr-FR': 'Arc de puissance',
      'en-EN': 'Power bow',
    },
  },
  Powerbow_Unique1: {
    name: 'Powerbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/ElitePowerBow.png',
    ancientHuntRunes: ['r', 'i'],
    stats: { power: 7.1, speed: 3.7, ammo: 1.6 },
    activeEnchants: ['Power'],
    i18n: {
      'fr-FR': 'Arc de puissance d\'élite',
      'en-EN': 'Elite power bow',
    },
  },
  Powerbow_Unique2: {
    name: 'Powerbow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/Sabrewing.png',
    ancientHuntRunes: ['s', 'r', 'i'],
    stats: { power: 7.1, speed: 3.7, ammo: 1.6 },
    activeEnchants: ['RadianceRanged'],
    i18n: {
      'fr-FR': 'Colibri',
      'en-EN': 'Sabrewing',
    },
  },
};
