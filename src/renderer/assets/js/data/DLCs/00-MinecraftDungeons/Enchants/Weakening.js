export default {
  name: 'Weakening',
  type: ['Melee', 'Ranged'],
  tier: 'Common',
  image: 'static/img/Enchants/Weakening.png',
  i18n: {
    'fr-FR': {
      name: 'Affaiblissement',
      desc: 'Vos attaques réduisent les points d\'attaque de tous les ennemis à proximité pendant cinq secondes.',
      level: [
        'Dégâts des ennemis réduits de -20%',
        'Dégâts des ennemis réduits de -30%',
        'Dégâts des ennemis réduits de -40%',
      ],
    },
    'en-EN': {
      name: 'Weakening',
      desc: 'Your attacks decrease the attack damage of all nearby enemies for five seconds.',
      level: [
        '-20% reduced damage',
        '-30% reduced damage',
        '-40% reduced damage',
      ],
    },
  },
};
