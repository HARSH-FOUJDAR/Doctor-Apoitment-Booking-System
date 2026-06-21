const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Harsh@123",
  database:"MOBILE",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  }
  console.log("Connected to MySQL database");
}
);

module.exports = db;
