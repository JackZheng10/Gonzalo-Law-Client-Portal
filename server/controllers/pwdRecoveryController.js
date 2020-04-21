const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");
const nodemailer = require("nodemailer");
const mailjetUsername =
  process.env.MAILJET_USERNAME ||
  require("../config/config.js").mailjet.username;
const mailjetPassword =
  process.env.MAILJET_PASSWORD ||
  require("../config/config.js").mailjet.password;
const cryptoRandomString = require("crypto-random-string");
const bcrypt = require("bcrypt-nodejs");
const moment = require("moment");

const pwdResetEmail = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (user) {
        //create password recovery session
        const sessionID = cryptoRandomString({ length: 15, type: "url-safe" });

        PasswordReset.create({
          email: req.body.email,
          used: false,
          sessionID: sessionID,
          created: new Date(),
        }).catch((error) => {
          res.json({
            success: false,
            message: error,
          });
        });

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

        //create reusable transporter object using the default SMTP transport (when wanting to send actual emails)
        /*
        let transporter = nodemailer.createTransport({
          service: "Mailjet", // no need to set host or port etc.
          auth: {
            user: mailjetUsername,
            pass: mailjetPassword,
          },
        });*/

        //send mail with defined transport object
        //note: for mailjet, the from field must be from a validated address which you can configure on your mailjet dashboard
        let info = await transporter
          .sendMail({
            from: "email@yourdomain.com", // sender address
            to: req.body.email, // list of receivers
            subject: "Gonzalo Law - Password Reset Link", // Subject line
            text:
              "Please visit the following link to reset your password: http://localhost:3000/resetpassword/" +
              sessionID +
              " (This link will expire in 1 hour from the time you received this message.)", // plain text body
          })
          .catch((error) => {
            return res.json({
              success: false,
              message: error,
            });
          });

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        return res.json({
          success: true,
          message: nodemailer.getTestMessageUrl(info),
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

const resetPassword = async (req, res) => {
  let userEmail = "";

  await PasswordReset.findOne({ sessionID: req.body.sessionID })
    .then(async (passwordReset) => {
      let hourLater = moment(passwordReset.created).add(1, "hours");
      let now = moment();

      if (passwordReset) {
        if (passwordReset.used === true || now.isAfter(hourLater)) {
          return res.json({
            success: false,
            message: "Session was used or is expired",
          });
        } else {
          await PasswordReset.findOneAndUpdate(
            { sessionID: passwordReset.sessionID },
            { used: true }
          )
            .then((passwordReset) => {
              userEmail = passwordReset.email;
            })
            .catch((error) => {
              return res.json({
                success: false,
                message: "Error while setting session to used",
              });
            });
        }
      } else {
        return res.json({
          success: false,
          message: "Session ID is not valid",
        });
      }
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: error,
      });
    });

  //had to hash here instead of updating with pwd from req.body, if not then console loggging after "then" shows the pwd as hashed but in the db its plaintext?
  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(8)
  );

  User.findOneAndUpdate({ email: userEmail }, { password: hashedPassword })
    .then((user) => {
      //console.log("new pwd: " + user.password);
      return res.json({
        success: true,
        message: "Password updated successfully",
      });
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: error,
      });
    });
};

module.exports = { pwdResetEmail, resetPassword };
