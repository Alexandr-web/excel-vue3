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
    },
    saveValueOfCell({ commit }, data) {
      commit('saveValueOfCell', data);
    },
    focusChoiceCells({ commit }, str) {
      commit('focusChoiceCells', str);
    },
    cleanFocusChoiceCells({ commit }) {
      commit('cleanFocusChoiceCells');
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
        column.cells.map(cell => {
          cell.active = false;
          cell.choiceCell = false;
        });
      });
      
      state.numbers.map(num => num.active = false);
    },
    changeActiveCell(state, val) {
      state.activeCell = val;
    },
    saveValueOfCell(state, data) {
      const { id, symbol, num } = data[0];
      const val = data[1];

      state.columns.find(column => column.symbol === symbol).cells.find(cell => cell.id === id && cell.num === num).value = val;

      localStorage.setItem('columns', JSON.stringify(state.columns));
    },
    focusChoiceCells(state, str) {
      const cells = str.match(/([a-z]\d+)+/gi);
      
      cleanChoiceCells();

      if (cells) {
        state.columns.map(column => {
          column.cells.map(cell => {
            cells.map(item => {
              if (`${cell.symbol}${cell.num}` === item.toLowerCase()) {
                cell.choiceCell = true;
              }
            }); 
          });
        });
      } else {
        cleanChoiceCells();
      }

      function cleanChoiceCells() {
        state.columns.map(column => column.cells.map(cell => cell.choiceCell = false));
      }
    },
    cleanFocusChoiceCells(state) {
      state.columns.map(column => {
        column.cells.map(cell => cell.choiceCell = false);
      });
    }
  }
});