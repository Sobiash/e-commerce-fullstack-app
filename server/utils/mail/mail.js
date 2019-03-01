const mailer = require("nodemailer");
const { welcome } = require("./welcome");

const getEmailData = (to, name, token, template) => {
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
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, token, type) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getEmailData(to, name, token, type);

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
