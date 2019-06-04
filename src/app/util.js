export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray;
}

export function observeServiceWorker(registration, callback) {
  let serviceWorker;
  if (registration.installing) {
    serviceWorker = registration.installing;
  } else if (registration.waiting) {
    serviceWorker = registration.waiting;
  } else if (registration.active) {
    serviceWorker = registration.active;
  }

  if (serviceWorker) {
    callback(serviceWorker.state)
    serviceWorker.addEventListener('statechange', e => callback(e.target.state))
  }

  registration.addEventListener('updatefound', () => {
    observeServiceWorker(registration, callback)
  })
}
