export default {
  name: 'Snowing',
  type: ['Armor'],
  tier: 'Common',
  image: 'img/Enchants/Snowball.png',
  i18n: {
    'fr-FR': {
      name: 'Boule de neige',
      desc: 'Projette une boulle de neige vers un ennemie à proximité, l\'étourdissant brièvement.',
      level: [
        'Se déclenche toutes les 5 secondes',
        'Se déclenche toutes les 3 secondes',
        'Se déclenche toutes les seconde',
      ],
    },
    'en-EN': {
      name: 'Snowball',
      desc: 'Fires a snowball at a nearby enemy every few seconds, briefly stunning it.',
      level: [
        'Triggers every 5 seconds',
        'Triggers every 3 seconds',
        'Triggers every second',
      ],
    },
  },
};
