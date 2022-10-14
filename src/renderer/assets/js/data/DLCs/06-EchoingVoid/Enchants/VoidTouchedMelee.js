export default {
  dlc: 'Echoing Void',
  name: 'VoidTouchedMelee',
  type: ['Melee'],
  tier: 'Powerful',
  image: 'static/img/Enchants/VoidStrikeMelee.png',
  i18n: {
    'fr-FR': {
      name: 'Frappe du vide',
      desc: 'Attaquer une cible applique un multiplicateur de dégâts qui augmente progressivement jusqu\'à un niveau max, puis est retiré.',
      level: [
        'Multiplicateur de dégâts max de +200%',
        'Multiplicateur de dégâts max de +400%',
        'Multiplicateur de dégâts max de +600%',
      ],
    },
    'en-EN': {
      name: 'Void strike',
      desc: 'Attacking a target applies a damage multiplier that rises steadily to a max level, then is removed.',
      level: [
        '+200% max damage multiplier',
        '+400% max damage multiplier',
        '+600% max damage multiplier',
      ],
    },
  },
};
