const { Expo } = require("expo-server-sdk");
const createOutput = require("../helpers/createOutput");

const deviceRepository = require("../repositories/deviceRepository");

async function sendNotification(data) {
  if (!data?.systemId) return createOutput(400, "Invalid data");
  let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  const devices = await deviceRepository.getMobileDevices(data.systemId);
  const deviceIds = devices.map((item) => item.id);

  deviceIds.forEach((element) => {
    if (!Expo.isExpoPushToken(element)) {
      return createOutput(400, "Invalid device id");
    }
  });

  const messages = deviceIds.map((item) => {
    return {
      to: item,
      sound: "default",
      body: "Intrusion detected",
      data: { withSome: "data" },
    };
  });

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
