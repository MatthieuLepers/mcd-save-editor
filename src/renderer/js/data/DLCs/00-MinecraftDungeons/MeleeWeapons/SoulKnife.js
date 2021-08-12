export default {
  SoulKnife: {
    name: 'SoulKnife',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/SoulKnife.png',
    ancientHuntRunes: ['o'],
    stats: { power: 14, speed: 1, area: 3.4 },
    activeEnchants: ['SoulSiphon'],
    i18n: {
      'fr-FR': 'Couteau des âmes',
      'en-EN': 'Soul knife',
    },
    soulgathering: true,
  },
  SoulKnife_Unique1: {
    name: 'SoulKnife_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/TruthSeeker.png',
    ancientHuntRunes: ['o', 'i'],
    stats: { power: 14, speed: 1, area: 3.4 },
    activeEnchants: ['Committed'],
    i18n: {
      'fr-FR': 'Chercheur de vérité',
      'en-EN': 'Truthseeker',
    },
    soulgathering: true,
  },
  SoulKnife_Unique2: {
    name: 'SoulKnife_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/EternalKnife.png',
    ancientHuntRunes: ['o'],
    stats: { power: 14, speed: 1, area: 3.4 },
    i18n: {
      'fr-FR': 'Couteau éternel',
      'en-EN': 'Eternal knife',
    },
    soulgathering: true,
  },
};
