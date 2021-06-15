const mailgun = require('mailgun-js');
const {
    generateAccessToken
} = require('../app/middleware/helper');
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({
    apiKey: MAILGUN_APIKEY,
    domain: DOMAIN
});
class MailGun {

    sendMail(email) {
        const data = {
            from: 'noreply@fundooNotes.com',
            to: email,
            subject: 'Hello',
            text: 'Testing some mailgun'
        };

        mg.messages().send(data, function (err) {
            console.log(err);
        })
    }

    sendActivationLink(userData) {
        const token = generateAccessToken(userData);

        const data = {
            from: 'noreply@fundooNotes.com',
            to: userData.email,
            subject: "Account activation link",
            html: `
            <h2>Please click on the link given below to activate your account</h2>
            <p>${process.env.BASE_URL}/authentication/activate/${token}</p>
        `
        }

        mg.messages().send(data, function (err) {
            console.log(err);
        });

    }

    sendPasswordResetLink(userData) {
        const token = generateAccessToken(userData);
        const data = {
            from: 'noreply@fundooNotes.com',
            to: userData.email,
            subject: "Reset Password link, Fundoo Notes App",
            html: `
            <h2>Please click on the link given below to reset your password</h2>
            <p>${process.env.BASE_URL}/authentication/activate/${token}</p>
        `
        }

        mg.messages().send(data, function (err) {
            console.log(err);
        });
    }
}

module.exports = new MailGun();