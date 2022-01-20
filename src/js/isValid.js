function isValid(enEl, ruEl) {
  return enEl.value.trim().length >= 10 && ruEl.value.trim().length >= 10
}

export default isValid