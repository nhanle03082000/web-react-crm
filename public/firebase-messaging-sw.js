/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

self.addEventListener('fetch', () => {
  const urlParams = new URLSearchParams(location.search);
  self.firebaseConfig = Object.fromEntries(urlParams);
});

const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

firebase.initializeApp(self.firebaseConfig || defaultConfig);
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  const channel = new BroadcastChannel('notifications');
  messaging.onBackgroundMessage((payload) => {
    // can not console.log here
    channel.postMessage(payload);
  });
}

// self.addEventListener('notificationclick', (event) => {
//   const redirectUrl = event.notification.data.click_action;
//   event.notification.close();
//   event.waitUntil(
//     clients
//       .matchAll({
//         type: 'window',
//       })
//       .then((clientList) => {
//         console.log(clientList);
//         for (let i = 0; i < clientList.length; i += 1) {
//           const client = clientList[i];
//           if (client.url === '/' && 'focus' in client) {
//             return client.focus();
//           }
//         }
//         if (clients.openWindow) {
//           return clients.openWindow(redirectUrl);
//         }
//         return null;
//       }),
//   );
// });

self.addEventListener(
  'notificationclick',
  (event) => {
    console.log('notificationclick');
    event.notification.close();
    if (
      event.notification &&
      event.notification.data &&
      event.notification.data.FCM_MSG &&
      event.notification.data.FCM_MSG.notification
    ) {
      const url = event.notification.data.FCM_MSG.notification.click_action;
      event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((windowClients) => {
          // Check if there is already a window/tab open with the target URL
          for (let i = 0; i < windowClients.length; i += 1) {
            const client = windowClients[i];
            // If so, just focus it.
            if (client.url === url && 'focus' in client) {
              return client.focus();
            }
          }
          // If not, then open the target URL in a new window/tab.
          if (self.clients.openWindow) {
            console.log('open window');
            return self.clients.openWindow(url);
          }
          return null;
        }),
      );
    }
  },
  false,
);
