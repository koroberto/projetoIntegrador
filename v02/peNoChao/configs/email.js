const nodemailer = require('nodemailer');

const email = nodemailer.createTransport({

        host: "smtp.mailtrap.io",
        service: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0a7b8ce66e1179",
          pass: "131faca11b8507"
        },
        secure: false,
       // debug: true, // show debug output
       // logger: true
})

module.exports = email;       