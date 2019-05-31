export function notificationStatusComponent(el) {
  const p = el.querySelector('p:last-child')

  updateState(el, p, Notification.permission)

  return () => updateState(el, p, Notification.permission)
}

function updateState(el, p, state) {
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
      p.innerHTML = 'Not supported in this browser. Pick from <a href="https://caniuse.com/#feat=serviceworkers">the list</a> one which does.'
      break

    default:
      p.innerText = state
  }
}
