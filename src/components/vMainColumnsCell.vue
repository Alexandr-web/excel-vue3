<template>
  <li class="main__list-columns-item-cells-item">
    <input 
      v-bind:class="`main__list-columns-item-cells-item-input ${cell.active ? 'active-cell' : ''}`"
      type="text"
      v-on:focus="findActiveCell"
    >
  </li>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  props: {
    cell: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore();
    const getActiveCellInfo = () => {
      const activeCell = computed(() => store.getters.getActiveCell);
      const activeNumber = parseInt(activeCell.value.match(/\d+/)[0]);
      const activeSymbol = activeCell.value.match(/[A-Z]/)[0].toLowerCase();

      return {
        activeNumber,
        activeSymbol
      }
    }

    if (getActiveCellInfo().activeNumber === props.cell.num && props.cell.symbol === getActiveCellInfo().activeSymbol) {
      store.dispatch('setActiveCell', props.cell);
    }

    const findActiveCell = () => {
      store.dispatch('cleanActiveCells');

      const { num, symbol } = props.cell;
      const res = `${symbol.toUpperCase()}${num}`;
      
      store.dispatch('changeActiveCell', res);

      const columns = computed(() => store.getters.getColumns);
      const numbers  = computed(() => store.getters.getNumbers);
      
      store.dispatch('setActiveNumber', numbers.value.find(item => item.num === getActiveCellInfo().activeNumber));
      store.dispatch('setActiveColumn', columns.value.find(column => column.symbol === getActiveCellInfo().activeSymbol).id);
      store.dispatch('setActiveCell', props.cell);
    }

    return {
      findActiveCell
    }
  }
}
</script>