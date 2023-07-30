function requestPermission() {
  console.log('권한 요청 중...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('알림 권한이 허용됨');
    } else {
      console.log('알림 권한 허용 안됨');
    }
  });
}
export default requestPermission;
