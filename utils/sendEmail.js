require('dotenv').config();
const nodemailer = require('nodemailer');
const { PassThrough } = require('stream');
const user = require('../app/models/user');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });
    } catch (error) {
        console.log(error, "Email not sent!");
    }
};

module.exports = sendEmail;