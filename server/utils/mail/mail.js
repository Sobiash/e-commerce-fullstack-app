const mailer = require("nodemailer");
const { welcome } = require("./welcome");
const { purchase } = require("./purchase");
const { resetPassWord } = require("./resetPassword");
require("dotenv").config();

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;
  switch (template) {
    case "welcome":
      data = {
        from: "Fashe <sobiashahbaz06@gmail.com>",
        to,
        subject: `Welcome to Fashe ${name}`,

        html: welcome()
      };
      break;
    case "purchase":
      data = {
        from: "Fashe <sobiashahbaz06@gmail.com>",
        to,
        subject: `Thanks for shopping with us ${name}`,
        html: purchase(actionData)
      };
      break;
    case "reset-password":
      data = {
        from: "Fashe <sobiashahbaz06@gmail.com>",
        to,
        subject: `Hey ${name}, reset your pass`,
        html: resetPassWord(actionData)
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sobiashahbaz06@gmail.com",
      pass: "Mi08bba016"
    }
  });

  const mail = getEmailData(to, name, token, type, actionData);

  smtpTransport.sendMail(mail, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent");
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
