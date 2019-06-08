require('dotenv').config()
const webpush = require('web-push')
const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8006

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const app = express()

app.use(bodyParser.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./dist'))
} else {
  const webpack = require('webpack')
  const middleware = require('webpack-dev-middleware')
  const webpackOptions = require('./webpack.config')
  const compiler = webpack(webpackOptions)

  app.use(middleware(compiler))
}

app.post('/push', (req, res) => {
  const pushSubscription = req.body

  res.json({success: true})

  setTimeout(() => {
    const payload = {
      title: 'Test notification',
      message: 'Click on it to navigate to the demo website',
      redirect_url: process.env.PUBLIC_URL + '/notification.html'
    }

    webpush.sendNotification(pushSubscription, JSON.stringify(payload))
      .catch(e => {
        // Report to Sentry or Rollbar
      })
  }, 5000)
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
