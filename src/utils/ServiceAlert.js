export function homeAlertHandle() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(registration) {
      // 서비스 워커 등록 성공
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
  
      // 알림 표시
      var title = 'Pickbox 유통기한 알림';
      var options = {
        body: '구매하신 초코우유의 유통기한이 하루 남았습니다.',
        vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500],
        sound: '/demos/notification-examples/audio/notification-sound.mp3'
      };
      registration.showNotification(title, options);
    }).catch(function(err) {
      // 등록 실패
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}