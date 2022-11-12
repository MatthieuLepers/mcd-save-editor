<template>
  <div id="app">
    <TitleBar :btnMaximize="false" :appTitle="`Save editor for MCD ≤ ${mcdVersion}`" @help="showTutorial = true" />
    <main v-if="ready" class="Page">
      <Tabs :tabs="tabs" v-if="tabs.length" @tabChanged="handleTabChanged">
        <template v-slot:[`nav${character.uuid}`] v-for="(character, i) in GlobalStore.selectedProfil.characters">
          <span :key="`navspan${i}`">{{ character.$data.name || $t('App.tabs.unamedCharacter') }}</span>
          <div class="CharacterActionContainer" :key="`actionctn${i}`">
            <button :title="$t('App.tabs.edit.label')" class="CharacterAction CharacterActionEditName" @click="ModalStore.showModal('EditButtonModal')">
              <i class="icon-edit"></i>
            </button>
            <Modal
              name="EditButtonModal"
              :title="$t('App.tabs.edit.modal.title')"
              :okCancel="true"
              :okLabel="$t('App.tabs.edit.modal.okLabel')"
              :cancelLabel="$t('App.tabs.edit.modal.cancelLabel')"
              size="sm"
              @confirm="ModalStore.hideModal('EditButtonModal')"
            >
              <input v-model="character.$data.name"/>
            </Modal>
            <button
              class="CharacterAction CharacterActionReload"
              :class="{loading: loadingTabs.includes(character.id)}"
              :title="$t('App.tabs.reload.label')"
              :disabled="loadingTabs.includes(character.id)"
              @click="reload(character)"
            >
              <i class="icon-reload"></i>
            </button>
            <button
              class="CharacterAction CharacterActionSave"
              :title="$t('App.tabs.save.label')"
              :disabled="savingTabs.includes(character.id)"
              @click="save(character)"
            >
              <i class="icon-save"></i>
            </button>
          </div>
        </template>
        <template v-slot:[character.uuid] v-for="(character, i) in GlobalStore.selectedProfil.characters">
          <router-view :key="`character${i}`" :character="character" />
        </template>
      </Tabs>
      <div v-else class="WaitBloc">
        {{ $t('App.noProfilFound') }}
      </div>
    </main>
    <main v-else class="Page WaitBloc">
      {{ $t('App.loadingProfils') }}
    </main>

    <NotificationList />
    <Tutorial v-if="ready" v-model="showTutorial" />
    <AppNavigation />
  </div>
</template>

<script>
import GlobalStore from '@/assets/js/stores/GlobalStore';
import AppSettings from '@/assets/js/AppSettings';
import TutorialStore from '@/assets/js/tutorial/Store';

import AppNavigation from '@/components/App/Navigation/index';
import TitleBar from '@/components/TitleBar/index';
import Tabs from '@/components/Tabs/index';
import NotificationList from '@/components/Notification/List';
import NotificationStore from '@/components/Notification/NotificationStore';
import Tutorial from '@/components/Tutorial/index';

import Modal from '@/components/Modal/index';
import ModalStore from '@/components/Modal/Store';

/*
 * Data from :
 * - https://minecraft.fandom.com/fr/wiki/Minecraft_Dungeons
 * - https://dungeoncollector.co.uk/
 */
export default {
  name: 'MCDSaveEditor',
  components: { TitleBar, AppNavigation, Tabs, NotificationList, Tutorial, Modal },
  data() {
    return {
      showTutorial: AppSettings.firstStart,
      ready: false,
      mcdVersion: '1.15.1.0',
      TutorialStore,
      loadingTabs: [],
      savingTabs: [],
      GlobalStore,
      ModalStore,
      notifier: NotificationStore,
    };
  },
  methods: {
    reload(character) {
      this.loadingTabs.push(character.id);
      character.reload()
        .then(() => {
          this.notifier.success(this.$t('App.tabs.reload.success'));
        })
        .catch(() => {
          this.notifier.error(this.$t('App.tabs.reload.error'));
        })
        .finally(() => {
          this.loadingTabs.splice(this.loadingTabs.indexOf(character.id), 1);
        })
      ;
    },
    save(character) {
      if (!character.$corrupted.length) {
        this.savingTabs.push(character.id);
        character.save()
          .then((success) => {
            if (success) {
              this.notifier.success(this.$t('App.tabs.save.success'));
            } else {
              this.notifier.error(this.$t('App.tabs.save.error'));
            }
          })
          .catch(() => {
            this.notifier.error(this.$t('App.tabs.save.error'));
          })
          .finally(() => {
            this.savingTabs.splice(this.savingTabs.indexOf(character.id), 1);
          })
        ;
      } else {
        this.notifier.error(this.$t('App.tabs.save.corruptedError'));
      }
    },
    handleTabChanged(tabIndex) {
      GlobalStore.selectedCharacter = GlobalStore.selectedProfil.characters[tabIndex];
    },
  },
  computed: {
    tabs() {
      if (GlobalStore.profilList.length) {
        return GlobalStore.selectedProfil.characters.map((character) => ({ name: character.uuid, label: character.$data.name }));
      }
      return [];
    },
  },
  mounted() {
    if (GlobalStore.profilList.length) {
      Promise
        .all(GlobalStore.profilList.map((profil) => profil.fetchCharacters()))
        .then((profilList) => {
          this.ready = true;
          [GlobalStore.selectedProfil] = profilList;
        })
      ;
    } else {
      this.ready = true;
    }
  },
};
</script>

<style lang="scss" src="./assets/scss/style.scss">
</style>
