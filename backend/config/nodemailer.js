import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT), // Convert string to number
    secure: false, // Use false with port 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },

    // Timeouts
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

// Verify SMTP connection when server starts
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP verification failed:", error);
    } else {
        console.log("SMTP server is ready to send emails");
    }
});

export default transporter;