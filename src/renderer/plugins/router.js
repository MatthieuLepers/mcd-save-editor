import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/HomePage/index';
import AncientHuntsPage from '@/views/AncientHuntsPage/index';
import TowerPage from '@/views/Tower/index';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/ancient-hunts', name: 'AncientHunts', component: AncientHuntsPage },
    { path: '/tower', name: 'Tower', component: TowerPage },
  ],
});
