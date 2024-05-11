export default {
  GrimArmor: {
    name: 'GrimArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'img/Items/Armors/GrimArmor.png',
    ancientHuntRunes: ['o', 's'],
    soulgathering: true,
    armorproperties: [
      'SoulGatheringBoost',
      'LifeStealAura',
    ],
    i18n: {
      'fr-FR': 'Armure sinistre',
      'en-EN': 'Grim armor',
    },
  },
  GrimArmor_Unique1: {
    name: 'GrimArmor_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'img/Items/Armors/WitherArmor.png',
    ancientHuntRunes: ['o', 's', 't'],
    soulgathering: true,
    armorproperties: [
      'SoulGatheringBoost',
      'SuperbDamageAbsorption',
      'LifeStealAura',
    ],
    i18n: {
      'fr-FR': 'Armure de wither',
      'en-EN': 'Wither armor',
    },
  },
  GrimArmor_Spooky2: {
    events: ['Spookier Fall'],
    name: 'GrimArmor_Spooky2',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'img/Items/Armors/TheGourdianArmour.png',
    ancientHuntRunes: ['t', 'o', 's'],
    soulgathering: true,
    armorproperties: [
      'SoulGatheringBoost',
      'SuperbDamageAbsorption',
      'LifeStealAura',
    ],
    i18n: {
      'fr-FR': 'L\'armure de gourdien',
      'en-EN': 'The gourdian armor',
    },
  },
};
