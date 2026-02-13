
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database:"Database_Center_Engy_2025"
});
// variable
function refreshAuto(){
    window.location.reload();
}
const {ipcRenderer}=   require('electron');
const { stat } = require('original-fs');

let create = document.querySelector('#create');
let barcode = document.querySelector('#barcode');
let title = document.querySelector('#title');
let color = document.querySelector('#color');
let priceNight = document.querySelector('#priceNight');
let itemsState = document.querySelector('#itemsState');
let date = new Date();
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML = localStorage.getItem('userNameView');
// dateAndTime.innerHTML = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;

if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateAndTime.innerHTML = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() >= 10){
    dateAndTime.innerHTML = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 >= 10 && date.getDate() < 10){
    dateAndTime.innerHTML = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateAndTime.innerHTML = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}


let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}

let mood = 'create';
let tmp;

function addItems(){
    document.querySelector(".inputs").style.display = "block";
}
function exitInput(){
    document.querySelector(".inputs").style.display = "none";
}

let Upload = document.querySelector('#upload');
let img = document.querySelector('#img');
Upload.onchange = function() {
    let file = new FileReader();
    file.readAsDataURL(Upload.files[0])
    file.onload = function(){
        img.setAttribute('src',file.result)
    }
    
}
// create data
let items;
if(localStorage.AllItems != null){
    items = JSON.parse(localStorage.AllItems)
    
}else{
    items = []
}

let result;
function insertData(){
    
}
insertData();
// if(localStorage.result != null){
//     result = JSON.parse(localStorage.result)
// }else{
//     result = []
// }

// function readData(){
//     if(localStorage.result != null){
//         result = JSON.parse(localStorage.result)
//     }else{
//         result = []
//     }
// }

function searchresult(){
    
}

create.addEventListener('click',(e)=>{
    e.preventDefault();
    if((barcode.value && title.value && color.value  ) != ""){
        
        if(mood === 'create') {
            var sql = `INSERT INTO myitems (barcode, title, color, price, state, img) VALUES ('${barcode.value}','${title.value}','${color.value}','${priceNight.value}','${itemsState.value}','${img.src}')`;
                con.query(sql, function (err, result) {
                if (err) throw err ;
                    console.log("تم التسجيل!");
                    window.location.reload();
                });
            // con.connect(function(err) {
            //     if (err) throw err;
            //     console.log("Connected!");
                
                
            //   });  
            
            
            // localStorage.setItem('myItems',JSON.stringify(items));

        }else if (mood === 'update'){
            create.innerHTML = ' اضافة الصنف';
            // var sql = `UPDATE myitems SET name_year='${name_year.value}',notes='${notes.value}' WHERE name_Academic_Year.id = ${id_data}`;
            var sql = `UPDATE myitems SET barcode='${barcode.value}',title='${title.value}',color='${color.value}',price='${priceNight.value}',state='${itemsState.value}',img='${img.src}' WHERE myitems.id = ${tmp}`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
            });
            window.location.reload();
            // ipcRenderer.send('update-items', {...newItems, tmp})

        }

    }
    
    showItems();
})


function checkBarcode(){
    let query = "SELECT * FROM myitems";
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{    
          for(let i=0;i<result.length;i++){
            let data = result[i];
            if(barcode.value.includes(result[i].barcode)){
                barcode.value = '';
            }else{

            }
        }
    }

        // mydataPro.push(myData)
    })
}

// read data

setTimeout(() => {
    // for(let i = 0; i<items.length;i++){
    //     var sql = `INSERT INTO myitems (barcode, title, color, price, state, img) VALUES ('${items[i].myItems.barcode}','${items[i].myItems.title}','${items[i].myItems.color}','${items[i].myItems.priceNight}','${items[i].myItems.itemsState}','${items[i].myItems.img}')`;
    //     con.query(sql, function (err, result) {
    //     if (err) throw err ;
    //         console.log("تم التسجيل!");
    //     });
    // }
    // ipcRenderer.send('get-Data', 'bing')
    // ipcRenderer.on('get-Data',(e,args)=>{

    
    //     const myData = JSON.parse(args)
    //     localStorage.setItem('AllItems',JSON.stringify(myData));
    //     // console.log(myData)

    //     // mydataPro.push(myData)
    // })

}, 1);

let mydataPro =[];
function showItems() {
    let tableItems= '';
    let query = "SELECT * FROM myitems ORDER BY barcode ASC";
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{    
        

            for(let i = 0; i < result.length; i++){
            
            tableItems += `
                    <tr>
                        <td><mark>${result[i].barcode}</mark></td>
                        <td>${result[i].title}</td>
                        <td>${result[i].color}</td>
                        <td>${result[i].price}</td>
                        <td>${result[i].state}</td>
                        <td onclick="viewImg(${i});"><img src="${result[i].img}"/></td>
                        <td><button onclick="updateData('${result[i].id}');">تعديل</button></td>
                        <td><button onclick="deleteData('${result[i].id}');">حذف</button></td>
                                
                    </tr>
                `
                
            }
            document.querySelector('.tbodyItems').innerHTML = tableItems;
        }
    })
    
}
showItems();

function viewImg(i) {
    console.log(i)
    document.querySelector('.View').style.display = 'block';
    // document.querySelector('.imgView').setAttribute('src',`${items[i].img}`)
}

function hideImg(){
    document.querySelector('.View').style.display = 'none';

}

function updateData(id) {
    document.querySelector('.inputs').style.display = 'block';
    console.log(id)
    tmp = id;
    let query = "SELECT * FROM myitems";
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{    
            for(let i=0;i<result.length; i++){
                if(result[i].id == id){
                    barcode.value = result[i].barcode;
                    title.value = result[i].title;
                    color.value = result[i].color;
                    priceNight.value = result[i].price;
                    itemsState.value = result[i].state;
                    img.src = result[i].img;
                }
            }
        }
        
    })

    
    title.focus();
    scroll({
        top:0,
        behavior: "smooth",
    })
    create.innerHTML = 'تحديث';
    mood = 'update';

    
}
let tmpIdDelete;
function deleteData(id) {
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.alarm').style.display = 'block';
            tmpIdDelete = id;
        }
    }

}
function checkPass(){
    let query = "SELECT * FROM myitems";

    var sql = `DELETE FROM myitems WHERE myitems.id = ${tmpIdDelete}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        });  
        window.location.reload();
}

let searchBarcode = document.querySelector('#searchBarcode');
let searchMood = 'barcode';
let btnSearch = document.querySelector('#btnSearch');
let stateSearch = document.querySelector('#stateSearch');
let nameSearch = document.querySelector('#nameSearch');


function search(value) {
    // readData();
    let tableReserve = '';
    let query;
    if(query = `SELECT * FROM myitems WHERE barcode = '${value.toLowerCase()}'`){

        con.query(query,function(err,result){
            
            if(err){console.log(err)}
            else{    
            
    
                for(let i = 0; i < result.length; i++){
                
                    
                        tableReserve += `
                            <tr>
                                <td><mark>${result[i].barcode}</mark></td>
                                <td>${result[i].title}</td>
                                <td>${result[i].color}</td>
                                <td>${result[i].price}</td>
                                <td>${result[i].state}</td>
                                <td onclick="viewImg(${i});"><img src="${result[i].img}" /></td>
                                <td><button onclick="updateData('${result[i].id}');">تعديل</button></td>
                                <td><button onclick="deleteData('${result[i].id}');">حذف</button></td>
                                        
                            </tr>
                        `
                        
                    // }
                    // else if(result[i].title.includes(value.toLowerCase())){
                    //         tableReserve += `
                    //             <tr>
                    //                 <td>${result[i].barcode}</td>
                    //                 <td><mark>${result[i].title}</mark></td>
                    //                 <td>${result[i].color}</td>
                    //                 <td>${result[i].price}</td>
                    //                 <td>${result[i].state}</td>
                    //                 <td onclick="viewImg(${i});"><img src="${result[i].img}" /></td>
                    //                 <td><button onclick="updateData('${result[i].id}');">تعديل</button></td>
                    //                 <td><button onclick="deleteData('${result[i].id}');">حذف</button></td>
                                    
                    //             </tr>
                    //         `
                            
                    // }else {
                    //     if(result[i].color.includes(value.toLowerCase())){
                    //         tableReserve += `
                    //             <tr>
                    //                 <td>${result[i].barcode}</td>
                    //                 <td>${result[i].title}</td>
                    //                 <td><mark>${result[i].color}</mark></td>
                    //                 <td>${result[i].price}</td>
                    //                 <td>${result[i].state}</td>
                    //                 <td onclick="viewImg(${i});"><img src="${result[i].img}" /></td>
                    //                 <td><button onclick="updateData('${result[i].id}');">تعديل</button></td>
                    //                 <td><button onclick="deleteData('${result[i].id}');">حذف</button></td>
                                    
                    //             </tr>
                    //         `
                            
                    //     }
                    
                    // }
                    document.querySelector('.tbodyItems').innerHTML = tableReserve;
                
                }
            }
        })           
    }else if(query = `SELECT * FROM myitems WHERE title = '${value.toLowerCase()}'`){
        con.query(query,function(err,result){
            
            if(err){console.log(err)}
            else{    
            
    
                for(let i = 0; i < result.length; i++){
                
                    
                    tableReserve += `
                        <tr>
                            <td>${result[i].barcode}</td>
                            <td><mark>${result[i].title}</mark></td>
                            <td>${result[i].color}</td>
                            <td>${result[i].price}</td>
                            <td>${result[i].state}</td>
                            <td onclick="viewImg(${i});"><img src="${result[i].img}" /></td>
                            <td><button onclick="updateData('${result[i].id}');">تعديل</button></td>
                            <td><button onclick="deleteData('${result[i].id}');">حذف</button></td>
                            
                        </tr>
                    `
                        
                    
                    document.querySelector('.tbodyItems').innerHTML = tableReserve;
                
                }
            }
        }) 
       
                
    }else if(query = `SELECT * FROM myitems WHERE color = '${value.toLowerCase()}'`){

        con.query(query,function(err,result){
            
            if(err){console.log(err)}
            else{    
            
    
                for(let i = 0; i < result.length; i++){
                
                    
                    tableReserve += `
                        <tr>
                            <td>${result[i].barcode}</td>
                            <td>${result[i].title}</td>
                            <td><mark>${result[i].color}</mark></td>
                            <td>${result[i].price}</td>
                            <td>${result[i].state}</td>
                            <td onclick="viewImg(${i});"><img src="${result[i].img}" /></td>
                            <td><button onclick="updateData('${result[i].id}');">تعديل</button></td>
                            <td><button onclick="deleteData('${result[i].id}');">حذف</button></td>
                            
                        </tr>
                    `
                
                    
                    document.querySelector('.tbodyItems').innerHTML = tableReserve;
                
                }
            }
        }) 

    }else{
        tableReserve = '';
        document.querySelector('.tbodyItems').innerHTML = tableReserve;

    }


}



function exitePass(i) {
    window.location.reload();

}
document.querySelector('#btnRefresh').onclick = function (){
    window.location.reload();

}
