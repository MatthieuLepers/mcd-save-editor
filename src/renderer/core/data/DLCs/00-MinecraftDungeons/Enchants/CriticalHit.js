export default {
  name: 'CriticalHit',
  type: ['Melee', 'Ranged'],
  tier: 'Powerful',
  image: 'img/Enchants/CriticalHit.png',
  i18n: {
    'fr-FR': {
      name: 'Coup critique',
      desc: 'Vous donne une chance d\'infliger des coups critiques infligeant triple dégats.',
      level: [
        '10% de chance de se déclencher',
        '15% de chance de se déclencher',
        '20% de chance de se déclencher',
      ],
    },
    'en-EN': {
      name: 'Critical hit',
      desc: 'Gives you a chance to inflict critical hits dealing triple damage.',
      level: [
        '10% chance to trigger',
        '15% chance to trigger',
        '20% chance to trigger',
      ],
    },
  },
};
