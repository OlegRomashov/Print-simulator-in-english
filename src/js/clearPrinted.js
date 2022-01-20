function clearPrinted(arr, el) {
  arr.push('', '', '', '', '', '', '')
  arr.splice(0, 7)
  el.textContent = arr.join('')
}

export default clearPrinted