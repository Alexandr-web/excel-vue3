<template>
  <li class="main__list-columns-item-cells-item">
    <form v-on:submit.prevent="endWrite" action="" class="main__list-columns-item-cells-item-form">
      <input 
        v-model="val"
        v-bind:class="`main__list-columns-item-cells-item-input ${cell.active ? 'active-cell' : ''} ${cell.choiceCell ? 'choice-cell' : ''}`"
        type="text"
        v-on:focus="findActiveCell"
        v-on:blur="endWrite"
        v-on:input="mathFunctions"
      >
    </form>
  </li>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import changeNumOnVal from '../changeNumOnVal';

export default {
  props: {
    cell: {
      type: Object
    }
  },
  setup(props) {
    let val = ref(props.cell.value);
    
    const res = [];
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

    const mathFunctions = () => {
      if (/={1}/.test(val.value) && val.value.match(/={1}/)['index'] === 0) {
        columns.value.map(column => {
          column.cells.map(cell => {
            const numCell = `${cell.symbol.toUpperCase()}${cell.num}`;

            if (eval(`/${numCell}/gi`).test(val.value.replace(/=/, ''))) {
              res.push({ num: numCell, val: cell.value });
            }
          });
        });
        
        store.dispatch('focusChoiceCells', val.value);
      }
    }

    const endWrite = () => {
      if (Array.isArray(endOfFormula(val.value.toString().replace(/=/, '')))) {
        store.dispatch('saveValueOfCell', [props.cell, eval(endOfFormula(val.value.replace(/=/, '')).join(''))]);
        val.value = eval(endOfFormula(val.value.replace(/=/, '')).join(''));
      } else {
        store.dispatch('saveValueOfCell', [props.cell, endOfFormula(val.value.toString().replace(/=/, ''))]);
        val.value = endOfFormula(val.value.toString().replace(/=/, ''));
      }
    }
    
    function endOfFormula(value) {
      const result = value;

      if (/([a-z]\d){1,}/gi.test(value) && res.length) {
        return changeNumOnVal(result.split(/([a-z]\d){1,}/gi).filter(item => item), res);
      } else {
        return result;
      }
    }

    return {
      findActiveCell,
      endWrite,
      val,
      mathFunctions
    }
  }
}
</script>