function replace(str) {
  const findFor = [/[^a-zA-Z0-9а-яА-ЯёЁ.,!?:;’'"]/, /,+/,/\.+/, /!+/, /\?+/, / Mr. /, / Ms. /, /’/, /\s+/]
  const replaceWith = [' ', ',', '. ', '! ', '? ', ' Mr ',' Ms ', '\'', ' ']
  findFor.forEach( (i, j) => str = str.replace(new RegExp(i, "g"), replaceWith[j]) )
  return str
}

export default replace