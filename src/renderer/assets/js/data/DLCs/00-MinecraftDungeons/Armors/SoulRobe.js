export default {
  SoulRobe: {
    name: 'SoulRobe',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/SoulRobe.png',
    ancientHuntRunes: ['o'],
    soulgathering: true,
    armorproperties: [
      'SoulGatheringBoost',
      'ItemDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Robe des âmes',
      'en-EN': 'Soul robe',
    },
  },
  SoulRobe_Unique1: {
    name: 'SoulRobe_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/SouldancerRobe.png',
    ancientHuntRunes: ['o', 't'],
    soulgathering: true,
    armorproperties: [
      'SoulGatheringBoost',
      'MissChance',
      'ItemDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Robe de souldancer',
      'en-EN': 'Souldancer robe',
    },
  },
};
