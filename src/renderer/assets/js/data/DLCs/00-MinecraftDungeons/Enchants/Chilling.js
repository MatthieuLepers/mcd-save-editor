export default {
  name: 'Chilling',
  type: ['Armor'],
  tier: 'Powerful',
  image: 'static/img/Enchants/Chilling.png',
  i18n: {
    'fr-FR': {
      name: 'Glacial',
      desc: 'Émet un souffle toutes les deux secondes, qui réduit les vitesses d\'attaque et de déplacement des ennemies proches pendant une seconde.',
      level: [
        'Vitesse réduite de -20%',
        'Vitesse réduite de -40%',
        'Vitesse réduite de -60%',
      ],
    },
    'en-EN': {
      name: 'Chilling',
      desc: 'Emits a blast every two seconds that reduces the movement and attack speed of nearby enemies for one second.',
      level: [
        '-20% reduced speed',
        '-40% reduced speed',
        '-60% reduced speed',
      ],
    },
  },
};
