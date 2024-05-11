<template>
  <section class="CorruptedDataPage" v-if="State.currentError">
    <h1>{{ t('MCD.DataCorruption.Page.title') }}</h1>
    <div class="CorruptedDataPageErrorContainer">
      <h2>
        {{ t('MCD.DataCorruption.Page.errorCount', [state.currentErrorIndex + 1, State.corruptionData.length]) }}
      </h2>
      <codemirror
        :modelValue="state.currentErrorSourceCode"
        :style="{ flex: '0 0 calc(50% - 8px)', height: '420px' }"
        :tabSize="2"
        :extensions="[json(), oneDark]"
        :disabled="true"
      />
      <div class="CorruptedDataPageInfos">
        <p>
          {{ State.currentError.error.message }}<br />
          at line {{ State.currentError.getLine() }}
        </p>

        <h2>{{ t('MCD.DataCorruption.Fixup.title') }}</h2>
        <ol class="CorruptedDataPageFixupList">
          <li
            v-for="(action, i) in State.currentError.getFixup()"
            :key="i"
          >
            <MaterialButton
              :modifiers="{ danger: true }"
              @click="() => { action.apply(); actions.reset(); }"
            >
              {{ action.label }}
            </MaterialButton>
          </li>
        </ol>

        <div class="CorruptedDataPageActions">
          <MaterialButton
            v-if="state.currentErrorIndex > 0"
            :modifiers="{ secondary: true }"
            @click="state.currentErrorIndex -= 1"
          >
            {{ t('MCD.DataCorruption.Page.prevButtonLabel') }}
          </MaterialButton>
          <MaterialButton
            v-if="state.currentErrorIndex < State.corruptionData.length - 1"
            :modifiers="{ secondary: true }"
            @click="state.currentErrorIndex += 1"
          >
          {{ t('MCD.DataCorruption.Page.nextButtonLabel') }}
          </MaterialButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  reactive,
  computed,
  watch,
  onBeforeMount,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';

import { globalStore } from '@renderer/core/stores/GlobalStore';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';

defineOptions({ name: 'CorruptedDataPage' });

const router = useRouter();
const { t } = useI18n();

const state = reactive({
  currentErrorIndex: 0,
  currentErrorSourceCode: '',
});

const State = computed(() => {
  const corruptionData = globalStore.state.selectedCharacter.corrupted;
  const currentError = corruptionData[state.currentErrorIndex];

  return {
    corruptionData,
    currentError,
  };
});

const actions = {
  reset() {
    state.currentErrorIndex = 0;
    if (State.value.currentError) {
      state.currentErrorSourceCode = JSON.stringify(State.value.currentError.item, null, 2);
    }
    globalStore.state.selectedCharacter.softReload();
    if (!State.value.currentError) {
      router.push({ name: 'Home' });
      notificationStore.actions.success(t('MCD.DataCorruption.Fixup.success'));
    }
  },
};

watch(() => state.currentErrorIndex, () => {
  state.currentErrorSourceCode = JSON.stringify(State.value.currentError.item, null, 2);
});

onBeforeMount(() => {
  state.currentErrorSourceCode = JSON.stringify(State.value.currentError.item, null, 2);
});
</script>

<style lang="scss" src="./index.scss">
</style>
