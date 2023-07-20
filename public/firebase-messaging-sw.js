import { firebaseConfig } from '../src/data/firebaseConfig';

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = '삐용삐용 테스트';
  const notificationOptions = {
    // TODO: 서버 알림 수신 내용 띄우기
    body: payload.notification.body,
    icon: '',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
