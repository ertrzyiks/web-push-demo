import './styles/index.sass'
import { serviceWorkerComponent } from './components/service_worker_status'
import { notificationStatusComponent } from './components/notification_status'
import { urlBase64ToUint8Array } from './util'

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

let updateNotifications

navigator.serviceWorker.register('worker.js').then(registration => {
  serviceWorkerComponent(document.querySelector('#service-worker-status'), registration)
  updateNotifications = notificationStatusComponent(document.querySelector('#notification-status'))
})
document.querySelector('#schedule').addEventListener('click', () => schedulePushNotification())

function schedulePushNotification() {
  navigator.serviceWorker.ready
    .then(registration => {
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      })
    })
    .then(pushSubscription => {
      updateNotifications && updateNotifications()

      return fetch('/push', {
        method: 'POST',
        body: JSON.stringify(pushSubscription.toJSON()),
        headers: { "Content-Type": "application/json" }
      }).then(res => res.json())
    })
    .catch(error => {
      updateNotifications && updateNotifications()
    })
}
