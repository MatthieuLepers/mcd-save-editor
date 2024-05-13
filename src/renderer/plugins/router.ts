import { createWebHashHistory, createRouter } from 'vue-router';

import HomePage from '@renderer/views/HomePage/index.vue';
import StorageChestPage from '@renderer/views/StorageChestPage/index.vue';
import AncientHuntsPage from '@renderer/views/AncientHuntsPage/index.vue';
import CorruptedDataPage from '@renderer/views/CorruptedDataPage/index.vue';
import TowerPage from '@renderer/views/Tower/index.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/storage-chest', name: 'StorageChest', component: StorageChestPage },
  { path: '/ancient-hunts', name: 'AncientHunts', component: AncientHuntsPage },
  { path: '/corrupted-data', name: 'CorruptedData', component: CorruptedDataPage },
  { path: '/tower', name: 'Tower', component: TowerPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
