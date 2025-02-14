<template>
  <div :class="GenerateModifiers('view', { main: true })">
    <AppTitleBar name="main" />
    <main>
      <MaterialTabs
        v-model="state.currentTab"
        v-model:tabs="state.tabs"
      >
        <template v-slot:select>
          <UiKitFormSelect />
        </template>
        <template v-slot:list>
          <UiKitObjectList />
        </template>
        <template v-slot:apple>
          <MaterialButton
            icon="icon-info"
            :modifiers="{ secondary: true }"
            @click="actions.notify('info')"
          >
            Info notification
          </MaterialButton>
          <MaterialButton
            icon="icon-check"
            :modifiers="{ success: true }"
            @click="actions.notify('success')"
          >
            Success notification
          </MaterialButton>
          <MaterialButton
            icon="icon-warning"
            :modifiers="{ warning: true }"
            @click="actions.notify('warning')"
          >
            Warning notification
          </MaterialButton>
          <MaterialButton
            icon="icon-close"
            :modifiers="{ danger: true }"
            @click="actions.notify('error')"
          >
            Danger notification
          </MaterialButton>

          <DataTable
            :data="state.data"
            :columns="State.columns"
          >
            <template v-slot:actionColumnInner>
              <DataTableButton
                label="Test"
                icon="icon-close"
                :modifiers="{ longRound: true }"
              />
            </template>
          </DataTable>
        </template>
      </MaterialTabs>
    </main>

    <MaterialModal
      name="testModal"
      title="Modal de test"
    >
      <MaterialFormFieldLine>
        <MaterialFormInput
          v-model="state.textField"
          :valid="state.valid"
          :required="state.required"
          :variant="state.selectField"
          type="password"
          label="Text field"
          :messages="state.fruits"
        />
      </MaterialFormFieldLine>
      <MaterialFormFieldLine>
        <MaterialFormSelect
          v-model="state.selectField"
          :options="State.options"
          :valid="state.valid"
          :required="state.required"
          :variant="state.selectField"
          label="Select field"
          :messages="state.fruits"
          :searchable="true"
        />
      </MaterialFormFieldLine>
      <MaterialFormFieldLine :size="3">
        <template v-slot:field0>
          <MaterialFormCheckbox
            v-model="state.fruits"
            value="apple"
            label="Pomme"
          />
        </template>
        <template v-slot:field1>
          <MaterialFormCheckbox
            v-model="state.fruits"
            value="pineapple"
            label="Ananas"
          />
        </template>
        <template v-slot:field2>
          <MaterialFormCheckbox
            v-model="state.fruits"
            value="cherry"
            label="Cerise"
          />
        </template>
      </MaterialFormFieldLine>

      <MaterialFormFieldLine :size="2">
        <template v-slot:field0>
          <MaterialFormRadio
            v-model="state.valid"
            :value="true"
            label="Oui"
            name="radio"
          />
        </template>
        <template v-slot:field1>
          <MaterialFormRadio
            v-model="state.valid"
            :value="false"
            label="Non"
            name="radio"
          />
        </template>
      </MaterialFormFieldLine>
      <MaterialFormFieldLine>
        <MaterialFormToggle
          v-model="state.required"
          label="Required"
        />
      </MaterialFormFieldLine>
    </MaterialModal>

    <NotificationList />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';

import AppTitleBar from '@renderer/components/App/TitleBar/index.vue';
import MaterialTabs from '@renderer/components/Materials/Tabs/index.vue';
import NotificationList from '@renderer/components/Materials/Notification/List.vue';
import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';
import MaterialFormSelect from '@renderer/components/Materials/Form/Select.vue';
import MaterialFormCheckbox from '@renderer/components/Materials/Form/Checkbox.vue';
import MaterialFormRadio from '@renderer/components/Materials/Form/Radio.vue';
import MaterialFormToggle from '@renderer/components/Materials/Form/Toggle.vue';
import DataTable from '@renderer/components/Materials/DataTable/index.vue';
import DataTableButton from '@renderer/components/Materials/DataTable/Button.vue';
import UiKitFormSelect from '@renderer/views/UiKit/FormSelect.vue';
import UiKitObjectList from '@renderer/views/UiKit/ObjectList.vue';

import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import { modalStore } from '@renderer/components/Materials/Modal/Store';

const state = reactive({
  currentTab: 'apple',
  textField: '',
  selectField: 'default',
  data: [
    { column1: 'Un', column2: 1 },
    { column1: 'Deux', column2: 2 },
    { column1: 'Trois', column2: 3 },
    { column1: 'Quatre', column2: 4 },
    { column1: 'Cinq', column2: 5 },
  ],
  fruits: [],
  valid: true,
  required: false,
  tabs: [
    { id: 'select', label: 'Form select' },
    { id: 'list', label: 'Object list' },
    { id: 'apple', label: 'Pomme' },
  ],
});

const State = computed(() => ({
  options: [
    { value: 'default', label: 'Défault' },
    { value: 'box', label: 'Boite' },
  ],
  columns: {
    column1: { label: 'Première colonne' },
    column2: { label: 'Seconde colonne' },
  },
}));

const actions = {
  notify(type) {
    notificationStore.actions[type]('Test');
  },
  showModal() {
    modalStore.actions.show('testModal');
  },
  async findChoices() {
    return [
      { value: 'js', label: 'JavaScript' },
      { value: 'ts', label: 'TypeScript' },
      { value: 'vue', label: 'VueJS' },
      { value: 'php', label: 'PHP' },
    ];
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
