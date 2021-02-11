<template>
  <div class="Tabs">
    <nav class="TabsNavigation">
      <ul class="TabsNavigationList">
        <li class="TabsNavigationListItem" :class="{active: selected === i}" v-for="(tab, i) in tabs" :key="`tabnavitem${i}`" @click.prevent.stop="handleSelect(i)">
          <slot :name="`nav${tab.name}`" :tab="tab" :index="i">
            {{ tab.label }}
          </slot>
        </li>
      </ul>
    </nav>
    <div class="TabsContainer">
      <div class="Tab" v-for="(tab, i) in tabs" :key="`tab${i}`" v-show="selected === i">
        <slot :name="tab.name" :tab="tab" :index="i" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabs: { type: Array, default: () => [] },
    current: { type: Number, default: 0 },
  },
  data() {
    return {
      selected: this.current,
    };
  },
  methods: {
    handleSelect(i) {
      this.selected = i;
      this.$emit('tabChanged', this.selected);
    },
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
