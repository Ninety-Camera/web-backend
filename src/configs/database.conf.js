const { Pool, Client } = require("pg");
const fs = require("fs");

const pool = new Pool({
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_USER_PASSWORD,
  port: process.env.DATABASE_PORT,
  host: "seproject.postgres.database.azure.com",
  ssl: {
    ca: fs.readFileSync(__dirname + "/ssl/DigiCertGlobalRootCA.crt.pem"),
  },
});

module.exports = pool;
