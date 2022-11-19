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

    html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Reset your password for Ninety-Camera</h2>
        <p style="margin-bottom: 30px;">Use the following 6 digit code to reset the passwod</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center; color:#6C63FF">${data?.text}</h1>
        <p style="margin-top:50px;">This OTP only valid for 5 minutes</p>
      </div>
    `,
  });
}

async function sendPasswordChangedMail(data) {
  await client.sendMail({
    from: "ninetycamera@gmail.com",
    to: data.email,
    subject: "Your password changed",

    html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Your password changed succesfully</h2>
        <p style="margin-bottom: 30px;">Dear ${data.firstName},</p>
        <p style="margin-bottom: 30px;">Your ninety camera account password changed succesfully</p>
        <p style="margin-top:50px; color:#DC3535">If you do not done this action. Reply to this email as soon as possbile</p>
      </div>
    `,
  });
}

module.exports = { sendEmail, sendPasswordChangedMail };
