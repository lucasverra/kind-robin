importScripts('https://kind-robin-60456.netlify.com/sw.js');
importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');

// If service workers are supported, and one isn't already registered
if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
    navigator.serviceWorker.register('/OneSignalSDKWorker.js');
  }