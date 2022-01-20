function replace(str) {
  const findFor = [/,+/,/\.+/, /!+/, /\?+/, / Mr. /, / Ms. /, /“|”/, /’/, / +/]
  const replaceWith = [',', '. ', '! ', '? ', ' Mr ',' Ms ', '"', `'`, ' ']
  findFor.forEach( (i, j) => str = str.replace(new RegExp(i, "g"), replaceWith[j]) )
  return str
}

export default replace