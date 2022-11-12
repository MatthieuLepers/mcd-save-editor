export default {
  ShadowCrossbow: {
    dlc: 'Echoing Void',
    name: 'ShadowCrossbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/ShadowCrossbow.png',
    ancientHuntRunes: ['r'],
    stats: { power: 4.76, speed: 1.95, ammo: 4.1 },
    i18n: {
      'fr-FR': 'Arbalète de l\'ombre',
      'en-EN': 'Shadow crossbow',
    },
  },
  ShadowCrossbow_Unique1: {
    dlc: 'Echoing Void',
    name: 'ShadowCrossbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/VeiledCrossbow.png',
    ancientHuntRunes: ['r', 'c'],
    stats: { power: 4.76, speed: 1.47, ammo: 4.1 },
    activeEnchants: ['ShadowShot'],
    i18n: {
      'fr-FR': 'Arbalète voilée',
      'en-EN': 'Veiled crossbow',
    },
  },
  BatCrossbow: {
    events: ['Spooky Fall 22'],
    name: 'BatCrossbow',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/ShriekingCrossbow.png',
    ancientHuntRunes: ['r', 's'],
    stats: { power: 4.76, speed: 1.47, ammo: 4.1 },
    activeEnchants: ['ShadowShot'],
    i18n: {
      'fr-FR': 'Arbalète hurlante',
      'en-EN': 'Shrieking crossbow',
    },
  },
};
