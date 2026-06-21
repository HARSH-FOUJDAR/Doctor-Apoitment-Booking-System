const db = require("../config/mysqlDb");
const mysql = require("mysql2/promise");
exports.ViewAllEmergency = async (req, res) => {
  db.execute("SELECT * FROM mobilenumber", (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      mobileNumbers: rows,
    });
  });
};
