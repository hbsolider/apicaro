const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');
import mailActive from './mailActive';
import mailPassword from './mailResetPassword';
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
    from: `"CaroHihi" peterpans2030@gmail.com`,
    to: `${receiverEmail}`,
    subject: 'Activate Your Account Via CaroHihi',
    // html: await readFile('src/utils/index.html', 'utf8'),
    html: mailActive(link),
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

export const sendMailResetPassword = async ({
  receiverEmail,
  link = 'https://google.com',
}) => {
  const mailOptions = {
    from: `"CaroHihi" peterpans2030@gmail.com`,
    to: `${receiverEmail}`,
    subject: 'Reset password Via CaroHihi',
    // html: await readFile('src/utils/index.html', 'utf8'),
    html: mailPassword(link),
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
