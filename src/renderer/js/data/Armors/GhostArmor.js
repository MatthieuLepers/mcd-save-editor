export default {
  GhostArmor: {
    name: 'GhostArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/GhostlyArmor.png',
    armorproperties: [
      'DodgeGhostForm',
      'MissChance',
    ],
    i18n: {
      'fr-FR': 'Armure fantomatique',
      'en-EN': 'Ghoslty armor',
    },
  },
  GhostArmor_Unique1: {
    name: 'GhostArmor_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/GhostKindlerArmor.png',
    activeEnchants: ['FireTrail'],
    armorproperties: [
      'DodgeGhostForm',
      'MissChance',
    ],
    i18n: {
      'fr-FR': 'Fantôme incendiaire',
      'en-EN': 'Ghost kindler',
    },
  },
};
