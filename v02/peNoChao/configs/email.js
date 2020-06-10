const nodemailer = require('nodemailer');

const email = nodemailer.createTransport({

        host: "smtp.mailtrap.io",
        service: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "bea010c9cf5ef9",
          pass: "eb059761b158ce"
        },
        secure: false,
       // debug: true, // show debug output
       // logger: true
})

module.exports = email;       