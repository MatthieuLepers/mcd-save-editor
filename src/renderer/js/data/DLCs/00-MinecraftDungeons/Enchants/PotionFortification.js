export default {
  name: 'PotionFortification',
  type: ['Armor'],
  tier: 'Common',
  image: 'static/img/Enchants/PotionBarrier.png',
  i18n: {
    'fr-FR': {
      name: 'Barrière de potion',
      desc: 'Quand vous utilisez une potion de soin, vous subissez -90% de dégâts pendant une courte période.',
      level: [
        'Durée de 5 secondes',
        'Durée de 7 secondes',
        'Durée de 9 secondes',
      ],
    },
    'en-EN': {
      name: 'Potion barrier',
      desc: 'Whenever you use a healing potion, you take -90% damage for a short duration.',
      level: [
        '5 seconds duration',
        '7 seconds duration',
        '9 seconds duration',
      ],
    },
  },
};
