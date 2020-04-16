const User = require("../models/User");
const nodemailer = require("nodemailer");
const mailjetUsername =
  process.env.MAILJET_USERNAME ||
  require("../config/config.js").mailjet.username;
const mailjetPassword =
  process.env.MAILJET_PASSWORD ||
  require("../config/config.js").mailjet.password;

const recoveryEmail = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (user) {
        /*
        //Generate test SMTP service account from ethereal.email (service to view sent emails without sending them to the actual email inbox)
        //Only needed if you don't have a real ethereal account for testing:
        let testAccount = await nodemailer.createTestAccount();

        //create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });
        
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        */

        //create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "Mailjet", // no need to set host or port etc.
          auth: {
            user: mailjetUsername,
            pass: mailjetPassword,
          },
        });

        //send mail with defined transport object
        //note: for mailjet, the from field must be from a validated address which you can configure on your mailjet dashboard
        let info = await transporter
          .sendMail({
            from: "", // sender address
            to: req.body.email, // list of receivers
            subject: "What's up", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          })
          .catch((error) => {
            return res.json({
              success: false,
              message: error,
            });
          });

        return res.json({
          success: true,
          message: {
            id: info.messageId,
          },
        });
      } else {
        return res.json({
          success: false,
          message: "User could not be found",
        });
      }
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: error,
      });
    });
};

module.exports = { recoveryEmail };
