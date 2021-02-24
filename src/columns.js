import symbols from './symbols';

let columns = [];

if (localStorage.getItem('columns')) {
  columns = JSON.parse(localStorage.getItem('columns'));
} else {
  for (let i = 0; i < symbols.length; i++) {
    const column = {
      symbol: symbols[i],
      num: i + 1,
      cells: [],
      id: ((Math.random() * i + 1) + (i + 10)),
      active: false
    };
  
    for (let j = 0; j < 25; j++) {
      const cell = { symbol: symbols[i], num: j + 1, active: false, value: '', vModel: `vModel-${symbols[i]}-${j + 1}`, choiceCell: false };
  
      column.cells.push(cell);
    }
  
    columns.push(column);
  }
}

export default columns;