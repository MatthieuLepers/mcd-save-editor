export default {
  WolfArmor: {
    name: 'WolfArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/WolfArmor.png',
    ancientHuntRunes: ['u', 's'],
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
    ancientHuntRunes: ['u', 's', 't'],
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
    ancientHuntRunes: ['u', 'c', 's'],
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
    events: ['Chills and Thrills', 'Fetival Of Frost'],
    name: 'WolfArmor_Winter1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/ArcticFoxArmor.png',
    ancientHuntRunes: ['u', 'o', 't'],
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
