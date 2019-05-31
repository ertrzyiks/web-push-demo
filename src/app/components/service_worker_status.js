const debounce = require('lodash.debounce')

export function serviceWorkerComponent(el, registration) {
  const p = el.querySelector('p:last-child')

  const update = debounce((status) => {
    updateState(el, p, status)
  }, 700)

  if (!('serviceWorker' in navigator)) {
    update('unsupported')
    return
  }

  let serviceWorker;
  if (registration.installing) {
    serviceWorker = registration.installing;
  } else if (registration.waiting) {
    serviceWorker = registration.waiting;
  } else if (registration.active) {
    serviceWorker = registration.active;
  }

  if (serviceWorker) {
    updateState(el, p, serviceWorker.state)
    serviceWorker.addEventListener('statechange', e => update(e.target.state))
  }
}

function updateState(el, p, state) {
  el.setAttribute('data-status', state)

  switch(state) {
    case 'installing':
      p.innerText = 'Installing 🤞🏼'
      break

    case 'activated':
      p.innerText = 'Activated 👍🏼'
      break

    case 'unsupported':
      p.innerHTML = 'Not supported in this browser. Pick from <a href="https://caniuse.com/#feat=serviceworkers">the list</a> one which does.'
      break

    default:
      p.innerText = state
  }
}
