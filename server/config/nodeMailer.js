import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.E_PASS,
    },
});

export const sendMail = async (to, subject, message) => {
    const info = await transporter.sendMail({
        from: `"Harsh Yadav" ${process.env.EMAIL}`,
        to: to,
        subject: subject,
        text: "Hello world?",
        html: message,
    });
    return info;
}