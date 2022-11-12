export default {
  GhostArmor: {
    name: 'GhostArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/GhostlyArmor.png',
    ancientHuntRunes: ['c', 'p'],
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
    ancientHuntRunes: ['c', 'i', 'p'],
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
  GhostArmor_Spooky2: {
    events: ['Spooky Fall 22'],
    name: 'GhostArmor_Spooky2',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/CloakedSkull.png',
    ancientHuntRunes: ['c', 'i', 'p'],
    activeEnchants: ['FireTrail'],
    armorproperties: [
      'DodgeGhostForm',
      'MissChance',
    ],
    i18n: {
      'fr-FR': 'Crâne masqué',
      'en-EN': 'Cloaked skull',
    },
  },
};
