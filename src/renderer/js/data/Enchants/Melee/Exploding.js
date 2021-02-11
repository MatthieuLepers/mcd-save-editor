export default {
  name: 'Exploding',
  type: ['Melee'],
  tier: 'Powerful',
  image: 'static/img/Enchants/Exploding.png',
  i18n: {
    'fr-FR': {
      name: 'Explosion',
      desc: 'Les créatures explosent après avoir été vaincues.',
      level: [
        'Inflige 20% de dégâts équivalent aux points de vie de l\'ennemi.',
        'Inflige 40% de dégâts équivalent aux points de vie de l\'ennemi.',
        'Inflige 60% de dégâts équivalent aux points de vie de l\'ennemi.',
      ],
    },
    'en-EN': {
      name: 'Exploding',
      desc: 'Mobs explode after they are defeated.',
      level: [
        'Deals 20% of enemy health as damage',
        'Deals 40% of enemy health as damage',
        'Deals 60% of enemy health as damage',
      ],
    },
  },
};
