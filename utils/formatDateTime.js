// utils/dateTime.js
const formatDateTime = (date) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return new Date(date).toLocaleString('vi-VN', options);
};

module.exports = { formatDateTime };
