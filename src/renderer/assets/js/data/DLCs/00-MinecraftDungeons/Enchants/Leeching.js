export default {
  name: 'Leeching',
  type: ['Melee'],
  tier: 'Common',
  image: 'static/img/Enchants/Leeching.png',
  i18n: {
    'fr-FR': {
      name: 'Vampirisme',
      desc: 'Vaincre une créature vous soigne à raison d\'une petite partie de la vie max de celle-ci.',
      level: [
        '5% de la vie maximale de la créature',
        '7% de la vie maximale de la créature',
        '9% de la vie maximale de la créature',
      ],
    },
    'en-EN': {
      name: 'Leeching',
      desc: 'Defeating a mob heals you a small portion of the mob\'s max health.',
      level: [
        '5% of mob max health',
        '7% of mob max health',
        '9% of mob max health',
      ],
    },
  },
};
