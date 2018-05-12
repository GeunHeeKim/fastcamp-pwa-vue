var request = require('request');

//firebase 프로젝트 설정의 server key
var serverKey = "key=" + "AAAAx7CQWeM:APA91bEFsLOyqhy4H7qfzxzn8jc3Bll8V29_UBszv6efjRuhICE0LFJR4akZFiNjYCSq7VWm886ltTg_FYCPumy973EV3bqCQ47M6uenmEi7EjOgM6BgR5mWEE9ygqBx1X4YjyCPCd-i";
//단말기 키값
var deviceKey = "cTd77OUbc-I:APA91bEbAOdZSqVrcxwMzgMVo5STF38DRPMJV10jVhVoSdvFpDh4vIyWc-HiGlO4vBs7VPETw2AXRp4JMrQrK0SYCMGO0j3HrVqKF9Pp5Sli5q3QhpwUUPF3cUjaTjeSpDtdQa2iNsUb";
sendMessageToUser(serverKey, deviceKey);

function sendMessageToUser(serverKey, deviceKey, message) {
  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type' :' application/json',
      'Authorization': serverKey,
    },
    body: JSON.stringify(
      {
        "registration_ids": [
          deviceKey
        ]
      }
    )
  }, function(error, response, body) {
    console.log("Result Log - ", body);
    if (error) {
      console.error(error, response, body);
    } else if (response.statusCode >= 400) {
      console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body);
    } else {
      console.log('Done!');
    }
  });
};
