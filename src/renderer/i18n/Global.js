import AncientMobsData from '../js/data/AncientMobs';
import ArmorPropertiesData from '../js/data/ArmorProperties';
import EnchantsData from '../js/data/Enchants';
import ItemsData from '../js/data/Items';
import TutorialsData from './Tutorial/index';

export default {
  AncientMobsData: lang => Object.entries(AncientMobsData).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
  ArmorProperties: lang => Object.entries(ArmorPropertiesData).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
  Enchants: lang => Object.entries(EnchantsData).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
  Items: lang => Object.entries(ItemsData).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
  TutorialsData: lang => Object.entries(TutorialsData).reduce((acc, [key, value]) => ({ ...acc, [key]: value.i18n[lang] }), {}),
};
