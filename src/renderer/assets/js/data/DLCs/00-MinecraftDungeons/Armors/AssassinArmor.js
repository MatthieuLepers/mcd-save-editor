export default {
  AssassinArmor: {
    name: 'AssassinArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/ThiefArmor.png',
    ancientHuntRunes: ['i'],
    armorproperties: [
      { id: 'MeleeAttackSpeedBoost', rarity: 'Common' },
    ],
    i18n: {
      'fr-FR': 'Armure de voleur',
      'en-EN': 'Thief armor',
    },
  },
  AssassinArmor_Unique1: {
    name: 'AssassinArmor_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/SpiderArmor.png',
    ancientHuntRunes: ['i', 't'],
    armorproperties: [
      { id: 'LifeStealAura', rarity: 'Common' },
      { id: 'MeleeAttackSpeedBoost', rarity: 'Common' },
    ],
    i18n: {
      'fr-FR': 'Armure d\'araignée',
      'en-EN': 'Spider armor',
    },
  },
};
