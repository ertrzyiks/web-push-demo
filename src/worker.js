self.addEventListener('push', event => {
  let data = {}
  if (event.data) {
    data = event.data.json()
  }

  const notificationPromise = self.registration.showNotification(data.title, {
    body: data.message,
    data: { redirect_url: data.redirect_url }
  })

  event.waitUntil(notificationPromise)
})

self.addEventListener('notificationclick', function(event) {
  event.notification.close()

  // `data` is passed in `showNotification` call above
  const { redirect_url } = event.notification.data

  if (!redirect_url) return

  event.waitUntil(
    clients.openWindow(redirect_url)
  )
})


/**
 * We don't mess with network so can be adventurous and activate service worker right away
 * with `skipWaiting` and `claim` calls.
 *
 * In more complex setup we may need to patiently wait for update or offer a page reload:
 * https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
 */
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', () => {
  return self.clients.claim()
})
