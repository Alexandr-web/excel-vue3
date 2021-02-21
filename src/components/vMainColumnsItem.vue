<template>
  <li class="main__list-columns-item">
    <h3 v-bind:class="`main__list-columns-item-heading ${column.active ? 'active-symbol' : ''}`">{{ column.symbol }}</h3>
    <ul class="main__list-columns-item-cells">
      <vMainColumnsCell
        v-for="(cell, i) of column.cells"
        v-bind:key="i"
        v-bind:cell="cell"
      />
    </ul>
  </li>
</template>

<script>
import vMainColumnsCell from './vMainColumnsCell';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  props: {
    column: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore();
    const activeCell = computed(() => store.getters.getActiveCell);
    const activeSymbol = activeCell.value.match(/[A-Z]/)[0];
    
    if (activeSymbol === props.column.symbol.toUpperCase()) {
      store.dispatch('setActiveColumn', props.column.id);
    }
  },
  components: {
    vMainColumnsCell
  }
}
</script>