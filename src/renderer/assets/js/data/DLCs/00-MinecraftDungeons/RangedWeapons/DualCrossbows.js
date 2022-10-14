export default {
  DualCrossbows: {
    name: 'DualCrossbows',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/DualCrossbows.png',
    ancientHuntRunes: ['r'],
    stats: { power: 3.86, speed: 3.65, ammo: 3.48 },
    i18n: {
      'fr-FR': 'Doubles arbalètes',
      'en-EN': 'Dual crossbows',
    },
  },
  DualCrossbows_Unique1: {
    name: 'DualCrossbows_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/SpellboundCrossbows.png',
    ancientHuntRunes: ['r', 'a'],
    stats: { power: 3.86, speed: 3.65, ammo: 3.48 },
    activeEnchants: ['Unchanting'],
    i18n: {
      'fr-FR': 'Arbalètes ensorcelées',
      'en-EN': 'Spellbound crossbows',
    },
  },
  DualCrossbows_Unique2: {
    name: 'DualCrossbows_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/BabyCrossbows.png',
    ancientHuntRunes: ['r'],
    stats: { power: 3.86, speed: 3.65, ammo: 3.48 },
    activeEnchants: ['Growing'],
    i18n: {
      'fr-FR': 'Mini arbalètes',
      'en-EN': 'Baby crossbows',
    },
  },
};
