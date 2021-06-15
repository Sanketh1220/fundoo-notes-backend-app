const mailgun = require('mailgun-js');
const DOMAIN = "sandbox86a49b94607f464fb8fd6fa7a3ea2ce5.mailgun.org";
const mg = mailgun({
    apiKey: MAILGUN_APIKEY,
    domain: DOMAIN
});

module.exports = function sendMail(email) {
    const data = {
        from: 'noreply@hello.com',
        to: email,
        subject: 'Hello',
        text: 'Testing some mailgun'
    };

    mg.messages().send(data, function (err) {
        console.log(err);
    })
}