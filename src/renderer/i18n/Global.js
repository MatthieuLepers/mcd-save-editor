import AncientMobsData from '@renderer/core/data/AncientMobs';
import { ArmorProperties, Enchants, Items } from '@renderer/core/data/Content';
import TutorialsData from '@renderer/i18n/Tutorial/index';

export default {
  AncientMobsData: (lang) => Object.entries(AncientMobsData).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
  ArmorProperties: (lang) => Object.entries(ArmorProperties).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
  Enchants: (lang) => Object.entries(Enchants).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
  Items: (lang) => Object.entries(Items).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
  TutorialsData: (lang) => Object.entries(TutorialsData).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
};
