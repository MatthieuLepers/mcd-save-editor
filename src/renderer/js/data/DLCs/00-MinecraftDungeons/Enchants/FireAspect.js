export default {
  name: 'FireAspect',
  type: ['Melee', 'Ranged'],
  tier: 'Common',
  image: 'static/img/Enchants/FireAspect.png',
  i18n: {
    'fr-FR': {
      name: 'Aura de feu',
      desc: 'Met le feu aux créatures pour trois secondes, ce qui inflige des dégâts au fil du temps.',
      level: [
        '{AMOUNT} de dégâts par seconde',
        '{AMOUNT} de dégâts par seconde',
        '{AMOUNT} de dégâts par seconde',
      ],
    },
    'en-EN': {
      name: 'Fire aspect',
      desc: 'Sets mobs on fire for three seconds, dealing damage over time.',
      level: [
        '{AMOUNT} damage per second',
        '{AMOUNT} damage per second',
        '{AMOUNT} damage per second',
      ],
    },
  },
};
