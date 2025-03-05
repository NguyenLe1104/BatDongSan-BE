require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/UserRoutes");
const loginRoutes = require("./routes/LoginRoutes");
const cors = require("cors");

require("./models/quanhe");
const app = express();
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],  // url FEFE
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api", loginRoutes);


const PORT = process.env.PORT || 5000 ; 

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

