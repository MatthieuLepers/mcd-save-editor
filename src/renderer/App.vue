<template>
  <div id="app">
    <TitleBar :btnMaximize="false" :appTitle="`Save editor for MCD ≤ ${mcdVersion}`" @help="showTutorial = true" />
    <main v-if="ready">
      <Tabs :tabs="tabs" v-show="tabs.length" @tabChanged="handleTabChanged">
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
            <button :title="$t('App.tabs.reload.label')" class="CharacterAction CharacterActionReload" :class="{loading: loadingTabs.indexOf(character.id) >= 0}" @click="reload(character)">
              <i class="icon-reload"></i>
            </button>
            <button :title="$t('App.tabs.save.label')" class="CharacterAction CharacterActionSave" @click="save(character)">
              <i class="icon-save"></i>
            </button>
          </div>
        </template>
        <template v-slot:[character.uuid] v-for="(character, i) in GlobalStore.selectedProfil.characters">
          <MCDCharacter :key="`character${i}`" :character="character" />
        </template>
      </Tabs>
      <div v-if="!tabs.length" class="WaitBloc">
        {{ $t('App.noProfilFound') }}
      </div>
    </main>
    <main v-else class="WaitBloc">
      {{ $t('App.loadingProfils') }}
    </main>

    <NotificationList />
    <Tutorial v-if="ready" v-model="showTutorial" />
  </div>
</template>

<script>
import GlobalStore from '@/js/stores/GlobalStore';
import AppSettings from '@/js/AppSettings';

import Tabs from '@/components/Tabs/index';
import TitleBar from '@/components/TitleBar/index';
import MCDCharacter from '@/components/MCD/Character';
import NotificationList from '@/components/Notification/List';
import NotificationStore from '@/components/Notification/NotificationStore';
import Tutorial from '@/components/Tutorial/index';

import Modal from '@/components/Modal/index';
import ModalStore from '@/components/Modal/Store';

export default {
  name: 'MCDSaveEditor',
  components: { TitleBar, Tabs, MCDCharacter, NotificationList, Tutorial, Modal },
  data() {
    return {
      ready: false,
      loadingTabs: [],
      GlobalStore,
      ModalStore,
      notifier: NotificationStore,
      showTutorial: AppSettings.firstStart,
      mcdVersion: '1.7.3.0',
    };
  },
  methods: {
    reload(character) {
      this.loadingTabs.push(character.id);
      character.reload()
        .then(() => {
          this.loadingTabs.splice(this.loadingTabs.indexOf(character.id), 1);
          this.notifier.success(this.$t('App.tabs.reload.success'));
        })
        .catch(() => {
          this.loadingTabs.splice(this.loadingTabs.indexOf(character.id), 1);
          this.notifier.error(this.$t('App.tabs.reload.error'));
        })
      ;
    },
    save(character) {
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
      ;
    },
    handleTabChanged(tabIndex) {
      GlobalStore.selectedCharacter = GlobalStore.selectedProfil.characters[tabIndex];
    },
  },
  computed: {
    tabs() {
      if (GlobalStore.profilList.length) {
        return GlobalStore.selectedProfil.characters.map(character => ({ name: character.uuid, label: character.$data.name }));
      }
      return [];
    },
  },
  mounted() {
    if (GlobalStore.profilList.length) {
      Promise
        .all(GlobalStore.profilList.map(profil => profil.fetchCharacters()))
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