export default {
  Battlestaff: {
    name: 'Battlestaff',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/BattleStaff.png',
    ancientHuntRunes: ['i'],
    stats: { power: 6.47, speed: 2.95, area: 3.7 },
    i18n: {
      'fr-FR': 'Bâton de combat',
      'en-EN': 'Battlestaff',
    },
  },
  Battlestaff_Unique1: {
    name: 'Battlestaff_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/GrowingStaff.png',
    ancientHuntRunes: ['i'],
    stats: { power: 6.49, speed: 2.63, area: 4.65 },
    activeEnchants: ['Committed'],
    i18n: {
      'fr-FR': 'Bâton de croissance',
      'en-EN': 'Growing staff',
    },
  },
  Battlestaff_Unique2: {
    name: 'Battlestaff_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/BattlestaffofTerror.png',
    ancientHuntRunes: ['i', 'a'],
    stats: { power: 6.49, speed: 2.63, area: 3.68 },
    activeEnchants: ['Exploding'],
    i18n: {
      'fr-FR': 'Bâton de combat de la terreur',
      'en-EN': 'Battlestaff of terror',
    },
  },
};
