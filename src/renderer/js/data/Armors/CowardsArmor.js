export default {
  CowardsArmor: {
    name: 'CowardsArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/Coward\'sArmor.png',
    armorproperties: [
      'ItemCooldownDecrease',
      'IncreasedArrowBundleSize',
    ],
    i18n: {
      'fr-FR': 'Armure de garde',
      'en-EN': 'Guard\'s armor',
    },
  },
  CowardsArmor_Unique1: {
    disabled: true,
    name: 'CowardsArmor_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/CuriousArmor.png',
    armorproperties: [
      'TeleportChance',
      'ItemCooldownDecrease',
      'IncreasedArrowBundleSize',
    ],
    i18n: {
      'fr-FR': '???', // TODO
      'en-EN': 'Curious armor',
    },
  },
};
