export default {
  DoubleAxe: {
    name: 'DoubleAxe',
    type: 'Melee',
    rarity: ['Common', 'Rare'],
    image: 'img/Items/MeleeWeapons/DoubleAxe.png',
    ancientHuntRunes: ['i', 't'],
    stats: { power: 8.69, speed: 1.89, area: 12.93 },
    i18n: {
      'fr-FR': 'Labrys',
      'en-EN': 'Double axe',
    },
  },
  DoubleAxe_Unique1: {
    name: 'DoubleAxe_Unique1',
    type: 'Melee',
    rarity: ['Unique'],
    image: 'img/Items/MeleeWeapons/Whirlwind.png',
    ancientHuntRunes: ['i', 't', 'a'],
    stats: { power: 8.69, speed: 1.89, area: 12.93 },
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
    image: 'img/Items/MeleeWeapons/CursedAxe.png',
    ancientHuntRunes: ['i', 't', 'a'],
    stats: { power: 8.69, speed: 1.89, area: 12.93 },
    activeEnchants: ['Exploding'],
    i18n: {
      'fr-FR': 'Hache maudite',
      'en-EN': 'Cursed axe',
    },
  },
};
