import debounce from 'lodash.debounce'

export function createPushApiStatusComponent(el) {
  const p = el.querySelector('p:last-child')

  return debounce(state => {
    el.setAttribute('data-status', state)

    switch(state) {
      case 'supported':
        p.innerText = 'Supported 👍🏼'
        break

      case 'unsupported':
        p.innerHTML = 'Not supported in this browser.'
        break

      default:
        p.innerText = state
    }
  }, 700, {leading: true})
}
