export default {
  WolfArmor: {
    name: 'WolfArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/WolfArmor.png',
    armorproperties: [
      'AllyDamageBoost',
      'AreaHeal',
    ],
    i18n: {
      'fr-FR': 'Armure du loup',
      'en-EN': 'Wolf armor',
    },
  },
  WolfArmor_Unique1: {
    name: 'WolfArmor_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/FoxArmor.png',
    armorproperties: [
      'MissChance',
      'AllyDamageBoost',
      'AreaHeal',
    ],
    i18n: {
      'fr-FR': 'Armure du renard',
      'en-EN': 'Fox armor',
    },
  },
  WolfArmor_Unique2: {
    name: 'WolfArmor_Unique2',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/NightWolfArmor.png',
    activeEnchants: ['Acrobat'],
    armorproperties: [
      'AllyDamageBoost',
      'AreaHeal',
    ],
    i18n: {
      'fr-FR': 'Armure de loup noir',
      'en-EN': 'Black wolf armor',
    },
  },
  WolfArmor_Winter1: {
    event: 'Chills and Thrills',
    name: 'WolfArmor_Winter1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/ArcticFoxArmor.png',
    armorproperties: [
      'MissChance',
      'AllyDamageBoost',
      'AreaHeal',
    ],
    i18n: {
      'fr-FR': 'Armure du renard arctique',
      'en-EN': 'Arctic fox armor',
    },
  },
};
