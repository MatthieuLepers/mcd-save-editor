export default {
  PhantomArmor: {
    name: 'PhantomArmor',
    type: 'Armor',
    rarity: ['Common', 'Rare'],
    image: 'static/img/Items/Armors/PhantomArmor.png',
    ancientHuntRunes: ['o', 'r'],
    soulgathering: true,
    armorproperties: [
      'SoulGatheringBoost',
      'RangedDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Armure de phantom',
      'en-EN': 'Phantom armor',
    },
  },
  PhantomArmor_Unique1: {
    name: 'PhantomArmor_Unique1',
    type: 'Armor',
    rarity: ['Unique'],
    image: 'static/img/Items/Armors/FrostBite.png',
    ancientHuntRunes: ['o', 's', 'r'],
    activeEnchants: ['Snowing'],
    soulgathering: true,
    armorproperties: [
      'SoulGatheringBoost',
      'RangedDamageBoost',
    ],
    i18n: {
      'fr-FR': 'Morsure du froid',
      'en-EN': 'Frost bite',
    },
  },
};
