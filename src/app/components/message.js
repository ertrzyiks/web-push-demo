import debounce from 'lodash.debounce'

export function createMessageComponent(el) {
  return debounce(message => {
    el.innerText = message
  }, 700, { leading: true })
}
