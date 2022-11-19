var admin = require("firebase-admin");
const createOutput = require("../helpers/createOutput");

var serviceAccount = require("./firebase-conf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function sendNotifications(tokens) {
  const message = {
    notification: {
      title: "Intrusion Detected",
      body: "An intrusion detected in your cctv system",
    },
    tokens: tokens,
  };
  return new Promise((resolve, reject) => {
    admin
      .messaging()
      .sendMulticast(message)
      .then((response) => {
        console.log(response);
        if (response.failureCount > 0) {
          const failedTokens = [];
          response.responses.forEach((resp, idx) => {
            if (!resp.success) {
              failedTokens.push(tokens[idx]);
            }
          });
          resolve(
            createOutput(400, "Error occured while sending to some devices")
          );
        } else {
          resolve(createOutput(200, "Notifications sended succesfully!"));
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

module.exports = { sendNotifications };
