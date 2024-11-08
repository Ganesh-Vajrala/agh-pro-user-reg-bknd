import nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD
    }
});

export const sendMail = async(to, subject, html) => {
    await transporter.sendMail({
        from: process.env.USER_MAIL,
        to,
        subject,
        html,
    });
};
