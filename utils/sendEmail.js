require('dotenv').config();
const nodemailer = require('nodemailer');
const { PassThrough } = require('stream');
const user = require('../app/models/user');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "email-smtp.us-east-2.amazonaws.com",
            secure: true,
            auth: {
                user: "AKIA5Y4YLNPQJCNLWZ4C",
                pass: "BBNzd/mqaU1I3K6piVy5Qn7c/ynSrzf6XG2DEeLMAm7V"
            }
        });

        console.log(email)

        await transporter.sendMail({
            from: "hello@sundeep.tech",
            to: "sanketh.babbur11@gmail.com",
            subject: subject,
            text: text,
        });

        console.log('Email sent successfully!');
    } catch (error) {
        console.log(error, "Email not sent!");
    }
};

module.exports = sendEmail;