export function createServiceWorkerComponent(el) {
  const p = el.querySelector('p:last-child')

  return function (state) {
    el.setAttribute('data-status', state)

    switch(state) {
      case 'installing':
        p.innerText = 'Installing 🤞🏼'
        break

      case 'activated':
        p.innerText = 'Activated 👍🏼'
        break

      case 'activating':
        p.innerText = 'Activating 🔄'
        break

      case 'unsupported':
        p.innerHTML = 'Not supported in this browser.'
        break

      default:
        p.innerText = state
    }
  }
}
