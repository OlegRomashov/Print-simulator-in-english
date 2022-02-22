function replace(str) {
  let findFor = [/[^a-zA-Z0-9а-яА-ЯёЁ.,!?:;’'"]/, /,+/,/\.+/, /!+/, /\?+/, / Mr. /, / Ms. /, /’/, /\s+/]
  let replaceWith = [' ', ',', '. ', '! ', '? ', ' Mr ',' Ms ', '\'', ' ']

  if(str.includes('-->')) {
    if(!str.includes('.')) {
      findFor = [/\d{1,3}\n\d{2}:\d{2}:\d{2},\d{3}\s-->\s\d{2}:\d{2}:\d{2},\d{3}\n/, /^\./, /[^a-zA-Z0-9а-яА-ЯёЁ.,!?:;’'"]/, / Mr. /, / Ms. /, /’/, /\s+/]
      replaceWith = ['. ', '', ' ', ' Mr ',' Ms ', '\'', ' ']
    } else {
      findFor = [/\d{1,3}\n\d{2}:\d{2}:\d{2},\d{3}\s-->\s\d{2}:\d{2}:\d{2},\d{3}\n/, /[^a-zA-Z0-9а-яА-ЯёЁ.,!?:;’'"]/, /,+/,/\.+/, /!+/, /\?+/, / Mr. /, / Ms. /, /’/, /\s+/]
      replaceWith = [' ',' ', ',', '. ', '! ', '? ', ' Mr ',' Ms ', '\'', ' ']
    }

  }

  findFor.forEach( (i, j) => str = str.replace(new RegExp(i, "g"), replaceWith[j]) )
  return str.trim()
}

export default replace