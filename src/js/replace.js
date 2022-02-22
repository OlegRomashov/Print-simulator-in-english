function replace(str) {
  const findFor = [/[^a-zA-Z0-9а-яА-ЯёЁ.,!?:;’'"]/, /,+/,/\.+/, /!+/, /\?+/, / Mr. /, / Ms. /, /’/, /\s+/]
  const replaceWith = [' ', ',', '. ', '! ', '? ', ' Mr ',' Ms ', '\'', ' ']

  if(str.includes('-->')) {
    if(!str.includes('.')) {
      findFor = [/[\d{1,3}\n\d{2}:\d{2}:\d{2},\d{3}\s-->\s\d{2}:\d{2}:\d{2},\d{3}\n]/,/[^a-zA-Z0-9а-яА-ЯёЁ.,!?:;’'"]/, /,+/,/\.+/, /!+/, /\?+/, / Mr. /, / Ms. /, /’/, /\s+/]
      replaceWith = [' ',' ', ',', '. ', '! ', '? ', ' Mr ',' Ms ', '\'', ' ']
    }
    findFor = [/[]]/,/[^a-zA-Z0-9а-яА-ЯёЁ.,!?:;’'"]/, /,+/,/\.+/, /!+/, /\?+/, / Mr. /, / Ms. /, /’/, /\s+/]
    replaceWith = [' ',' ', ',', '. ', '! ', '? ', ' Mr ',' Ms ', '\'', ' ']
  }

  findFor.forEach( (i, j) => str = str.replace(new RegExp(i, "g"), replaceWith[j]) )
  return str
}

export default replace