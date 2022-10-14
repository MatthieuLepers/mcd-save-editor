export default {
  SoulCrossbow: {
    name: 'SoulCrossbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/SoulCrossbow.png',
    ancientHuntRunes: ['o'],
    stats: { power: 5.33, speed: 1.95, ammo: 2.86 },
    soulgathering: true,
    i18n: {
      'fr-FR': 'Arblète des âmes',
      'en-EN': 'Soul crossbow',
    },
  },
  SoulCrossbow_Unique1: {
    name: 'SoulCrossbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/FeralSoulCrossbow.png',
    ancientHuntRunes: ['o'],
    stats: { power: 5.33, speed: 1.95, ammo: 2.86 },
    activeEnchants: ['EnigmaResonatorRanged'],
    soulgathering: true,
    i18n: {
      'fr-FR': 'Arbalète sauvage des âmes',
      'en-EN': 'Feral soul crossbow',
    },
  },
  SoulCrossbow_Unique2: {
    name: 'SoulCrossbow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/Voidcaller.png',
    ancientHuntRunes: ['o', 'a'],
    stats: { power: 5.33, speed: 1.95, ammo: 2.86 },
    activeEnchants: ['Gravity'],
    soulgathering: true,
    i18n: {
      'fr-FR': 'Crystal de vide',
      'en-EN': 'Voidcaller',
    },
  },
};
