require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/UserRoutes")
const loginRoutes = require("./routes/LoginRoutes");
require("./models/quanhe");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api", loginRoutes);
const PORT = process.env.PORT;
sequelize.sync({ alter: true }) // Tạo bảng nếu chưa có
    .then(() => {
        console.log("Database synced!");
        app.listen(PORT, () => {
            console.log(`Server chạy tại http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Lỗi kết nối database:", error);
    });
