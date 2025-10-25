const axios = require("axios");
const NhaDat = require("../models/NhaDat");
require("dotenv").config();

exports.chatbot = async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ error: "Vui lòng nhập nội dung chat" });
        }

        // ✅ Dùng model cố định (khỏi gọi lại API)
        const MODEL_NAME = "models/gemini-2.5-flash";
        const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;

        // ✅ Lấy dữ liệu nhà đất từ DB 
        const dsNha = await NhaDat.findAll();
        const dataText = dsNha
            .map((nha) => {
                const gia = Number(nha.GiaBan).toLocaleString("vi-VN") + " VNĐ";
                return `Mã: ${nha.MaNhaDat}, Tên: ${nha.TenNhaDat}, Giá: ${gia}, Địa chỉ: ${nha.SoNha || ""} ${nha.Duong || ""}, ${nha.Phuong || ""}, ${nha.Quan || ""}, ${nha.ThanhPho || ""}`;
            })
            .join("\n");
        // ✅ Prompt gửi lên Gemini
        const prompt = `
Bạn là chatbot tư vấn bất động sản tại Việt Nam.
Khách hỏi: "${userMessage}"

Dưới đây là danh sách nhà hiện có trong cơ sở dữ liệu:
${dataText}

Hãy gợi ý cho khách những căn phù hợp nhất (ghi rõ mã nhà và lý do).
Nếu khách muốn thêm lựa chọn, hãy mở rộng gợi ý khác.
`;

        // ✅ Gọi Gemini API
        const response = await axios.post(GEMINI_URL, {
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
            ],
        });

        let aiReply =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Xin lỗi, tôi không tìm thấy thông tin phù hợp.";
        aiReply = aiReply
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // In đậm **text**
            .replace(/\n\n/g, "<br><br>") // Xuống 2 dòng
            .replace(/\n/g, "<br>") // Xuống dòng
            .replace(/^- /gm, "• "); // Dấu đầu dòng

        res.json({
            message: userMessage,
            reply: aiReply,
            data: dsNha,
        });
    } catch (error) {
        console.error("❌ Lỗi khi gọi Gemini API:", error.response?.data || error.message);
        res.status(500).json({
            error: "Lỗi server khi gọi Gemini API",
            details: error.response?.data || error.message,
        });
    }
};
