<template>
  <li class="main__list-columns-item-cells-item">
    <form v-on:submit.prevent="endWrite" action="" class="main__list-columns-item-cells-item-form">
      <input 
        v-model="val"
        v-bind:class="`main__list-columns-item-cells-item-input ${cell.active ? 'active-cell' : ''}`"
        type="text"
        v-on:focus="findActiveCell"
        v-on:blur="endWrite"
      >
    </form>
  </li>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

export default {
  props: {
    cell: {
      type: Object
    }
  },
  setup(props) {
    const val = ref(props.cell.value);
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

    const columns = computed(() => store.getters.getColumns);
    const numbers  = computed(() => store.getters.getNumbers);

    if (getActiveCellInfo().activeNumber === props.cell.num && props.cell.symbol === getActiveCellInfo().activeSymbol) {
      store.dispatch('setActiveCell', props.cell);
    }

    const findActiveCell = () => {
      store.dispatch('cleanActiveCells');

      const { num, symbol } = props.cell;
      const res = `${symbol.toUpperCase()}${num}`;
      
      store.dispatch('changeActiveCell', res);
      
      store.dispatch('setActiveNumber', numbers.value.find(item => item.num === getActiveCellInfo().activeNumber));
      store.dispatch('setActiveColumn', columns.value.find(column => column.symbol === getActiveCellInfo().activeSymbol).id);
      store.dispatch('setActiveCell', props.cell);
    }

    const endWrite = () => {
      store.dispatch('setValueOfCell', [props.cell, val.value]);
    }

    return {
      findActiveCell,
      endWrite,
      val
    }
  }
}
</script>