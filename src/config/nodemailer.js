const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.nodeEmail,
    pass: process.env.nodePassword,
    // Get From Google Console OAuth Credential
    clientId: process.env.clientIdGoogle,
    clientSecret: process.env.clientSecret,
    // Get From Google Developer OAuth20 PlayGround
    refreshToken: process.env.nodeMailerRefreshToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMailActiveAccount = async ({
  receiverEmail,
  link = 'https://google.com',
}) => {
  const mailOptions = {
    from: `"Super Caro" peterpans2030@gmail.com`,
    to: `${receiverEmail}`,
    subject: 'Activate Your Account Via Google',
    // html: await readFile('src/utils/index.html', 'utf8'),
    html: `
    <div
      style="
        padding: 40px 20px;
        border: 1px solid black;
        margin: 10px;
        border-radius: 10px;
      "
    >
      <h2 style="color: #f88f01; text-align: center">Caro Game</h2>
      <h4 style="color: black; text-align: center">Welcome to CaroGame</h4>
      <p style="color: rgb(29, 29, 29);text-align: center">Wow! So happy that you join with us</p>
      <p style="color: rgb(29, 29, 29);text-align: center">It just one step to join in</p>
      <p style="color: rgb(29, 29, 29);text-align: center">Please direct to this link</p>
      <a href="${link}" style="text-align: center; display: block;"
        ><button
          style="
            background-color: #08ae36;
            outline: none;
            border: none;
            height: 40px;
            width: 200px;
            text-align: center
          "
        >
          Click here
        </button></a
      >
    </div>`,
  };
  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error send Mail!');
        resolve({ success: false, error });
      } else {
        console.log('Mail sent');
        resolve({ success: true, info });
      }
    });
  });
};
