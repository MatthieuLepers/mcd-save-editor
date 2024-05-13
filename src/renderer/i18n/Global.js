import TutorialsData from '@renderer/i18n/Tutorial/index';
import TowerChallenges from '@renderer/core/data/Tower/Challenges';
import TowerBosses from '@renderer/core/data/Tower/Bosses';
import TowerMerchants from '@renderer/core/data/Tower/Merchants';

export default {
  TutorialsData: (lang) => Object.entries(TutorialsData).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
  TowerChallengesData: (lang) => Object.entries(TowerChallenges).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
  TowerBossesData: (lang) => Object.entries(TowerBosses).reduce((acc, [key, value]) => ({ ...acc, [key]: value[lang] }), {}),
  TowerMerchantsData: (lang) => Object.entries(TowerMerchants).reduce((acc, [key, value]) => ({ ...acc, [key]: value[lang] }), {}),
};
