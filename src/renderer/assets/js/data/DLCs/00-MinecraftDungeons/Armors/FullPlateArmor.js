export default {
  FullPlateArmor: {
    name: 'FullPlateArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/PlateArmor.png',
    ancientHuntRunes: ['i', 't'],
    armorproperties: [
      'SuperbDamageAbsorption',
      'MissChance',
      'DodgeCooldownIncrease',
    ],
    i18n: {
      'fr-FR': 'Armure blindée',
      'en-EN': 'Plate armor',
    },
  },
  FullPlateArmor_Unique1: {
    name: 'FullPlateArmor_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/FullMetalArmor.png',
    ancientHuntRunes: ['i', 't'],
    armorproperties: [
      'SuperbDamageAbsorption',
      'MissChance',
      'MeleeDamageBoost',
      'DodgeCooldownIncrease',
    ],
    i18n: {
      'fr-FR': 'Armure tout en métal',
      'en-EN': 'Full metal armor',
    },
  },
  FullPlateArmor_Spooky2: {
    event: 'Spookier Fall',
    name: 'FullPlateArmor_Spooky2',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/CauldronArmor.png',
    ancientHuntRunes: ['i', 't'],
    armorproperties: [
      'MeleeDamageBoost',
      'MissChance',
      'SuperbDamageAbsorption',
      'DodgeCooldownIncrease',
    ],
    i18n: {
      'fr-FR': 'Armure chaudron',
      'en-EN': 'Cauldron armor',
    },
  },
};
