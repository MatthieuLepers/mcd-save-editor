export default {
  name: 'BonusShot',
  type: ['Ranged'],
  tier: 'Common',
  image: 'img/Enchants/BonusShot.png',
  i18n: {
    'fr-FR': {
      name: 'Tir bonus',
      desc: 'Le tir déclanche un second tir vers un ennemi proche. Ce second tir inflige moins de dégâts.',
      level: [
        '10% de dégats par tir',
        '17% de dégats par tir',
        '24% de dégats par tir',
      ],
    },
    'en-EN': {
      name: 'Bonus shot',
      desc: 'Firing a shot also fires a second shot at a nearby enemy. The second shot has reduced damage.',
      level: [
        '10% damage per shot',
        '17% damage per shot',
        '24% damage per shot',
      ],
    },
  },
};
