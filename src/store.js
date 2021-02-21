import { createStore } from 'vuex';
import columns from './columns';
import numbers from './numbers';

export default createStore({
  state: {
    columns,
    activeCell: 'A1',
    numbers
  },
  getters: {
    getColumns(state) {
      return state.columns;
    },
    getActiveCell(state) {
      return state.activeCell;
    },
    getNumbers(state) {
      return state.numbers;
    }
  },
  actions: {
    setActiveColumn({ commit }, id) {
      commit('setActiveColumn', id);
    },
    setActiveCell({ commit }, cell) {
      commit('setActiveCell', cell);
    },
    setActiveNumber({ commit }, number) {
      commit('setActiveNumber', number);
    },
    cleanActiveCells({ commit }) {
      commit('cleanActiveCells');
    },
    changeActiveCell({ commit }, val) {
      commit('changeActiveCell', val);
    }
  },
  mutations: {
    setActiveColumn(state, id) {
      state.columns.find(column => column.id === id).active = true;
    },
    setActiveCell(state, cell) {
      const { symbol, id, num } = cell;

      state.columns.find(column => column.symbol === symbol).cells.find(cell => cell.id === id && cell.num === num).active = true;
    },
    setActiveNumber(state, number) {
      const { num } = number;

      state.numbers.find(item => item.num === num).active = true;
    },
    cleanActiveCells(state) {
      state.columns.map(column => {
        column.active = false;
        column.cells.map(cell => cell.active = false);
      });
      
      state.numbers.map(num => num.active = false);
    },
    changeActiveCell(state, val) {
      state.activeCell = val;
    }
  }
});