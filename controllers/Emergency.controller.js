const db = require("../config/mysqlDb");

exports.ViewAllEmergency = async (req, res) => {
  db.execute("SELECT * FROM mobilenumber", (err, rows) => {
    if (err) {
      console.log(err);
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
