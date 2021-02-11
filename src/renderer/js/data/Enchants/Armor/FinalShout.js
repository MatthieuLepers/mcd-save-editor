export default {
  name: 'FinalShout',
  type: ['Armor'],
  tier: 'Powerful',
  image: 'static/img/Enchants/FinalShout.png',
  i18n: {
    'fr-FR': {
      name: 'Cri ultime',
      desc: 'Lorsque votre santé descend en dessous de 25%, tous vos artéfacts sont utilisés (sans tenir compte des temps de recharge).',
      level: [
        'Utilisable toutes les 12 secondes',
        'Utilisable toutes les 10 secondes',
        'Utilisable toutes les 8 secondes',
      ],
    },
    'en-EN': {
      name: 'Final shout',
      desc: 'When your health drops below 25%, all your artifacts are used (ignoring cooldown periods).',
      level: [
        'Up to every 12th second',
        'Up to every 10th second',
        'Up to every 8th second',
      ],
    },
  },
};
