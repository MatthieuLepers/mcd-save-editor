export default {
  MercenaryArmor: {
    name: 'MercenaryArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'img/Items/Armors/MercenaryArmor.png',
    ancientHuntRunes: ['s', 't'],
    armorproperties: [
      'SuperbDamageAbsorption',
      'AllyDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Armure de mercenaire',
      'en-EN': 'Mercenary armor',
    },
  },
  MercenaryArmor_Unique1: {
    name: 'MercenaryArmor_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'img/Items/Armors/RenegadeArmor.png',
    ancientHuntRunes: ['s', 't'],
    armorproperties: [
      'MeleeAttackSpeedBoost',
      'SuperbDamageAbsorption',
      'AllyDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Armure de rebelle',
      'en-EN': 'Renegade armor',
    },
  },
  MercenaryArmor_Spooky1: {
    events: ['Spooky Fall'],
    name: 'MercenaryArmor_Spooky1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'img/Items/Armors/HungryHorror.png',
    ancientHuntRunes: ['c', 's', 't'],
    armorproperties: [
      'MeleeAttackSpeedBoost',
      'SuperbDamageAbsorption',
      'AllyDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Horreur affamée',
      'en-EN': 'Hungry horror',
    },
  },
};
