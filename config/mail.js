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

// HTML email cho lịch hẹn được duyệt
const getEmailHtmlDuyet = (hoTen, ngayHen) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #000000; color: white; padding: 20px; text-align: center;">
        <h2>BlackS City</h2>
        <p style="margin: 0; font-size: 16px;">Chăm sóc khách hàng tận tâm</p>
    </div>
    <div style="padding: 20px; color: #333;">
        <p>Xin chào <strong>${hoTen}</strong>,</p>
        <p>Chúng tôi rất vui thông báo rằng <strong>lịch hẹn của bạn</strong> đã được duyệt thành công.</p>
        <p><strong>Thời gian: </strong>${ngayHen}</p>
        <p>Chúng tôi cam kết mang đến trải nghiệm tốt nhất và sẵn sàng hỗ trợ bạn trong suốt quá trình tham quan, giao dịch bất động sản.</p>
        <p>Trân trọng,<br/>Đội ngũ BlackS City</p>
    </div>
    <div style="background-color: #f5f5f5; color: #666; text-align: center; padding: 10px; font-size: 12px;">
        © 2025 BlackS City. Bảo mật và quyền riêng tư luôn được đảm bảo.
    </div>
</div>
`;

// HTML email cho lịch hẹn bị hủy
const getEmailHtmlHuy = (hoTen, ngayHen) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #ff4d4f; color: white; padding: 20px; text-align: center;">
        <h2>BlackS City</h2>
        <p style="margin: 0; font-size: 16px;">Thông báo từ BlackS City</p>
    </div>
    <div style="padding: 20px; color: #333;">
        <p>Xin chào <strong>${hoTen}</strong>,</p>
        <p>Rất tiếc thông báo rằng <strong>lịch hẹn của bạn</strong> vào ngày <strong>${ngayHen}</strong> đã bị hủy.</p>
        <p>Nếu cần hỗ trợ hoặc đặt lại lịch, xin vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại.</p>
        <p>Trân trọng,<br/>Đội ngũ BlackS City</p>
    </div>
    <div style="background-color: #f5f5f5; color: #666; text-align: center; padding: 10px; font-size: 12px;">
        © 2025 BlackS City. Bảo mật và quyền riêng tư luôn được đảm bảo.
    </div>
</div>
`;

module.exports = { sendEmail, getEmailHtmlDuyet, getEmailHtmlHuy };