export default {
  dlc: 'Echoing Void',
  name: 'VoidTouchedRanged',
  type: ['Ranged'],
  tier: 'Powerful',
  image: 'static/img/Enchants/.png', // TODO
  i18n: {
    'fr-FR': {
      name: 'Frappe du vide',
      desc: 'Attaquer une cible applique un multiplicateur de dégâts qui augmente progressivement jusqu\'à un niveau max, puis est retiré.',
      level: [
        'Multiplicateur de dégâts max de +100%',
        'Multiplicateur de dégâts max de +200%',
        'Multiplicateur de dégâts max de +300%',
      ],
    },
    'en-EN': {
      name: 'Void strike',
      desc: 'Attacking a target applies a damage multiplier that rises steadily to a max level, then is removed.',
      level: [
        '+100% max damage multiplier',
        '+200% max damage multiplier',
        '+300% max damage multiplier',
      ],
    },
  },
};
