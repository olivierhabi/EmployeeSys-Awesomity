var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3cf4b9838e4a5a",
    pass: "0ebb6216f7395e"
  }
});

var mailOptions = {
  from: '"ETeam Test" <from@example.com>',
  to: "walterolivier4@gmail.com, habimanaolivier6@gmail.com",
  subject: "Nice Nodemailer test",
  text: "Hey there, it’s our first message sent with Nodemailer ;) ",
  html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer"
};
transport.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
