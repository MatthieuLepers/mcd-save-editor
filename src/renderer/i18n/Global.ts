import TutorialsData from '@/renderer/i18n/Tutorial/index';

export default {
  TutorialsData: (lang: string) => Object
    .entries(TutorialsData)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
};
