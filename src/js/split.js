function splitMulti(str, symbols){
    for(let i = 0; i < symbols.length; i++){
        let a = symbols[i] + '='
        str = str.split(symbols[i]).join(a)
    }
    return str.split(/ ==| =/)
  }

  export default splitMulti