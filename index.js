require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/UserRoutes");
const loginRoutes = require("./routes/LoginRoutes");
const loaiNhaDatRoutes = require("./routes/LoaiNhaDatRoutes");
const nhaDatRoutes = require("./routes/NhaDatRoutes");
const registerRoutes = require("./routes/RegisterRoutes");
const khachHangRoutes = require("./routes/KhachHangRoutes");
const nhanVienRoutes = require("./routes/NhanVienRoutes");
const cors = require("cors");

require("./models/quanhe");

const app = express();


app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],  // url FE
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


app.use("/api/admin/users", userRoutes);
app.use("/api", loginRoutes);

app.use("/api/loaiNhaDat", loaiNhaDatRoutes);

app.use("/api/nhaDat", nhaDatRoutes);

app.use("/api", registerRoutes);


app.use("/api/khachHang", khachHangRoutes);

app.use("/api/nhanVien", nhanVienRoutes);

const PORT = process.env.PORT;

sequelize.sync({ alter: true })
    .then(() => {
        console.log("Database synced!");
        app.listen(PORT, () => {
            console.log(`Server chạy tại http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Lỗi kết nối database:", error);
    });
