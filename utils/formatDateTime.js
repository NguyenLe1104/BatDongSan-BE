const formatDateTime = (utcDate) => {
    const date = new Date(utcDate);

    // Chuyển sang giờ Việt Nam (UTC+7)
    let vnHour = date.getUTCHours() + 7;
    let vnDate = new Date(date);
    vnDate.setUTCHours(vnHour);

    // Nếu giờ vượt 24h, tăng ngày
    if (vnHour >= 24) {
        vnHour -= 24;
        vnDate.setDate(vnDate.getDate() + 1);
    }

    const minutes = vnDate.getMinutes().toString().padStart(2, '0');
    const period = vnHour < 12 ? 'Sáng' : 'Chiều';
    const hour = vnHour.toString().padStart(2, '0');

    // Chuẩn hóa ngày
    const dayOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const dayString = vnDate.toLocaleDateString('vi-VN', dayOptions);

    return `${dayString} ${hour}:${minutes} (${period})`;
};

module.exports = { formatDateTime };