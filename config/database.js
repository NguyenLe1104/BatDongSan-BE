const { Sequelize } = require("sequelize");
require("dotenv").config();

const PORT = Number(process.env.DB_PORT)

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER.split("\\")[0],
    dialect: "mssql",
    port: PORT,
    dialectOptions: {
        options: {
            encrypt: process.env.DB_ENCRYPT === "true",
            enableArithAbort: true,
            instanceName: process.env.DB_SERVER.split("\\")[1] || undefined,
        },
    },
    logging: console.log,
});

module.exports = sequelize;
