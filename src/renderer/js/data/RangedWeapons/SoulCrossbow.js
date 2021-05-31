export default {
  SoulCrossbow: {
    name: 'SoulCrossbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/SoulCrossbow.png',
    ancientHuntRunes: ['o'],
    stats: { power: 5.3, speed: 2.3, ammo: 2.9 },
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
    stats: { power: 5.3, speed: 2.3, ammo: 3.9 },
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
    stats: { power: 5.3, speed: 2.3, ammo: 2.9 },
    activeEnchants: ['Gravity'],
    soulgathering: true,
    i18n: {
      'fr-FR': 'Crystal de vide',
      'en-EN': 'Voidcaller',
    },
  },
};
