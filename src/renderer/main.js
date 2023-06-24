import 'regenerator-runtime/runtime';
import Vue from 'vue';

import App from './App';
import i18n from './plugins/i18n';
import router from './plugins/router';
import GenerateModifiers from './plugins/GenerateModifiers';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.use(GenerateModifiers);

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
  router,
  i18n,
}).$mount('#app');
