import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/HomePage/index';
import StorageChestPage from '@/views/StorageChestPage/index';
import AncientHuntsPage from '@/views/AncientHuntsPage/index';
import CorruptedDataPage from '@/views/CorruptedDataPage/index';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/storage-chest', name: 'StorageChest', component: StorageChestPage },
    { path: '/ancient-hunts', name: 'AncientHunts', component: AncientHuntsPage },
    { path: '/corrupted-data', name: 'CorruptedData', component: CorruptedDataPage },
  ],
});
