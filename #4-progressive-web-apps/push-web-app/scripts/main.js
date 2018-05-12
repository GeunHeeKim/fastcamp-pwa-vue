/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

'use strict';
const pushButton = document.querySelector('.js-push-btn');
let isSubscribed = false;
let swRegistration = null;

// 화면 ui 초기화
function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // 브라우저가 등록되어 있으면 PUSH 등록을 해제하는 메서드
      unSubscribeUser();
    } else {
      //브라우저가 등록되어있지 않는 유저
      subscribeUser();
    }
  });

  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  })
  .catch(function(err) {
    console.log(err);
  });
}

//브라우저를 Push  서버에 등록하는 메서드
function subscribeUser() {
  swRegistration.pushManager.subscribe({
    // 푸시 수신 시 알람 표시 속성
    userVisibleOnly: true
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);
    isSubscribed = true;
    updateSubscriptionOnServer(subscription);
    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function unSubscribeUser() {
  swRegistration.pushManager.getSubscription().then(function(subscription) {
    subscription.unsubscribe().then(function(successful) {
      console.log('User is unsubscribed : ', successful);
      console.log('Unsubscribed subscription : ', subscription);

      updateSubscriptionOnServer(subscription, successful);
      isSubscribed = false;

      updateBtn();
    }).catch(function(e) {
      console.log('Failed to unsubscribe the user: ', e);
      updateBtn();
    })
  });
}

// index.html 안에 내용 넣는 부분
function updateSubscriptionOnServer(subscription, unsubscribed) {
  var subscriptionJson = document.querySelector('.js-subscription-json');
  var subscriptionDetails = document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');

    sendDeviceKeytoFirebase(subscription.endpoint.split('send/')[1]);
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

//브라우저 푸시 등록 여부에 따라 버튼 활성화 여부 결정
function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

//서비스워커 등록
if ('serviceWorker' in navigator) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('./sw.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
      initialiseUI();
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.error('registered failed');
}

