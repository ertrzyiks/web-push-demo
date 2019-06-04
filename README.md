# Push API Demo

This is an example project presenting how to send Push Notifications to
the browser. The notification is send using
[VAPID](https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications#using_vapid) authentication method.

## See it in action

https://notifications-demo.ertrzyiks.me


## How it works

**Client side components**:

 - [Push Api](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)

   Manages subscription

 - [Service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

   Receives push notification in background

 - [Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notification)

   Displays system notifications

**Server side components**:

 - [web-push](https://github.com/web-push-libs/web-push) to send notifications



## Browser support

For the most recent information refer to: https://caniuse.com/#feat=push-api,notifications,serviceworkers

![](https://github.com/ertrzyiks/web-push-demo/blob/master/support.jpg)

## Installation

1. Install npm dependencies
```
yarn install
```
2. Copy .env.sample file as .env
3. Generate VAPID keys
```
yarn web-push generate-vapid-keys
```
4. Save the provided keys in the `.env` file as

```
VAPID_PRIVATE_KEY=BEkyy4.....ef7graNA
VAPID_PUBLIC_KEY=B5A.....dRE
```
5. Update value of `VAPID_EMAIL` in the `.env` file
6. Start the server
```
yarn start
```
