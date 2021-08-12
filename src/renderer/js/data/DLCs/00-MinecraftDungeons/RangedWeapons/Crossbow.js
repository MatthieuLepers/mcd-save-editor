export default {
  Crossbow: {
    name: 'Crossbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/Crossbow.png',
    ancientHuntRunes: ['r'],
    stats: { power: 7.1, speed: 2.3, ammo: 4.1 },
    i18n: {
      'fr-FR': 'Arbalète',
      'en-EN': 'Crossbow',
    },
  },
  Crossbow_Unique1: {
    name: 'Crossbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/TheSlicer.png',
    ancientHuntRunes: ['r'],
    stats: { power: 7.1, speed: 2.3, ammo: 4.1 },
    activeEnchants: ['Piercing'],
    i18n: {
      'fr-FR': 'La trancheuse',
      'en-EN': 'Slayer crossbow',
    },
  },
  Crossbow_Unique2: {
    name: 'Crossbow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/AzureSeeker.png',
    ancientHuntRunes: ['c', 'r'],
    stats: { power: 7.1, speed: 2.3, ammo: 4.1 },
    activeEnchants: ['RapidFire'],
    i18n: {
      'fr-FR': 'Chercheur d\'azure',
      'en-EN': 'Azure seeker',
    },
  },
};
