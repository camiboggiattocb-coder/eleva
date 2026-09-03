/* Eleva · service worker para avisos push (FCM) */
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: "AIzaSyDoMmiGQ_nzNsi_24PL7AaNICR9ipCudGM",
  authDomain: "amobeleva.firebaseapp.com",
  projectId: "amobeleva",
  storageBucket: "amobeleva.firebasestorage.app",
  messagingSenderId: "82342468842",
  appId: "1:82342468842:web:82bbd7a130fc6b0babcb93"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || 'Eleva', {
    body: n.body || '',
    icon: './app-icon-192.png',
    badge: './app-icon-192.png',
    data: (payload.fcmOptions && payload.fcmOptions.link) ? { link: payload.fcmOptions.link } : {}
  });
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  const link = (e.notification.data && e.notification.data.link) || './';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    if (clients.openWindow) return clients.openWindow(link);
  }));
});
