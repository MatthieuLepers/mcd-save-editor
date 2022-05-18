export default {
  ExplodingCrossbow: {
    name: 'ExplodingCrossbow',
    type: 'Ranged',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/RangedWeapons/ExplodingCrossbow.png',
    ancientHuntRunes: ['i'],
    stats: { power: 12.27, speed: 1, ammo: 1 },
    i18n: {
      'fr-FR': 'Arbalète explosive',
      'en-EN': 'Exploding crossbow',
    },
  },
  ExplodingCrossbow_Unique1: {
    name: 'ExplodingCrossbow_Unique1',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/ImplodingCrossbow.png',
    ancientHuntRunes: ['i', 'a'],
    stats: { power: 12.27, speed: 1, ammo: 1 },
    activeEnchants: ['Gravity'],
    i18n: {
      'fr-FR': 'Arbalète qui implose',
      'en-EN': 'Imploding crossbow',
    },
  },
  ExplodingCrossbow_Unique2: {
    name: 'ExplodingCrossbow_Unique2',
    type: 'Ranged',
    rarity: ['Unique'],
    image: 'static/img/Items/RangedWeapons/FireboltThrower.png',
    ancientHuntRunes: ['i'],
    stats: { power: 12.27, speed: 1, ammo: 1 },
    activeEnchants: ['ChainReaction'],
    i18n: {
      'fr-FR': 'Lanceur de carreaux enflammés',
      'en-EN': 'Firebolt thrower',
    },
  },
};
