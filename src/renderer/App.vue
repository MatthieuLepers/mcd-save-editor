<template>
  <MaterialAppTitleBar
    name="main"
    :appTitle="`Save editor for MCD ≤ ${state.mcdVersion}`"
    :showHelp="globalStore.actions.enableTutorialOnRoute(route)"
    @help="state.showTutorial = true"
  />
  <main v-if="state.ready" class="Page">
    <MaterialTabs
      v-if="!State.tabs.length"
      v-model="state.currentTab"
      :tabs="State.tabs"
      @allowMoveFn="() => false">
      <template
        v-for="(character, i) in globalStore.state.selectedProfil?.characters ?? []"
        :key="`navspan${i}`"
        v-slot:[`${character.uuid}Nav`]
      >
        <span>
          {{ character.data.name || t('App.tabs.unamedCharacter') }}
        </span>
        <div v-if="!globalStore.state.isDemo" class="CharacterActionContainer">
          <button
            :title="t('App.tabs.edit.label')"
            class="CharacterAction CharacterActionEditName"
            @click="modalStore.actions.show('EditButtonModal')"
          >
            <i class="icon-edit"></i>
          </button>
          <MaterialModal
            name="EditButtonModal"
            :title="t('App.tabs.edit.modal.title')"
            :acceptLabel="t('App.tabs.edit.modal.okLabel')"
            :refuseLabel="t('App.tabs.edit.modal.cancelLabel')"
            :modifiers="{ xs: true }"
          >
            <input v-model="character.data.name"/>
          </MaterialModal>
          <button
            class="CharacterAction CharacterActionReload"
            :class="{ loading: state.loadingTabs.includes(character.id) }"
            :title="t('App.tabs.reload.label')"
            :disabled="state.loadingTabs.includes(character.id)"
            @click="actions.reload(character)"
          >
            <i class="icon-reload"></i>
          </button>
          <button
            class="CharacterAction CharacterActionSave"
            :title="t('App.tabs.save.label')"
            :disabled="state.savingTabs.includes(character.id)"
            @click="actions.save(character)"
          >
            <i class="icon-save"></i>
          </button>
        </div>
      </template>
      <template
        v-for="(character, i) in globalStore.state.selectedProfil?.characters ?? []"
        v-slot:[character.uuid]
        :key="`character${i}`"
      >
        <router-view :character="character" />
      </template>
    </MaterialTabs>
    <div v-else class="WaitBloc">
      {{ t('App.noProfilFound') }}
    </div>
  </main>
  <main v-else class="Page WaitBloc">
    {{ t('App.loadingProfils') }}
  </main>

  <MaterialNotificationList>
    <template #downloadupdate="{ notification }">
      {{ notification.text }}
      <MaterialProgressBar
        class="app__progress-bar"
        :percent="state.percent"
      />
    </template>
  </MaterialNotificationList>
  <Tutorial v-if="state.ready" v-model="state.showTutorial" />
  <AppNavigation />
</template>

<script setup>
/*
 * Data from :
 * - https://minecraft.fandom.com/fr/wiki/Minecraft_Dungeons
 * - https://dungeoncollector.co.uk/
 */

import {
  reactive,
  computed,
  onBeforeMount,
  onMounted,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import MaterialAppTitleBar from '@renderer/components/App/TitleBar/index.vue';
import MaterialTabs from '@renderer/components/Materials/Tabs/index.vue';
import MaterialNotificationList from '@renderer/components/Materials/Notification/List.vue';
import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import MaterialProgressBar from '@renderer/components/Materials/ProgressBar/index.vue';
import AppNavigation from '@renderer/components/App/Navigation/index.vue';
import Tutorial from '@renderer/components/Tutorial/index.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import { modalStore } from '@renderer/components/Materials/Modal/Store';
import { settingsStore } from '@renderer/core/entities/setting/store';
import Shortcut from '@renderer/core/Shortcut';
import { dlcsStore } from '@renderer/core/entities/dlc/store';
import { eventsStore } from '@renderer/core/entities/event/store';
import { armorPropertiesStore } from '@renderer/core/entities/armorProperty/store';
import { enchantsStore } from '@renderer/core/entities/enchant/store';
import { itemsStore } from '@renderer/core/entities/item/store';
import { ancientMobsStore } from '@renderer/core/entities/ancientMob/store';

const route = useRoute();
const { locale, t } = useI18n();

const state = reactive({
  showTutorial: false,
  ready: false,
  mcdVersion: '1.17.0.0',
  loadingTabs: [],
  savingTabs: [],
  currentTab: null,
});

const State = computed(() => ({
  tabs: globalStore.state.profilList.length
    ? globalStore.state.selectedProfil.characters.reduce((acc, character) => ({
      ...acc,
      [character.uuid]: {
        label: character.data.name,
      },
    }), {})
    : [],
}));

const actions = {
  reload(character) {
    state.loadingTabs.push(character.id);
    character.reload()
      .then(() => {
        notificationStore.actions.success(t('App.tabs.reload.success'));
      })
      .catch(() => {
        notificationStore.actions.error(t('App.tabs.reload.error'));
      })
      .finally(() => {
        state.loadingTabs.splice(state.loadingTabs.indexOf(character.id), 1);
      })
    ;
  },
  save(character) {
    if (!character.corrupted.length) {
      state.savingTabs.push(character.id);
      character.save()
        .then((success) => {
          if (success) {
            notificationStore.actions.success(t('App.tabs.save.success'));
          } else {
            notificationStore.actions.error(t('App.tabs.save.error'));
          }
        })
        .catch(() => {
          notificationStore.actions.error(t('App.tabs.save.error'));
        })
        .finally(() => {
          state.savingTabs.splice(state.savingTabs.indexOf(character.id), 1);
        })
      ;
    } else {
      notificationStore.actions.error(t('App.tabs.save.corruptedError'));
    }
  },
};

api.on('localeChange', (iso) => {
  locale.value = iso;
});

api.on('runShortcut', (shortcut) => {
  if (shortcut in Shortcut) {
    Shortcut[shortcut]();
  }
});

const updateAvailableNotification = {
  id: 'downloadupdate',
  type: 'info',
  text: t('App.Updater.downloadingUpdate'),
  delay: 0,
  action: {
    callback() {
      notificationStore.actions.removeNotification(updateAvailableNotification);
    },
    icon: 'icon-close',
  },
};

api.on('update-available', () => {
  notificationStore.actions.pushRawNotification(updateAvailableNotification);
});

api.on('download-progress', (percent) => {
  state.percent = percent / 100;
});

api.on('update-downloaded', () => {
  const notification = {
    type: 'success',
    text: t('App.Updater.readyToInstall'),
    delay: 0,
    action: {
      callback() {
        api.sendSync('quitAndInstallUpdate');
      },
      label: t('App.Updater.quitAndInstall'),
      icon: 'icon-export',
    },
  };
  notificationStore.actions.removeNotification(updateAvailableNotification);
  notificationStore.actions.pushRawNotification(notification);
});

watch(() => state.currentTab, (newTab) => {
  globalStore.setters.setCharacter(globalStore.state.selectedProfil.characters.find((ch) => ch.uuid === newTab));
});

onBeforeMount(() => {
  api.on('database-ready', async () => {
    await api.invoke('localeChange', settingsStore.actions.getString('locale'));
    locale.value = settingsStore.actions.getString('locale');
  });
});

onMounted(async () => {
  await settingsStore.actions.load();
  await ancientMobsStore.actions.load();
  await dlcsStore.actions.load();
  await eventsStore.actions.load();
  await armorPropertiesStore.actions.load();
  await enchantsStore.actions.load();
  await itemsStore.actions.load();

  if (globalStore.state.profilList.length) {
    Promise
      .all(globalStore.state.profilList.map((profil) => profil.fetchCharacters()))
      .then((profilList) => {
        state.ready = true;
        globalStore.setters.setProfil(profilList[0]);
        state.currentTab = globalStore.state.selectedCharacter.uuid;
      })
    ;
  } else {
    state.ready = true;
    globalStore.actions.loadDemoCharacter();
    state.currentTab = globalStore.state.selectedCharacter.uuid;
  }
});
</script>

<style lang="scss" src="~styles/style.scss">
</style>
