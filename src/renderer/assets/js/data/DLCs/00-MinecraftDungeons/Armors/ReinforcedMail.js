export default {
  ReinforcedMail: {
    name: 'ReinforcedMail',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/ReinforcedMail.png',
    ancientHuntRunes: ['t'],
    armorproperties: [
      'SuperbDamageAbsorption',
      'MissChance',
      'DodgeCooldownIncrease',
    ],
    i18n: {
      'fr-FR': 'Cotte de mailles renforcée',
      'en-EN': 'Reinforced mail',
    },
  },
  ReinforcedMail_Unique1: {
    name: 'ReinforcedMail_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/StalwartArmor.png',
    ancientHuntRunes: ['t', 'a'],
    activeEnchants: ['PotionFortification'],
    armorproperties: [
      'SuperbDamageAbsorption',
      'MissChance',
      'DodgeCooldownIncrease',
    ],
    i18n: {
      'fr-FR': 'Armure fidèle',
      'en-EN': 'Stalwart armor',
    },
  },
};
