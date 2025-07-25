const { Expo } = require('expo-server-sdk');
const expo = new Expo();

async function sendPushNotification(pushToken, title, body) {
  if (!Expo.isExpoPushToken(pushToken)) return;
  await expo.sendPushNotificationsAsync([{
    to: pushToken,
    sound: 'default',
    title,
    body,
  }]);
}
module.exports = { sendPushNotification }; 