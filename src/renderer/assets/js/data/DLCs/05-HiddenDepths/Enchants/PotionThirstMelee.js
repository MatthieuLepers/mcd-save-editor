export default {
  dlc: 'Hidden Depths',
  name: 'PotionThirstMelee',
  type: ['Melee'],
  tier: 'Powerful',
  image: 'static/img/Enchants/RefreshmentMelee.png',
  i18n: {
    'fr-FR': {
      name: 'Ravitaillement',
      desc: 'Vaincre une créature réduit le temps de recharge de votre potion de soins, elle sera disponible plus rapidement.',
      level: [
        'Réduction du temps de recharge de 1 seconde',
        'Réduction du temps de recharge de 2 secondes',
        'Réduction du temps de recharge de 3 secondes',
      ],
    },
    'en-EN': {
      name: 'Refreshment',
      desc: 'Defeat a mob reduces your health potion\'s cooldown, allowing you to heal again more quickly.',
      level: [
        '1 second cooldown reduction',
        '2 seconds cooldown reduction',
        '3 seconds cooldown reduction',
      ],
    },
  },
};
