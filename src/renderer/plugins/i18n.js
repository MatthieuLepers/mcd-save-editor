import Vue from 'vue';
import VueI18n from 'vue-i18n';
import I18N from '../i18n/index';
import AppSettings from '../assets/js/AppSettings';

Vue.use(VueI18n);

export default new VueI18n({
  locale: AppSettings.language, // set locale
  messages: I18N, // set locale messages
});
