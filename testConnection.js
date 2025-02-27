const sequelize = require("./config/database");

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("✅ Kết nối đến database thành công!");
    } catch (error) {
        console.error("❌ Kết nối thất bại:", error);
    } finally {
        await sequelize.close();
    }
}

testConnection();
