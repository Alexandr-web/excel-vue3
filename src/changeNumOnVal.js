const changeNumOnVal = (str, res) => {
  switch (res.length) {
    case 1:
      str = res[0]['val'];
      break;
    case 2:
      res.every(obj => parseInt(obj.val)) ? setValue() : str = '#ИМЯ?';
      break;
    default:
      setValue();
      break;
  }

  function setValue() {
    for (let i = 0; i < str.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (res[j]['num'].toLowerCase() === str[i]) {
          str[i] = res[j]['val'];
        }
      }
    }
  }

  return str;
}

export default changeNumOnVal;