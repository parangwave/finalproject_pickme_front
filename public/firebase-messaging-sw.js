importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js");

self.addEventListener("install", function (e) {
  console.log('[Service Worker] install');
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log('[Service Worker] activate');
});

// push알림 수신시 행동
self.addEventListener("push", function (e) {
  console.log("[Service Worker] push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;

  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };

  console.log("[Service Worker] push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// push알림 클릭시 나오는 행동 => 메인페이지 클릭
self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] notification click"); 
  console.log(event);
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});