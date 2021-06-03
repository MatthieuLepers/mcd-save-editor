export default {
  Sickles: {
    name: 'Sickles',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/Sickles.png',
    ancientHuntRunes: ['i'],
    stats: { power: 3.5, speed: 5.3, area: 1.7 },
    i18n: {
      'fr-FR': 'Faucilles',
      'en-EN': 'Sickles',
    },
  },
  Sickles_Unique1: {
    name: 'Sickles_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/Nightmare\'sBite.png',
    ancientHuntRunes: ['i'],
    stats: { power: 3.5, speed: 5.3, area: 1.7 },
    activeEnchants: ['PoisonedMelee'],
    i18n: {
      'fr-FR': 'Morsure du cauhcemar',
      'en-EN': 'Nightmare\'s bite',
    },
  },
  Sickles_Unique2: {
    name: 'Sickles_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/TheLastLaugh.png',
    ancientHuntRunes: ['i', 'a'],
    stats: { power: 3.5, speed: 5.3, area: 1.7 },
    i18n: {
      'fr-FR': 'Le dernier rire',
      'en-EN': 'The last laungh',
    },
  },
};
