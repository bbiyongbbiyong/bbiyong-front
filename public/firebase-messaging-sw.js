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
    // TODO: 서버 알림 수신 내용 띄우기
    body: payload.data.body,
    icon: '',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
