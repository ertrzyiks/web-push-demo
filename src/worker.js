self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', () => {
  return self.clients.claim()
})

self.addEventListener('push', event => {
  var data = {};
  if (event.data) {
    data = event.data.json();
  }

  const notificationPromise = self.registration.showNotification(data.title, {
    body: data.message,
    tag: 'simple-push-demo-notification',
    data: { redirect_url: data.redirect_url }
  })

  event.waitUntil(notificationPromise)
})

self.addEventListener('notificationclick', function(event) {
  event.notification.close()

  const { redirect_url } = event.notification.data

  if (!redirect_url) return

  event.waitUntil(
    clients.openWindow(redirect_url)
  );
})
