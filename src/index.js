import startPrintTemplate from './templates/startPrintTemplate.js'
import textAreaTemplate from './templates/textAreaTemplate'
import splitMulti from './js/split.js'
import replace from './js/replace'
import clearPrinted from './js/clearPrinted.js'
import getEl from './js/getEl'
import isValid from './js/isValid.js'
import './css/style.css'

const $container = getEl(document, '#container')
      $container.insertAdjacentHTML('afterbegin', textAreaTemplate)
const $form = getEl($container,'#form')
const $button1 = getEl($form,'#button1')
      $button1.addEventListener('click', printEngl)
const $button2 = getEl($form, '#button2')
      $button2.addEventListener('click', savePrint)

const $en = getEl($form, '#en')
const $ru = getEl($form, '#ru')
$en.addEventListener('input', activeButton)
$ru.addEventListener('input', activeButton)

function activeButton() {
  $button1.disabled = $button2.disabled = !isValid($en, $ru)
}

const separators = ['... ', '! ', '? ', '. ']
const marks = ['...', '!', '?', '.']

let eng = ''
let rus = ''
const storageName = 'simulator'
const data = JSON.parse(localStorage.getItem(storageName))
if(data) {
  $button1.disabled = $button2.disabled = false
  $ru.value = rus = data.rus
  $en.value = eng = data.eng  
}

function savePrint(event) {
  event.preventDefault()
  localStorage.setItem(storageName, JSON.stringify({
    rus: $ru.value,
    eng: $en.value
  }))
}

function printEngl(event) {
    event.preventDefault()
    if(isValid($en, $ru)) {
        rus = $ru.value.trim()
        eng = $en.value.trim()
    } else {
      return alert("Текст меньше 10 символов.")
    }

    rus = replace(rus)
    eng = replace(eng)    

    const englArr = splitMulti(eng, separators)
    const rusArr = splitMulti(rus, separators)
    const englArrMoreThenRusArr = englArr.length > rusArr.length

    $form.style.display = 'none'
    $container.insertAdjacentHTML('afterbegin', startPrintTemplate)

    const $startPrint = getEl($container, '#startPrint')
    const $printed = getEl($startPrint, '#printed')
    const $character = getEl($startPrint, '#character')
    const $englSentence = getEl($startPrint, '#eng')
    const $fieldlSentence = getEl($startPrint, '#field')
    const $rusSentence = getEl($startPrint, '#rus')
    const $runner = getEl($startPrint, '#runner')
    const $input = getEl($startPrint, '#input')
          $input.addEventListener('input', inputHandler)
          $input.addEventListener('keyup', escHandler)
          $input.focus()
    
    const emptyArr = ['', '', '', '', '', '', '']
    const field = [...eng]
    const startLength = field.length
    
    let start = true
    let engSentenceNumber = 0
    let ruSentenceNumber = 0
    let position = 0
    let character = ''

    function escHandler(event) {
      if(event.key === 'Escape') {
        $printed.textContent = ''
        $character.textContent = ''
        $fieldlSentence.textContent = ''
        $englSentence.textContent = ''
        $rusSentence.textContent = ''
        $input.removeEventListener('keyup', escHandler)
        $startPrint.remove()
        $form.style.display = 'block'
        $en.value = eng = englArr.splice(engSentenceNumber, englArr.length - engSentenceNumber).join(' ')
        $ru.value = rus = rusArr.splice(ruSentenceNumber, rusArr.length - ruSentenceNumber).join(' ')
        $button2.disabled = !isValid($en, $ru)
      }
    }

    function inputHandler(event) {
      if (event.target.value === ' ' && start === true) {
      start = false
      character = field.splice(0, 1).join('')
      $character.textContent = character
      $fieldlSentence.textContent = field.join('')
      $englSentence.textContent = englArr[0]
      $rusSentence.textContent = rusArr[0]
      event.target.value = ''
      }

      if(field.length > 0) {
        if (event.target.value === character){
          if(field[0] === ' ') {
            $character.classList.add('under')
            $fieldlSentence.classList.add('field')
          } else {
            $character.classList.remove('under')
            $fieldlSentence.classList.remove('field')
          }
          position++
          $runner.style.width = (position / startLength) * 100 + '%'
          emptyArr.push(character)
          emptyArr.splice(0, 1)
          $printed.textContent = emptyArr.join('')
          character = field.splice(0, 1).join('')
          $character.textContent = character
          $fieldlSentence.textContent = field.join('')
          
          if (marks.includes(event.target.value)){
            if (engSentenceNumber < englArr.length){
              let russianSentenceIsLongerThanEnglish = 
              (rusArr[ruSentenceNumber+1].length / englArr[engSentenceNumber+1].length) > 4
              if(englArrMoreThenRusArr && russianSentenceIsLongerThanEnglish) {
                engSentenceNumber++
                $englSentence.textContent = englArr[engSentenceNumber]
                $rusSentence.textContent = rusArr[ruSentenceNumber+1].split(',', 1).join('')
                clearPrinted(emptyArr, $printed)
              } else {
                engSentenceNumber++
                ruSentenceNumber++
                $englSentence.textContent = englArr[engSentenceNumber]
                $rusSentence.textContent = rusArr[ruSentenceNumber]
                clearPrinted(emptyArr, $printed)
              }

            } else {
              event.target.value = ''
              return 
            }
          }
          event.target.value = ''
          return 
        } else {
          event.target.value = ''
          return
        }     
      } 
      localStorage.removeItem(storageName)
      $input.removeEventListener('keyup', inputHandler)
      return alert("Конец текста")
    }
}

