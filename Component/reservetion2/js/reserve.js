const {ipcRenderer}=   require('electron')
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"Database_Center_Engy"
});

let barcode = document.querySelector('#barcode');
let reserveAdd = document.querySelector('#reserveAdd');
let nameReserve = document.querySelector('#nameReserve');
let numPersonal = document.querySelector('#numPersonal');
let startReserve = document.querySelector('#startReserve');
let endReserve = document.querySelector('#endReserve');
let phone = document.querySelector('#phone');
let adress = document.querySelector('#adress');
let itemsDress = document.querySelector('#itemsDress');
let itemsDetails = document.querySelector('#itemsDetails');
let itemsState = document.querySelector('#itemsState');
let totalPrice = document.querySelector('#totalPrice');
let pricePaid = document.querySelector('#pricePaid');
let priceRemaining = document.querySelector('#priceRemaining');
let numReserve = document.querySelector('#numReserve');
let create = document.querySelector('#create');
let itemsOthers = document.querySelector('#itemsOthers');
let saveData = document.querySelector('#saveData');
let mood = 'create';
let tmp;
let tmpOther;
let tmpOther2;
let tmpUpdate;




let date = new Date();
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');

let namRecieve = document.querySelector('#namRecieve');
let idNameRecieve = document.querySelector('#idNameRecieve');
let adressRecieve = document.querySelector('#adressRecieve');
let phoneRecieve = document.querySelector('#phoneRecieve');
let dateSettle = document.querySelector('#dateSettle');
let priceSettle = document.querySelector('#priceSettle');
let remainAll = document.querySelector('#remainAll');
let totalRemainAll = document.querySelector('#totalRemainAll');
// let SearchDataRes = document.querySelector('#SearchDataRes');


startReserve.value = 
dateSearch.value =
endReserve.value = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}` 
startReserve.addEventListener('change', e =>{
    endReserve.value = startReserve.value;
})


function homePage(){
    window.location.href = "../home/home.html";
}

function showTableAllReservation(){
    document.querySelector("#AllReservation").style.display = "block";
    document.querySelector('#btnShowInp').style.display = "block";
    document.querySelector(".invoiceClient").style.display = "none";
    document.querySelector(".inputsItems").style.display = "none";
    document.querySelector(".search").style.display = "none";
    document.querySelector("#btnSear").style.backgroundColor = "rgb(110, 219, 247)";    
    document.querySelector("#btnDress").style.backgroundColor = "rgb(110, 219, 247)";
    document.querySelector("#btnAllReservation").style.backgroundColor = "rgb(33, 161, 112)";

}
function showReservation(){
    document.querySelector(".inputsItems").style.display = "block";
    document.querySelector('#btnShowInp').style.display = "block";
    document.querySelector(".search").style.display = "none";
    document.querySelector("#AllReservation").style.display = "none";
    document.querySelector("#btnAllReservation").style.backgroundColor = "rgb(110, 219, 247)";
    document.querySelector("#btnSear").style.backgroundColor = "rgb(110, 219, 247)";
    document.querySelector("#btnDress").style.backgroundColor = "rgb(33, 161, 112)";

}
function showSearch(){
    document.querySelector(".search").style.display = "block";
    document.querySelector(".inputsItems").style.display = "none";
    document.querySelector("#AllReservation").style.display = "none";
    document.querySelector("#btnAllReservation").style.backgroundColor = "rgb(110, 219, 247)";
    document.querySelector("#btnDress").style.backgroundColor = "rgb(110, 219, 247)";
    document.querySelector("#btnSear").style.backgroundColor = "rgb(33, 161, 112)";

    
}



let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}
// let result;
// if(localStorage.result != null){
//     result = JSON.parse(localStorage.result);
// }else{
//     result = []
// }

function readReserve(){
    // if(localStorage.result != null){
    //     result = JSON.parse(localStorage.result);
    // }else{
    //     result = []
    // }
}

function getresult() {
    // ipcRenderer.send('get-reserve', 'bing')
    // ipcRenderer.on('get-reserve',(e,args)=>{
    //     const myReserve = JSON.parse(args)
    //     // result.push(myReserve);
    //     localStorage.setItem('result',JSON.stringify(myReserve))
    // })
}
// getresult();

let items = [];

// setTimeout(() => {
//     ipcRenderer.send('get-Data', 'bing')
//     ipcRenderer.on('get-Data',(e,args)=>{
//         const myItems = JSON.parse(args)
//         items.push(myItems)
//     })
//     getresult();
//     // readReserve();
//     showAllReserve();
//     showReserve();

// }, 1);

function showItems() {
    let tableItems= '';
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myItems = JSON.parse(args)
        items.push(myItems)
    })
    

}
showItems();



function calcRemain() {
    priceRemaining.value = +totalPrice.value - +pricePaid.value;
    remainAll.value = priceRemaining.value;
    calcTotal();
}



function calcTotal(){
    totalRemainAll.value = +remainAll.value - +priceSettle.value;
}









let dateRes = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;
let dateNow = document.querySelector('#dateNow');
let timeReserve = `${date.getHours()}:${date.getMinutes()}:${date.getDay()}` ;
if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow.value =
    startReserve.value = 
    dateSearch.value = 
    endReserve.value = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() >= 10){
    dateNow.value =
    startReserve.value = 
    dateSearch.value = 
    endReserve.value = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 >= 10 && date.getDate() < 10){
    dateNow.value =
    startReserve.value = 
    dateSearch.value = 
    endReserve.value = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow.value =
    startReserve.value = 
    dateSearch.value = 
    endReserve.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

userName.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML = dateNow.value;

let idReserve;
function getNumReserve(){
    readReserve();
    // console.log("result")
    let query = "SELECT * FROM myreserve";;
    con.query(query,function(err,result){
        if(err){console.log(err)}
        else{
            if(result.length != 0){

                for(let i = 0; i < result.length; i++){
                    if(mood == "create"){
    
                        if(result != ''){
                            if(nameReserve.value != ''){
                                for(let i =0;i<result.length;i++){
                                    if(numReserve.value == result[i].numReserve ) {
                                        numReserve.value =  20250000 + +result[i].id + 1;
                                        idReserve = 20250000 + +result[i].id + 1;
                                        console.log('1')
                                        console.log(numReserve)
                                        console.log(idReserve)
                                    }else{
                                        numReserve.value =  20250000 + +result[i].id + 1;
                                        idReserve = 20250000 + +result[i].id + 1;
                                        console.log('2')
                                        console.log(numReserve)
                                        console.log(idReserve)
                    
                                    }
                                }
                            }else{
                                numReserve.value = '';
                                console.log('3')
                    
                            }
                        }else{
                            
                    
                    
                        }
                    }
                    
                }
            }else{
                numReserve.value = 20250000 + 1;
                idReserve = 20250000+1;
                // console.log('4')
                // console.log(numReserve.value)
                // console.log(idReserve)
            }
        }
    })
   
}

let showMessage = document.querySelector('.showMessage');
    // showMessage.style.display = 'block';

function checkReserve(){ 
    // showMessage.style.display = 'block';
    barcode.style.backgroundColor = "none";

    if(mood === 'create' || mood === 'add' || mood === "update"){
        // showMessage.style.display = 'block';
        let query = "SELECT * FROM myreserve";
        con.query(query,function(err,result){
            
            if(err){console.log(err)}
            else{
                if(result.length != 0){
                    for(let i = 0; i < result.length; i++){
                        console.log('checkReserve')
                        console.log(result)
                        if(result[i].startReserve == startReserve.value && result[i].barcode == barcode.value) {
                            document.querySelector('.nameItems').innerHTML = result[i].barcode;
                            itemsDress.value = "هذا الصنف محجوز";
                            barcode.value = "";
                            showMessage.style.display = 'block';
                            break;
                        }else{
                            console.log("2")
                            let query = "SELECT * FROM myitems";
                            con.query(query,function(err,result){
                                
                                if(err){console.log(err)}
                                else{    
                                    console.log()
                                    for(let i=0;i<result.length;i++){   
                                        if(barcode.value == result[i].barcode) {
                                            itemsDress.value = result[i].title;
                                        } 
                                    }     
    
                                }
                            })
                        }
                    }

                }else{
                    console.log("3")
                    let query = "SELECT * FROM myitems";
                    con.query(query,function(err,result){
                        
                        if(err){console.log(err)}
                        else{    
                            console.log()
                            for(let i=0;i<result.length;i++){   
                                if(barcode.value == result[i].barcode) {
                                    itemsDress.value = result[i].title;
                                } 
                            }     

                        }
                    })
                }
            }
        })
        
        
    
    }  
}


function resetInputs(){
    showMessage.style.display = 'none';
    document.querySelector('#reserveAdd').style.display = 'block';
    itemsDress.value =
    itemsOthers.value =
    
    totalPrice.value =
    pricePaid.value =
    priceRemaining.value =
    dateSettle.value =
    remainAll.value = '';

}
function closeMessage(){
    showMessage.style.display = 'none';

}
function showInputs(){
    reserveAdd.style.display = 'block';
    document.querySelector(".inputsItems").style.display = "block";
    document.querySelector('#btnShowInp').style.display = 'none';
    document.querySelector('.viewTable').style.display = 'none';
    document.querySelector("#AllReservation").style.display = "none";
    document.querySelector('.invoiceClient').style.display = 'block';
    nameReserve.focus();
}
let newRes =[];
create.addEventListener( 'click', (e) =>{
    e.preventDefault();
    let newReserve = '';
    // console.log(id)

    if(nameReserve.value && barcode.value && numReserve.value != ""){
        newReserve = {
            user: userName.innerHTML,
            date: dateNow.value,
            time:timeReserve,
            barcode: barcode.value,
            numReserve: numReserve.value,
            nameReserve: nameReserve.value,
            itemsDress : itemsDress.value,
            itemsOthers: itemsOthers.value,
            numPersonal : numPersonal.value,
            startReserve: startReserve.value,
            endReserve: endReserve.value,
            phone: phone.value,
            adress: adress.value,
            price: totalPrice.value,
            paid: pricePaid.value,
            remain: priceRemaining.value,
            namRecieve: namRecieve.value,
            idNameRecieve: idNameRecieve.value,
            adressRecieve:adressRecieve.value,
            phoneRecieve: phoneRecieve.value,
            state: 'open'                                    
        
        }
        if(mood === 'create') {
            newRes.push(newReserve);
            makeInvoice();
            console.log("1")
            var sql = `INSERT INTO myreserve (user, date, time, barcode, numReserve, nameReserve, itemsDress, itemsOthers, numPersonal, startReserve, endReserve, phone, adress, price, paid, remain, namRecieve, idNameRecieve, adressRecieve, phoneRecieve, state) VALUES ('${userName.innerHTML}','${dateNow.value}','${timeReserve}','${barcode.value}','${numReserve.value}','${nameReserve.value}','${itemsDress.value}','${itemsOthers.value}','${numPersonal.value}','${startReserve.value}','${endReserve.value}','${phone.value}','${adress.value}','${totalPrice.value}','${pricePaid.value}','${priceRemaining.value}','${namRecieve.value}','${idNameRecieve.value}','${adressRecieve.value}','${phoneRecieve.value}','open')`;   
            con.query(sql, function (err, result) {
                if (err) throw err ;
                    console.log("تم التسجيل!");
                    // window.location.reload();
                });

        }else if(mood === 'add'){
            let myReserve = [];

            for(let i =0;i<result.length;i++){
    
                if(result[i]._id == tmp){
                    myReserve = result[i]
                    myReserve.push(newReserve);
                    ipcRenderer.send('update-reserve', {myReserve, tmp})
    
                    window.location.reload();
                }
                
            }
            
            
        
            
        }else if(mood === 'update'){
            var sql = `UPDATE myreserve SET user='${userName.innerHTML}',date='${dateNow.value}',time='${timeReserve}',barcode='${barcode.value}',nameReserve='${nameReserve.value}',itemsDress='${itemsDress.value}',itemsOthers='${itemsOthers.value}',numPersonal='${numPersonal.value}',startReserve='${startReserve.value}',endReserve='${endReserve.value}',phone='${phone.value}',adress='${adress.value}',price='${totalPrice.value}',paid='${pricePaid.value}',remain='${priceRemaining.value}',namRecieve='${namRecieve.value}',idNameRecieve='${idNameRecieve.value}',adressRecieve='${adressRecieve.value}',phoneRecieve='${phoneRecieve.value}',state='open' WHERE  myreserve.id = ${tmp}`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
            });
            window.location.reload();   
        
        

        }else if( mood === 'settle') {
            let myReserve = [];
            console.log("tmp")

            for(let i =0;i<result.length;i++){
                console.log(tmp)
                console.log(myReserve)
                console.log(result[i].myReserve)
                if(result[i]._id == tmp){
                    // console.log(myReserve)
                    // console.log(result[i].myReserve)
                    myReserve = result[i].myReserve
                    myReserve.push(newReserve);
                    // console.log(myReserve)
                    // console.log(result[i].myReserve)
                    // ipcRenderer.send('update-reserve', {myReserve, tmp})
                    // ipcRenderer.send('myHistory',{myReserve})
                    // ipcRenderer.send('delete-reserve',tmp)

                    printreceipt(tmp)
                    // window.location.reload();
                    
                }     
            }
            
            
        }
    }
        
        // showresult();
        // showReserve();
    barcode.value =
    itemsDress.value =
    itemsOthers.value =
    totalPrice.value =
    pricePaid.value =
    priceRemaining.value = '';


})
let tableReserve= '';

let tmpPrintInvoice;
function makeInvoice(x) {
    if(mood == 'create'){
        for(let i = 0; i < newRes.length; i++){
            if((newRes[i].numReserve && newRes[i].nameReserve) != '') {
                if(numReserve.value == newRes[i].numReserve){
                tmpPrintInvoice = i;
                tableReserve += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${newRes[i].date}</td>
                        <td>${newRes[i].user}</td>
                        <td>${newRes[i].nameReserve}</td>
                        <td>${newRes[i].numReserve}</td>
                        <td>${newRes[i].startReserve}</td>
                        <td>${newRes[i].itemsDress}</td>     
                        <td>${newRes[i].barcode}</td>     
                        <td>${newRes[i].itemsOthers}</td>
                        <td>${newRes[i].price}</td>
                        <td>${newRes[i].paid}</td>
                        <td>${newRes[i].remain}</td>
                        
                    </tr>
                    `
                }
            }
       
        
        }
    }
    
    document.querySelector('.invoiceReserve').innerHTML = tableReserve;
    tableReserve = '';
}

saveData.addEventListener('click', e =>{
    // window.location.reload();

    if(newRes != ""){
        e.preventDefault();
        // ipcRenderer.send('myReserve',newRes,`${idReserve}`)
        document.querySelector('.viewTable').style.display = 'block';
        document.querySelector('.invoiceClient').style.display = 'none';
        getresult();
        // readReserve();
        // showresult();
        // showReserve();
        printInvoice(tmpPrintInvoice);
        
    
        // window.location.reload();
    }else{
        // window.location.reload();

    }
    
    

})

function addInReserveOld(id){
    console.log(id)
    reserveAdd.style.display = 'block';
    document.querySelector('#btnShowInp').style.display = "none";
    for(let i=0;i<result.length; i++){
        console.log(result[i].myReserve)
        if(result[i]._id == id){
           
            let myDataReserve = result[i].myReserve;
            numReserve.value = myDataReserve[0].numReserve;
            nameReserve.value = myDataReserve[0].nameReserve;
            phone.value = result[i].myReserve[0].phone;
            numPersonal.value = myDataReserve[0].numPersonal;

            adress.value = myDataReserve[0].adress;
            console.log(myDataReserve[0].phone)

        }
    
        
    }
   
    mood = 'add';
    tmp= id;
    barcode.focus();
    

}
function settlement(id){
    
    let query = "SELECT * FROM myreserve";
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{    
            let result = 0;
            reserveAdd.style.display = 'block';
            document.querySelector('.infoItems').style.display = 'none';
            document.querySelector('.infoPersonal').style.display = 'none';
            document.querySelector('#btnShowInp').style.display = "none";
            console.log(id)
            for(let i=0;i<result.length; i++){
                if(result[i].id == id){
                    let myDataReserve = result;
        
                    nameReserve.value = myDataReserve[0].nameReserve;
                    numReserve.value = myDataReserve[0].numReserve;
                    
                        result += +myDataReserve[i].remain;
                        myDataReserve[i].state = 'close';
                }
                    barcode.value = 'تصفيه';
                    itemsDress.value = 'تصفيه';
        
                    priceRemaining.value = +result;
                   
                
            }
            
    
        pricePaid.focus();
        scroll({
            top:0,
            behavior: "smooth",
        })
        create.innerHTML = 'تصفية';
        mood = 'settle';
        tmp = id;
        console.log(mood)
        console.log(id)
        }
    })

       
}
let inpuCheckPass = document.querySelector('#passCheck');

let checkTmpRese;
let tmpMoodReserve;


function updateReserve(id) {
    reserveAdd.style.display = 'block';
    document.querySelector(".inputsItems").style.display = "block";
    document.querySelector('#btnShowInp').style.display = "block";
    tmp = id;
    mood = 'update';
    create.innerHTML = 'تحديث';
    
    let query = "SELECT * FROM myreserve";
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{    
        
            console.log(id)
            for(let i = 0; i < result.length; i++){
                if(result[i].id == id){
                    startReserve.value = result[i].startReserve;
                    nameReserve.value = result[i].nameReserve;
                    numReserve.value = result[i].numReserve;
                    barcode.value = result[i].barcode;
                    itemsDress.value = result[i].itemsDress;
                    itemsOthers.value = result[i].itemsOthers;
                    numPersonal.value = result[i].numPersonal;
                    phone.value = result[i].phone;
                    adress.value = result[i].adress;
                    totalPrice.value = result[i].price;
                    pricePaid.value = result[i].paid;
                    priceRemaining.value = result[i].remain;
                    nameReserve.focus();
                    scroll({
                        top:0,
                        behavior: "smooth",
                    })
                }
            }
        }
    })

   
    
    
}
let tmpIdDelete1
function deletSomeReserve(id) {
    document.querySelector('.alarm1').style.display = 'block';
    tmpIdDelete1 = id;
    document.querySelector('#passDelete').focus();
}

function checkPass1(){
    if(document.querySelector('#passDelete').value == '100'){

        var sql = `DELETE FROM myreserve WHERE myreserve.id = ${tmpIdDelete1}`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
            });  
            window.location.reload();
            showReserve();
    }else{
        document.querySelector('#passDelete').value = '';
    }
    getresult();

    window.location.reload();

}

function exitePass(){
    window.location.reload();
}


function deletSomeReserve(id){
   
   
}
function showAllReserve() {
    // readReserve();

    let tableReserve= '';
    // ipcRenderer.send('get-reserve', 'bing')
    // ipcRenderer.on('get-reserve',(e,args)=>{
    //     const myReserve = JSON.parse(args)
    //     result.push(myReserve)
        tableReserve = '';
        let query = "SELECT * FROM myreserve";
        con.query(query,function(err,result){
            
            if(err){console.log(err)}
            else{    
                for(let i = 0; i < result.length; i++){
                    if(result[i].numReserve){

                        tableReserve += `
                         <tr>
                            <td>${i+1}</td>
                            <td>${result[i].date}</td>
                            <td>${result[i].user}</td>
                            <td>${result[i].numReserve}</td>
                            <td>${result[i].nameReserve}</td>
                            <td>${result[i].startReserve}</td>
                            <td>${result[i].barcode}</td>
                            <td>${result[i].itemsDress}</td>
                            <td>${result[i].price}</td>
                            <td>${result[i].paid}</td>
                            <td>${result[i].remain}</td>
                            <td><button onclick="printreceipt('${result[i].numReserve}');">ايصال نقدية</button></td>
        
                        </tr>
                        `
                    }
                }
                document.querySelector('.AllReservation').innerHTML = tableReserve;
            }
        })
        
           
           
           
        

    // })
    
}
showAllReserve();
// console.log(dateNow.value)
function showReserve() {
    // readReserve();

    let tableReserve= '';
    // ipcRenderer.send('get-reserve', 'bing')
    // ipcRenderer.on('get-reserve',(e,args)=>{
    //     const myReserve = JSON.parse(args)
    //     result.push(myReserve)
        tableReserve = '';
        let query = "SELECT * FROM myreserve";
        con.query(query,function(err,result){
            
            if(err){console.log(err)}
            else{    
                for(let i = 0; i < result.length; i++){
                    // if(result[i][0].startReserve != '-'){
               
                        tableReserve += `
                        <tr>
                            <td>${result[i].date}</td>
                            <td>${result[i].time}</td>
                            <td>${result[i].user}</td>
                            <td>${result[i].numReserve}</td>
                            <td>${result[i].nameReserve}</td>
                            <td>${result[i].startReserve}</td>
                            <td><button onclick="showDetails('${result[i].id}','${i}');">عرض</button></td>
                            <td><button onclick="printreceipt('${result[i].numReserve}');">ايصال نقدية</button></td>
                            <td><button onclick="addInReserveOld('${result[i].id}');">اضافة</button></td>
                            <td><button onclick="settlement('${result[i].id}');">تصفيه</button></td>
                            <td><button onclick="deletReserve('${result[i].id}');">حذف</button></td>                    
                        </tr>
                        `
        
                    // }else{
        
                    // }
                }
            }
            document.querySelector('.tbodyReserve').innerHTML = tableReserve;
        })
           
            
            
            
        
    // })
    
}
// showReserve();


let tableReserve2;
let totalPriceDetails = 0;
let totalPaidDetails = 0;
let totalRemainDetails = 0;
document.querySelector('#allDetails').onclick = function(){
    document.querySelector('#allDetails').style.display = 'none';
    tableReserve2 = '';
    totalPriceDetails = 0;
    totalPaidDetails = 0;
    totalRemainDetails = 0;
}
function showDetails(id,x){
    document.querySelector('#allDetails').style.display = 'block';
    tableReserve2 = '';
        for(let i=0;i<result[x].length; i++){
            if(result[x].barcode != '-'){
                tableReserve2 += `
                <tr>
                    <td>${i+1}</td>
                    <td>${result[x].date}</td>
                    <td>${result[x].time}</td>
                    <td>${result[x].numReserve}</td>
                    <td>${result[x].nameReserve}</td>
                    <td>${result[x].startReserve}</td>
                    <td>${result[x].phone}</td>
                    <td>${result[x].barcode}</td>
                    <td>${result[x].itemsDress}</td>
                    <td>${result[x].price}</td>
                    <td>${+result[x].paid }</td>
                    <td>${result[x].remain}</td>
                    <td><button class="btn-edite" onclick="updateReserve('${i}','${x}','${id}');">تعديل</button></td>
                    <td><button class="btn-edite" onclick="deletSomeReserve('${i}','${x}','${id}');">حذف</button></td>
                </tr>
                `
            }
            
        
        document.querySelector('.AllDetails').innerHTML = tableReserve2;
    
        }
    
    tmpUpdate = id;
    showTotalDetails(id)
    scroll({
        top:0,
        behavior: "smooth",
    })
     
}



function showTotalDetails(id){
    totalPriceDetails = 0;
    totalPaidDetails = 0;
    totalRemainDetails = 0;
    for(let x=0;x<result.length; x++){
        if(result[x]._id == id){
            let result = result[x].myReserve;
            for(let i=0;i<myDataReserve.length; i++){
                totalPriceDetails += +myDataReserve[i].price;
                totalPaidDetails += +myDataReserve[i].paid ;
                totalRemainDetails += +myDataReserve[i].remain
    
                tmpUpdate = i;
    
            }
            
        }  
    }
     
            
    tableReserve2 += `
    <tr>
        <td colspan='9'>الاجمالي</td>
        
        <td>${totalPriceDetails}</td>
        <td>${totalPaidDetails}</td>
        <td>${totalRemainDetails}</td>
        
    </tr> 
    `
    document.querySelector('.AllDetails').innerHTML = tableReserve2;
    
}
function printReserve(i) {
    document.querySelector('.reservation').style.display = 'none';
    document.querySelector('.invoice').style.display = 'block';

    
    window.print();
    window.location.reload();

}
let tbRecipt = '';
let totalAllRemain,totalAllPaid,totalAllPrice;
function printInvoice(i){
    document.querySelector('.reservation').style.display = 'none';
    document.querySelector('.receipt').style.display = 'block';
            let myDataReserve = newRes[i];
            console.log(myDataReserve)

            document.querySelectorAll('.receiptPhone1')[0].innerHTML = myDataReserve.phone;
            document.querySelectorAll('.receiptPhone1')[1].innerHTML = myDataReserve.phone;

            document.querySelectorAll('.receiptAdress1')[0].innerHTML = myDataReserve.adress;
            document.querySelectorAll('.receiptAdress1')[1].innerHTML = myDataReserve.adress;

            document.querySelectorAll('.receiptNumReserve1')[0].innerHTML = myDataReserve.numReserve;
            document.querySelectorAll('.receiptNumReserve1')[1].innerHTML = myDataReserve.numReserve;


            document.querySelectorAll('.receiptNamePers1')[0].innerHTML = myDataReserve.nameReserve;
            document.querySelectorAll('.receiptNamePers1')[1].innerHTML = myDataReserve.nameReserve;
    
            document.querySelectorAll('.receiptTimeNow')[0].innerHTML = myDataReserve.time;
            document.querySelectorAll('.receiptTimeNow')[1].innerHTML = myDataReserve.time;

            document.querySelectorAll('.receiptDateNow')[0].innerHTML = myDataReserve.date;
            document.querySelectorAll('.receiptDateNow')[1].innerHTML = myDataReserve.date;
        
            document.querySelectorAll('.receiptRecieve')[0].innerHTML = myDataReserve.user;
            document.querySelectorAll('.receiptRecieve')[1].innerHTML = myDataReserve.user;

            totalAllPrice = totalAllPaid = totalAllRemain = 0;

            for(let x=0; x<newRes.length; x++){
                if(newRes[x].barcode != '-'){
                // console.log(newRes[x])
                // console.log(newRes[x].barcode)
                totalAllPrice += +newRes[x].price;
                totalAllPaid += +newRes[x].paid;
                totalAllRemain = +totalAllPrice - +totalAllPaid;
                tbRecipt += `
                    
                    <tr>
                        <td>${newRes[x].barcode}</td>
                        <td>${newRes[x].itemsDress}</td>
                        <td>${newRes[x].itemsOthers}</td>
                        <td>${newRes[x].startReserve}</td>
                        <td>${newRes[x].price}</td>
                        <td>${newRes[x].paid}</td>
                        <td>${newRes[x].remain}</td>
                    </tr>
                
                `;
                }
            }
            tbRecipt += `
                    
                <tr>
                    
                    <td colspan="4">الاجمالي</td>
                    <td>${totalAllPrice}</td>
                    <td>${totalAllPaid}</td>
                    <td>${totalAllRemain}</td>
                </tr>
            
            `;
                
            document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
            document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
            
             
                    
            
            
        

    

        
    
    // clacTotal(i);
    window.print();
    window.location.reload();
}

function printreceipt(id){
    let query = "SELECT * FROM myreserve";
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{  
            
            tbRecipt = '';
            for(let x=0;x<result.length; x++){
                if(result[x].numReserve == id){
                    console.log(result[x])
                    document.querySelector('.reservation').style.display = 'none';
                    document.querySelector('.receipt').style.display = 'block';
                    let myDataReserve = result;
                    console.log(myDataReserve[0].phone)
        
                    document.querySelectorAll('.receiptPhone1')[0].innerHTML = myDataReserve[0].phone;
                    document.querySelectorAll('.receiptPhone1')[1].innerHTML = myDataReserve[0].phone;
        
                    document.querySelectorAll('.receiptAdress1')[0].innerHTML = myDataReserve[0].adress;
                    document.querySelectorAll('.receiptAdress1')[1].innerHTML = myDataReserve[0].adress;
        
                    document.querySelectorAll('.receiptNumReserve1')[0].innerHTML = myDataReserve[0].numReserve;
                    document.querySelectorAll('.receiptNumReserve1')[1].innerHTML = myDataReserve[0].numReserve;
        
        
                    document.querySelectorAll('.receiptNamePers1')[0].innerHTML = myDataReserve[0].nameReserve;
                    document.querySelectorAll('.receiptNamePers1')[1].innerHTML = myDataReserve[0].nameReserve;
            
                    document.querySelectorAll('.receiptDateNow')[0].innerHTML = myDataReserve[0].date;
                    document.querySelectorAll('.receiptDateNow')[1].innerHTML = myDataReserve[0].date;
        
                    document.querySelectorAll('.receiptTimeNow')[0].innerHTML = myDataReserve[0].time;
                    document.querySelectorAll('.receiptTimeNow')[1].innerHTML = myDataReserve[0].time;
                
                    document.querySelectorAll('.receiptRecieve')[0].innerHTML = myDataReserve[0].user;
                    document.querySelectorAll('.receiptRecieve')[1].innerHTML = myDataReserve[0].user;
        
        
                            tbRecipt += `
                                
                            <tr>
                                <td>${myDataReserve[x].barcode}</td>
                                <td>${myDataReserve[x].itemsDress}</td>
                                <td>${myDataReserve[x].itemsOthers}</td>
                                <td>${myDataReserve[x].startReserve}</td>
                                <td>${myDataReserve[x].price}</td>
                                <td>${myDataReserve[x].paid}</td>
                                <td>${myDataReserve[x].remain}</td>
                            </tr>
                        
                        `
                        
                        
                            
                    
                    }
                }
                document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
                document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
        
                clacTotal(id);
            }
            
        })
        window.print();
        window.location.reload();

        
    
    
  
}
// function calcTotalInvoice(){

//     for(let x=0;x<result[result.length-1].length; x++){
//         if(result[result.length-1][x]._id == id){
//             let totalPrice = 0;
//             let totalPaid = 0;
//             let totalRemain = 0;
//             for(let i=0;i<result[result.length-1][x].myReserve.length; i++){
//                 tbRecipt = '';
//                 totalPrice += +result[result.length-1][x].myReserve[i].price;
//                 totalPaid += +result[result.length-1][x].myReserve[i].paid;
//                 totalRemain += +result[result.length-1][x].myReserve[i].remain;
//                 tbRecipt += `
                        
//                         <tr>
//                             <td colspan='4'>الاجمالي</td>
//                             <td>${totalPrice}</td>
//                             <td>${totalPaid}</td>
//                             <td>${totalRemain}</td>
        
                    
//                         </tr>
                    
//                     `
//             }
//             document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
//             document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
//         }
//     }
// }
// function calcTotalInvoice(x){
//     for(let x=0;x<result.length; x++){
//         if(result[x]._id == id){
//             let totalPrice = 0;
//             let totalPaid = 0;
//             let totalRemain = 0;
//             for(let i=0;i<result[x].myReserve.length; i++){
//                 tbRecipt = '';
//                 totalPrice += +result[x].myReserve[i].price;
//                 totalPaid += +result[x].myReserve[i].paid;
//                 totalRemain += +result[x].myReserve[i].remain;
//                 tbRecipt += `
                        
//                         <tr>
//                             <td colspan='4'>الاجمالي</td>
//                             <td>${totalPrice}</td>
//                             <td>${totalPaid}</td>
//                             <td>${totalRemain}</td>
        
                    
//                         </tr>
                    
//                     `
//             }
//             document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
//             document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
//         }
//     }
    
    
// }
function clacTotal(id){
    let query = `SELECT * FROM myreserve WHERE numReserve = '${id}'`;
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{  
            let totalPrice = 0;
            let totalPaid = 0;
            let totalRemain = 0;
            tbRecipt = '';
            for(let x=0;x<result.length; x++){
                if(id == result[x].numReserve){
                    console.log('total')
                        totalPrice += +result[x].price;
                        totalPaid += +result[x].paid;
                        totalRemain += +result[x].remain;
                        
                }
            }
            tbRecipt += `
                    
                    <tr>
                        <td colspan='4'>الاجمالي</td>
                        <td>${totalPrice}</td>
                        <td>${totalPaid}</td>
                        <td>${totalRemain}</td>
    
                
                    </tr>
                
                `
            document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
            document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
        }
    })
    
    
    
}
let invoice = document.querySelector('.invoice');

invoice.addEventListener('click', e =>{
    document.querySelector('.reservation').style.display = 'block';
    invoice.style.display = 'none';
})

document.querySelector('.receipt').addEventListener('click', e =>{
    document.querySelector('.reservation').style.display = 'block';
    document.querySelector('.receipt').style.display = 'none';

})


let inputSearch = document.querySelector('#inputSearch');

let query ;

function searchNumReserve(value){
    let tableSearch ='';

    
    query = `SELECT * FROM myreserve`;
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{    
            for(let i = 0; i < result.length; i++){
                if(value == result[i].numReserve){
        // console.log(value)

        
                    console.log(result[i])

                        let myData = result[i];
                        tableSearch += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${myData.date}</td>
                            <td>${myData.user}</td>
                            <td><mark>${myData.numReserve}</mark></td>
                            <td>${myData.nameReserve}</td>
                            <td>${myData.startReserve}</td>
                            <td>${myData.barcode}</td>
                            <td>${myData.itemsDress}</td>
                            <td>${myData.price}</td>
                            <td>${myData.paid}</td>
                            <td>${myData.remain}</td>
                            <td><button onclick="printreceipt('${result[i].numReserve}');">ايصال نقدية</button></td>
        
                        </tr>
                        `
                }else if(value == result[i].nameReserve){
                    let myData = result[i];
        
                    tableSearch += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${myData.date}</td>
                        <td>${myData.user}</td>
                        <td>${myData.numReserve}</td>
                        <td><mark>${myData.nameReserve}</mark></td>
                        <td>${myData.startReserve}</td>
                        <td>${myData.barcode}</td>
                        <td>${myData.itemsDress}</td>
                        <td>${myData.price}</td>
                        <td>${myData.paid}</td>
                        <td>${myData.remain}</td>
                        <td><button onclick="printreceipt('${result.id}');">ايصال نقدية</button></td>
    
                    </tr>
                    `
                }else if(value == result[i].barcode){
                    let myData = result[i];
    
                    tableSearch += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${myData.date}</td>
    
                        <td>${myData.user}</td>
                        <td>${myData.numReserve}</td>
                        <td>${myData.nameReserve}</td>
                        <td>${myData.startReserve}</td>
                        <td><mark>${myData.barcode}</mark></td>
                        <td>${myData.itemsDress}</td>
                        <td>${myData.price}</td>
                        <td>${myData.paid}</td>
                        <td>${myData.remain}</td>
                        <td><button onclick="printreceipt('${result[i].numReserve}');">ايصال نقدية</button></td>
    
                    </tr>
                    `
                }
            }
            document.querySelector('.tbodysearch').innerHTML = tableSearch;
        }

    })
            
}
let n = "01152369494";
let mabro = "01015992005"
function searchDateReserve(value){
    let tableSearchNum='';
    
    let query = `SELECT * FROM myreserve`;
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{    
            for(let i = 0; i < result.length; i++){
                let myData = result[i];
                
                if(value == myData.startReserve) {
                    console.log(value)

                    tableSearchNum += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${myData.date}</td>
                        <td>${myData.user}</td>
                        <td>${myData.numReserve}</td>
                        <td>${myData.nameReserve}</td>
                        <td><mark>${myData.startReserve}</mark></td>
                        <td>${myData.barcode}</td>
                        <td>${myData.itemsDress}</td>
                        <td>${myData.price}</td>
                        <td>${myData.paid}</td>
                        <td>${myData.remain}</td>
                        <td><button onclick="printreceipt('${myData.numReserve}');">ايصال نقدية</button></td>

                    
                    </tr>
                `
                }
            }
            document.querySelector('.tbodysearch').innerHTML = tableSearchNum;

        }
    })
   
}

// function searchDateReserve(value){
//     let tableSearchNum='';
//     // console.log("result[i]")

//     query = `SELECT * FROM myreserve`;
//     con.query(query,function(err,result){
        
//         if(err){console.log(err)}
//         else{ 
//             for(let i=0; i<result.length; i++) {
//                 console.log(result[i])
//                 if(value == result[i].startReserve){
//                     tableSearchNum = '';
//                     tableSearchNum += `
//                     <tr>
//                         <td>${result[i].date}</td>
//                         <td>${result[i].user}</td>
//                         <td>${result[i].numReserve}</td>
//                         <td>${result[i].nameReserve}</td>
//                         <td>${result[i].startReserve}</td>
//                         <td><button onclick="showDetails('${result[i].id}');">عرض</button></td>
//                         <td><button onclick="printreceipt('${result[i].id}');">ايصال نقدية</button></td>
//                         <td><button onclick="addInReserveOld('${result[i].id}');">اضافة</button></td>
//                         <td><button onclick="settlement('${result[i].id}');">تصفيه</button></td>
//                         <td><button onclick="deletReserve('${result[i].id}');">حذف</button></td>                    
//                     </tr>
//                     `
//                 }
//             }
//             document.querySelector('.tbodysearch').innerHTML = tableSearchNum;
//         }
//     })

// }

let btnSearDe = document.querySelector('#btnSearDe');
function showSearch2(value){
    // let tableSearch ='';
    console.log(value)
    tableReserve = "";
    
    query = `SELECT * FROM myreserve`;
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{    
            for(let i = 0; i < result.length; i++){
                if(value == result[i].numReserve){
        // console.log(value)

        
                    console.log(result[i])

                        let myData = result[i];
                        tableSearch += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${myData.date}</td>
                            <td>${myData.user}</td>
                            <td><mark>${myData.numReserve}</mark></td>
                            <td>${myData.nameReserve}</td>
                            <td>${myData.startReserve}</td>
                            <td>${myData.barcode}</td>
                            <td>${myData.itemsDress}</td>
                            <td>${myData.price}</td>
                            <td>${myData.paid}</td>
                            <td>${myData.remain}</td>
                            <td><button onclick="printreceipt('${result[i].id}');">ايصال نقدية</button></td>
        
                        </tr>
                        `
                }else if(value == result[i].nameReserve){
                    let myData = result[i];
        
                    tableSearch += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${myData.date}</td>
                        <td>${myData.user}</td>
                        <td>${myData.numReserve}</td>
                        <td><mark>${myData.nameReserve}</mark></td>
                        <td>${myData.startReserve}</td>
                        <td>${myData.barcode}</td>
                        <td>${myData.itemsDress}</td>
                        <td>${myData.price}</td>
                        <td>${myData.paid}</td>
                        <td>${myData.remain}</td>
                        <td><button onclick="printreceipt('${result.id}');">ايصال نقدية</button></td>
    
                    </tr>
                    `
                }else if(value == result[i].barcode){
                    let myData = result[i];
    
                    tableSearch += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${myData.date}</td>
    
                        <td>${myData.user}</td>
                        <td>${myData.numReserve}</td>
                        <td>${myData.nameReserve}</td>
                        <td>${myData.startReserve}</td>
                        <td><mark>${myData.barcode}</mark></td>
                        <td>${myData.itemsDress}</td>
                        <td>${myData.price}</td>
                        <td>${myData.paid}</td>
                        <td>${myData.remain}</td>
                        <td><button onclick="printreceipt('${result[i].id}');">ايصال نقدية</button></td>
    
                    </tr>
                    `
                }
            }
            document.querySelector('.tbodyReserve').innerHTML = tableSearch;
        }

    })
    
    



}



function printInvoiceEmpty() {
    document.querySelector('.reservation').style.display = 'none';
    document.querySelector('.invoice').style.display = 'block';
    
    window.print();
}




function printSearch(){
    document.querySelector('aside').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('#search').style.display = 'none';
    document.querySelector('.content').style.width = '100%';


    
window.print();
}

function refresh() {
    window.location.reload()
}

