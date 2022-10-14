export default {
  ScatterCrossbow: {
    name: 'ScatterCrossbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/ScatterCrossbow.png',
    ancientHuntRunes: ['t'],
    stats: { power: 4.18, speed: 7.82, ammo: 4.1 },
    i18n: {
      'fr-FR': 'Arbalète à dispersion',
      'en-EN': 'Scatter crossbow',
    },
  },
  ScatterCrossbow_Unique1: {
    name: 'ScatterCrossbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/HarpCrossbow.png',
    ancientHuntRunes: ['i', 't'],
    stats: { power: 3.95, speed: 14, ammo: 4.1 },
    i18n: {
      'fr-FR': 'Harpbalète',
      'en-EN': 'Harp crossbow',
    },
  },
  ScatterCrossbow_Unique2: {
    name: 'ScatterCrossbow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/LightningHarpCrossbow.png',
    ancientHuntRunes: ['i', 't'],
    stats: { power: 4.18, speed: 7.82, ammo: 4.1 },
    activeEnchants: ['Ricochet'],
    i18n: {
      'fr-FR': 'Harpbalète de foudre',
      'en-EN': 'Lightning harp crossbow',
    },
  },
};
