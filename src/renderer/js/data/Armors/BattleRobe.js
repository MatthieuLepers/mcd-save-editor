export default {
  BattleRobe: {
    name: 'BattleRobe',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/BattleRobe.png',
    armorproperties: [
      'ItemCooldownDecrease',
      'MeleeDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Robe de combat',
      'en-EN': 'Battle robe',
    },
  },
  BattleRobe_Unique1: {
    name: 'BattleRobe_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/SplendidRobe.png',
    armorproperties: [
      'ItemDamageBoost',
      'ItemCooldownDecrease',
      'MeleeDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Robe splendide',
      'en-EN': 'Splendid robe',
    },
  },
};
