export default {
  ChampionsArmor: {
    name: 'ChampionsArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'img/Items/Armors/Champion\'sArmor.png',
    ancientHuntRunes: ['t'],
    armorproperties: [
      'SuperbDamageAbsorption',
      'IncreasedMobTargeting',
      'PotionCooldownDecrease',
    ],
    i18n: {
      'fr-FR': 'Armure du champion',
      'en-EN': 'Champion\'s armor',
    },
  },
  ChampionsArmor_Unique1: {
    name: 'ChampionsArmor_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'img/Items/Armors/Hero\'sArmor.png',
    ancientHuntRunes: ['s', 't'],
    armorproperties: [
      'SuperbDamageAbsorption',
      'AreaHeal',
      'IncreasedMobTargeting',
      'PotionCooldownDecrease',
    ],
    i18n: {
      'fr-FR': 'Armure du héros',
      'en-EN': 'Hero\'s armor',
    },
  },
};
