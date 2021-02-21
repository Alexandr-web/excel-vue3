import symbols from './symbols';

const columns = [];

for (let i = 0; i < symbols.length; i++) {
  const column = {
    symbol: symbols[i],
    num: i + 1,
    cells: [],
    id: ((Math.random() * i + 1) + (i + 10)),
    active: false
  };

  for (let j = 0; j < 25; j++) {
    const cell = { symbol: symbols[i], num: j + 1, active: false, value: '' };

    column.cells.push(cell);
  }

  columns.push(column);
}

export default columns;