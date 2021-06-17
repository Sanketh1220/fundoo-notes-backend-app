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

    sendRegistrationEmail(userData) {

        const data = {
            from: 'noreply@fundooNotes.com',
            to: userData.email,
            subject: "Registration Successful",
            html: `
            <h1>Fundoo Notes</h1>
            <h2>Thank you registering with Fundoo Notes App!</h2>
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
            <p>${process.env.BASE_URL}/resetPassword/${token}</p>
        `
        }

        mg.messages().send(data, function (err) {
            console.log(err);
        });
    }

    sendSuccessEmail(userData) {
        const data = {
            from: 'noreply@fundooNotes.com',
            to: userData.email,
            subject: "Password Reset Successful!",
            html: `
            <h2>Password reset successful!, Now login using new password and use notes app.</h2>
            <h2>Thank You</h2>
            <p>Fundoo Notes App!</p>
        `
        }

        mg.messages().send(data, function (err) {
            console.log(err);
        });
    }
}

module.exports = new MailGun();