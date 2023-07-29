importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBliXE0L5Ev_e1NVMc4oHHEOBgp75-skVw',
  authDomain: 'bbiyong-bbiyong.firebaseapp.com',
  projectId: 'bbiyong-bbiyong',
  storageBucket: 'bbiyong-bbiyong.appspot.com',
  messagingSenderId: '944206714058',
  appId: '1:944206714058:web:b19c3cc593f6c1cda65033',
  measurementId: 'G-1VNS1TY38X',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = '삐용삐용 테스트';
  const notificationOptions = {
    body: payload.data.body,
    icon: './serviceLogo.svg',
    badge: './serviceLogo.svg',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // TODO: 배포 후 url 기입
  const targetUrl = '';
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      let existingTab = null;

      for (const client of clients) {
        if (client.url === targetUrl) {
          existingTab = client;
          break;
        }
      }

      if (existingTab && 'focus' in existingTab) {
        return existingTab.focus();
      } else {
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      }
    }),
  );
});
