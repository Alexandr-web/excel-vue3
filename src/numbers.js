import columns from './columns';

const numbers = [];
const maxNumbers = columns[0].cells.length;

for (let i = 0; i < maxNumbers; i++) {
  const number = { num: i + 1, id: ((Math.random() * i + 1) + (i + 10)), active: false };

  numbers.push(number);
}

export default numbers;