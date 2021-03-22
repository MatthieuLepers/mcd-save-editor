import Vue from 'vue';

import App from './App';
import i18n from './i18n';
import router from './router';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
  router,
  i18n,
}).$mount('#app');
