const nodemailer = require("nodemailer");

const client = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ninetycamera@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

async function sendEmail(data) {
  await client.sendMail({
    from: "ninetycamera@gmail.com",
    to: data.toEmail,
    subject: data.subject,
    text: data.text,
  });
}

module.exports = { sendEmail };
