export default {
  PiglinArmor: {
    dlc: 'Flames of the Nether',
    name: 'PiglinArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/PiglinArmor.png',
    ancientHuntRunes: ['a'],
    armorproperties: [
      'ItemCooldownReset',
      'ItemDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Armure de piglin',
      'en-EN': 'Piglin armor',
    },
  },
  PiglinArmor_Unique1: {
    dlc: 'Flames of the Nether',
    name: 'PiglinArmor_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/GoldenPiglinArmor.png',
    ancientHuntRunes: ['s', 'a'],
    activeEnchants: ['SurpriseGift'],
    armorproperties: [
      'ItemCooldownReset',
      'ItemDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Armure de piglin en or',
      'en-EN': 'Golden piglin armor',
    },
  },
};
