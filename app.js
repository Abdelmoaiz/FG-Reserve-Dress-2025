const express = require("express");
const { sql, connectDB } = require("./dbSQL");

const app = express();
app.use(express.json());

// الاتصال عند تشغيل التطبيق
connectDB();

// مثال: جلب بيانات من جدول
app.get("/Reserve", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Reserve");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("حدث خطأ أثناء جلب البيانات");
  }
});

// تشغيل السيرفر
app.listen(3000, () => console.log("🚀 السيرفر يعمل على المنفذ 3000"));
