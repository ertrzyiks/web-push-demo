import './styles/index.sass'
import { createServiceWorkerComponent } from './components/service_worker_status'
import { createNotificationStatusComponent } from './components/notification_status'
import { createPushApiStatusComponent } from './components/push_api_status'
import { urlBase64ToUint8Array, observeServiceWorker } from './util'

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

const serviceWorkerComponent = createServiceWorkerComponent(document.querySelector('#service-worker-status'))
const pushApiComponent = createPushApiStatusComponent(document.querySelector('#push-api-status'))
const notificationsComponent = createNotificationStatusComponent(document.querySelector('#notification-status'))

if ('PushManager' in window && 'PushSubscription' in window) {
  pushApiComponent('supported')
} else {
  pushApiComponent('unsupported')
}

if ('Notification' in window) {
  notificationsComponent(Notification.permission)
} else {
  notificationsComponent('unsupported')
}

navigator.serviceWorker.register('worker.js').then(registration => {
  observeServiceWorker(registration, status => serviceWorkerComponent(status))
})

document.querySelector('#schedule').addEventListener('click', () => schedulePushNotification())

async function schedulePushNotification() {
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

  } catch (ex) {
    notificationsComponent(Notification.permission)
  }
}
