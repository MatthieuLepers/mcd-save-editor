export default {
  name: 'RadianceMelee',
  type: ['Melee'],
  tier: 'Powerful',
  image: 'static/img/Enchants/RadianceMelee.png',
  i18n: {
    'fr-FR': {
      name: 'Flamboyance',
      desc: 'A une chance de 20% de créer une zone circulaire qui soigne les alliés qui s\'y trouvent.',
      level: [
        '{AMOUNT} de régénération de santé',
        '{AMOUNT} de régénération de santé',
        '{AMOUNT} de régénération de santé',
      ],
    },
    'en-EN': {
      name: 'Radiance',
      desc: 'Has a 20% chance to spawn a circular area that heals all allies within it.',
      level: [
        '{AMOUNT} health healed',
        '{AMOUNT} health healed',
        '{AMOUNT} health healed',
      ],
    },
  },
};
