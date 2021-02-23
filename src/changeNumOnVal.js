const changeNumOnVal = (str, res) => {
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < res.length; j++) {
      if (res[j]['num'].toLowerCase() === str[i]) {
        str[i] = res[j]['val'];
      }
    }
  }

  return str;
}

export default changeNumOnVal;