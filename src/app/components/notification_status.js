import debounce from 'lodash.debounce'

export function createNotificationStatusComponent(el) {
  const p = el.querySelector('p:last-child')

  return debounce(state => {
    el.setAttribute('data-status', state)

    switch(state) {
      case 'granted':
        p.innerText = 'Permission granted 👍🏼'
        break

      case 'denied':
        p.innerText = 'Permission denied 👎🏼'
        break

      case 'default':
        p.innerText = 'Accept notifications when prompted'
        break

      case 'unsupported':
        p.innerHTML = 'Not supported in this browser.'
        break

      default:
        p.innerText = state
    }
  }, 700, {leading: true})
}
