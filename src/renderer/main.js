import Vue from 'vue';
import VueI18n from 'vue-i18n';

import App from './App';
import I18N from './i18n/index';
import AppSettings from './js/AppSettings';
import router from './router';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: AppSettings.language, // set locale
  messages: I18N, // set locale messages
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
  router,
  i18n,
}).$mount('#app');
