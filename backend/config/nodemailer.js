import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({ 
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports 
    auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASSWORD, 
    },
})

export default transporter;