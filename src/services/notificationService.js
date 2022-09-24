const { Expo } = require("expo-server-sdk");
const createOutput = require("../helpers/createOutput");

async function sendNotification(deviceId, data) {
  let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  if (!Expo.isExpoPushToken(deviceId)) {
    return createOutput(400, "Invalid device id");
  }
  const messages = [
    {
      to: deviceId,
      sound: "default",
      body: "This is a test notification",
      data: { withSome: "data" },
    },
  ];
  let chunks = expo.chunkPushNotifications(messages);

  return new Promise(async (resolve, reject) => {
    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          resolve(createOutput(200, "Notification sended succesfully!"));
        } catch (error) {
          resolve(400, "Error in sending the notification!");
        }
      }
    })();
  });
}

module.exports = { sendNotification };
