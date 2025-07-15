const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,       // đặt trong biến môi trường
        pass: process.env.MAIL_PASSWORD,   // mật khẩu ứng dụng hoặc mật khẩu email
    },
});

const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: `"BlackS City" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail,
};