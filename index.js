const express = require("express");
const { sql, connectDB } = require("./dbSQL");

const app = express();
app.use(express.json());

// الاتصال عند تشغيل التطبيق
connectDB();

// مثال: جلب بيانات من جدول
// app.get("/Reserve", async (req, res) => {
//   try {
//     const result = await sql.query("SELECT * FROM Reserve");
//     res.json(result.recordset);
//     console.log("good")
//   } catch (err) {
//     res.status(500).send("Error");
//   }
// });

// // تشغيل السيرفر
// app.listen(3000, () => console.log("rrrr"));
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "CREATE TABLE myItems (id INT AUTO_INCREMENT PRIMARY KEY, barcode VARCHAR(255), title VARCHAR(255), color VARCHAR(255), price VARCHAR(255), state VARCHAR(255), img VARCHAR(255))";
    // con.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("Table created");
    // });
    // var sql2 = "CREATE TABLE myReserve (id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), date VARCHAR(255), time VARCHAR(255), barcode VARCHAR(10), numReserve VARCHAR(15), nameReserve VARCHAR(255), itemsDress VARCHAR(255), itemsOthers VARCHAR(255), numPersonal VARCHAR(15), startReserve VARCHAR(255), endReserve VARCHAR(255), phone VARCHAR(11), adress VARCHAR(255), price VARCHAR(5), paid VARCHAR(5), remain VARCHAR(5), namRecieve VARCHAR(255), idNameRecieve VARCHAR(15), adressRecieve VARCHAR(255), phoneRecieve VARCHAR(11), state VARCHAR(10))";
    // con.query(sql2, function (err, result) {
    //   if (err) throw err;
    //   console.log("Table created");
    // });
  });