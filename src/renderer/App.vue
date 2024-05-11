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
        v-for="(character, i) in globalStore.state.selectedProfil.characters"
        :key="`navspan${i}`"
        v-slot:[`${character.uuid}Nav`]
      >
        <span>
          {{ character.data.name || t('App.tabs.unamedCharacter') }}
        </span>
        <div class="CharacterActionContainer" :key="`actionctn${i}`">
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
        v-for="(character, i) in globalStore.state.selectedProfil.characters"
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

  <MaterialNotificationList />
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

import MaterialAppTitleBar from '@renderer/components/AppTitleBar/index.vue';
import MaterialTabs from '@renderer/components/Materials/Tabs/index.vue';
import MaterialNotificationList from '@renderer/components/Materials/Notification/List.vue';
import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import AppNavigation from '@renderer/components/App/Navigation/index.vue';
import Tutorial from '@renderer/components/Tutorial/index.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import { modalStore } from '@renderer/components/Materials/Modal/Store';
import { settingsStore } from '@renderer/core/entities/setting/store';
import Shortcut from '@renderer/core/Shortcut';

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

watch(() => state.currentTab, (newTab) => {
  globalStore.setters.setCharacter(globalStore.state.selectedProfil.characters.find((ch) => ch.uuid === newTab));
});

onBeforeMount(() => {
  api.on('database-ready', async () => {
    await settingsStore.actions.load();

    await api.invoke('localeChange', settingsStore.actions.getString('locale'));
    locale.value = settingsStore.actions.getString('locale');
  });
});

onMounted(() => {
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
  }
});
</script>

<style lang="scss" src="~styles/style.scss">
</style>
