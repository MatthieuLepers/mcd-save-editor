export default {
  MercenaryArmor: {
    name: 'MercenaryArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/MercenaryArmor.png',
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
    image: 'static/img/Items/Armors/RenegadeArmor.png',
    armorproperties: [
      'SuperbDamageAbsorption',
      'AllyDamageBoost',
      'MeleeAttackSpeedBoost',
    ],
    i18n: {
      'fr-FR': 'Armure de rebelle',
      'en-EN': 'Renegade armor',
    },
  },
  MercenaryArmor_Spooky1: {
    event: 'Spooky Fall',
    name: 'MercenaryArmor_Spooky1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/HungryHorror.png',
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