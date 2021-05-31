export default {
  DoubleAxe: {
    name: 'DoubleAxe',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/MeleeWeapons/DoubleAxe.png',
    ancientHuntRunes: ['i', 't'],
    stats: { power: 9.9, speed: 2.1, area: 14 },
    i18n: {
      'fr-FR': 'Labrys',
      'en-EN': 'Double axe',
    },
  },
  DoubleAxe_Unique1: {
    name: 'DoubleAxe_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/Whirlwind.png',
    ancientHuntRunes: ['i', 't', 'a'],
    stats: { power: 9.9, speed: 2, area: 14 },
    activeEnchants: ['Shockwave'],
    i18n: {
      'fr-FR': 'Tourbillons',
      'en-EN': 'Whirlwind',
    },
  },
  DoubleAxe_Unique2: {
    name: 'DoubleAxe_Unique2',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'static/img/Items/MeleeWeapons/CursedAxe.png',
    ancientHuntRunes: ['i', 't', 'a'],
    stats: { power: 9.9, speed: 2.1, area: 14 },
    activeEnchants: ['Exploding'],
    i18n: {
      'fr-FR': 'Hache maudite',
      'en-EN': 'Cursed axe',
    },
  },
};
