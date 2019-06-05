import './styles/index.sass'
import { createServiceWorkerComponent } from './components/service_worker_status'
import { createNotificationStatusComponent } from './components/notification_status'
import { createPushApiStatusComponent } from './components/push_api_status'
import { createMessageComponent } from './components/message'
import { urlBase64ToUint8Array, observeServiceWorker } from './util'

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

const serviceWorkerComponent = createServiceWorkerComponent(document.querySelector('#service-worker-status'))
const pushApiComponent = createPushApiStatusComponent(document.querySelector('#push-api-status'))
const notificationsComponent = createNotificationStatusComponent(document.querySelector('#notification-status'))
const messageComponent = createMessageComponent(document.querySelector('#message'))

let allGood = true

if ('PushManager' in window && 'PushSubscription' in window) {
  pushApiComponent('supported')
} else {
  pushApiComponent('unsupported')
  allGood = false
}

if ('Notification' in window) {
  notificationsComponent(Notification.permission)
} else {
  notificationsComponent('unsupported')
  allGood = false
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('worker.js').then(registration => {
    observeServiceWorker(registration, status => serviceWorkerComponent(status))
  })

  navigator.serviceWorker.addEventListener('message', event => {
    messageComponent(event.data)
  })

  document.querySelector('#schedule').addEventListener('click', () => schedulePushNotification())
} else {
  serviceWorkerComponent('unsupported')
  allGood = false
}

if (allGood) {
  messageComponent('Status: OK ✅')
} else {
  messageComponent('Looks like at least one of the required components is not supported 😭')
}

async function schedulePushNotification() {
  messageComponent('Trying to send a notification...')

  try {
    const registration = await navigator.serviceWorker.ready

    const pushSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    })

    notificationsComponent(Notification.permission)

    await fetch('/push', {
      method: 'POST',
      body: JSON.stringify(pushSubscription.toJSON()),
      headers: {"Content-Type": "application/json"}
    })

    messageComponent('Notification scheduled!')

  } catch (ex) {
    notificationsComponent(Notification.permission)
    messageComponent(ex.message)
  }
}
