export default {
  Battlestaff: {
    name: 'Battlestaff',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/BattleStaff.png',
    ancientHuntRunes: ['i'],
    stats: { power: 7.5, speed: 3.1, area: 3.9 },
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
    stats: { power: 7.5, speed: 2.8, area: 3.9 },
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
    stats: { power: 7.5, speed: 2.8, area: 4.9 },
    activeEnchants: ['Exploding'],
    i18n: {
      'fr-FR': 'Bâton de combat de la terreur',
      'en-EN': 'Battlestaff of terror',
    },
  },
};
