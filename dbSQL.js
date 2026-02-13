// db.js
const sql = require("mssql");

// إعدادات الاتصال بقاعدة البيانات
const config = {
  user: "",          // مثال: sa
  password: "",       // مثال: 12345
  server: "DESKTOP-9SKB3IT",           // أو اسم السيرفر/IP
  database: "",              // اسم قاعدة البيانات
  options: {
    encrypt: false,              // اجعلها true عند الاتصال بسيرفر سحابي
    trustServerCertificate: true // لتفادي مشاكل SSL أثناء التطوير
  }
};

// إنشاء الاتصال
async function connectDB() {
  try {
    await sql.connect(config);
    console.log("good")
    // const result = await sql.query ` select * from Reserve where id = ${ value } `
    console.dir ( result ) 
  }
     catch ( err ) { // ... عمليات التحقق من الأخطاء } } ) ( )
  }
}


module.exports = { sql, connectDB };


// const  sql  =  require ('mssql') 

// ( async  ( )  =>  { 
//     try  { 
//         // تأكد من ترميز عنوان URL الخاص بأي عناصر بشكل صحيح في سلسلة الاتصال 
//         await sql.connect  ( ' Server=DESKTOP-9SKB3IT, 1433 ;Database = DB_Market;User Id="";Password="";Encrypt=true' )
//         const result = await sql.query ` select * from mytable where id = ${ value } `
//         console.dir ( result ) } catch ( err ) { // ... عمليات التحقق من الأخطاء } } ) ( )
            
//     }
//   })
