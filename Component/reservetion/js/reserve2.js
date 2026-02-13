const {ipcRenderer}=   require('electron')

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

startReserve.addEventListener('change', e =>{
    endReserve.value = startReserve.value;
})


function homePage(){
    window.location.href = "../home/home.html";
}

function showTableAllReservation(){
    
    document.querySelector(".viewTable").style.display = "block";
    document.querySelector('#btnShowInp').style.display = "block";
    document.querySelector(".inputsItems").style.display = "none";
    document.querySelector(".invoiceClient").style.display = "none";
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
    document.querySelector(".viewTable").style.display = "none";
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
let allReserve;
if(localStorage.allReserve != null){
    allReserve = JSON.parse(localStorage.allReserve);
}else{
    allReserve = []
}

function readReserve(){
    if(localStorage.allReserve != null){
        allReserve = JSON.parse(localStorage.allReserve);
    }else{
        allReserve = []
    }
}
let items;
if(localStorage.AllItems != null){
    items = JSON.parse(localStorage.AllItems)
}else{
    items = []
}

let allHistory;
if(localStorage.allHistory != null){
    allHistory = JSON.parse(localStorage.allHistory);
}else{
    allHistory = []
}
function getAllReserve() {
    ipcRenderer.send('get-reserve', 'bing')
    ipcRenderer.on('get-reserve',(e,args)=>{
        const myReserve = JSON.parse(args);
       
        if(myReserve.length != 0){

            localStorage.setItem('allReserve',JSON.stringify(myReserve))
            localStorage.setItem('allReserveOther',JSON.stringify(myReserve))
        }
        // allReserve.push(myReserve);
    })
}
getAllReserve();

function sendDataToDatabase(){
    if(allReserve.length != 0){
        for(let i=0;i<allReserve.length;i++){
            let idReserve = allReserve[i]._id;
            let newRes = allReserve[i].myReserve;
            let data = allReserve[i];
            ipcRenderer.send('myReserveOther',newRes,`${idReserve}`)
            ipcRenderer.send('myReserveRecovery1',newRes,`${idReserve}`)
            ipcRenderer.send('myReserveRecovery2',newRes,`${idReserve}`)
        }
        ipcRenderer.send('myReserveRecoveryToday',allReserve,`${dateNow.value}`)
    }
    if(items.length != 0){
        ipcRenderer.send('myItemsRecoveryToday',items,`${dateNow.value}`)
    }
    if(allHistory.length != 0){
        ipcRenderer.send('myHistoryRecoveryToday',allHistory,`${dateNow.value}`)
    }
}
sendDataToDatabase();

setTimeout(() => {
    
    getAllReserve();
    // readReserve();
    showAllReserve();
    showReserve();

}, 1);

function showItems() {
   


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









userName.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML = dateNow.value;

let idReserve;
function getNumReserve(){
    readReserve();
    if(allReserve != ''){
        if(nameReserve.value != ''){
            for(let i =0;i<allReserve.length;i++){
                if(numReserve.value == allReserve[i].myReserve[0].numReserve ) {
                    numReserve.value =   +allReserve[i]._id + 1;
                    idReserve = +allReserve[i]._id + 1;
                    // console.log('1')
                    // console.log(numReserve)
                    // console.log(idReserve)
                }else{
                    numReserve.value =  +allReserve[i]._id + 1;

                    // numReserve.value = 1000 + +allReserve[allReserve.length-1].length+1  ;     
                    idReserve = +allReserve[i]._id + 1;
                    // console.log('2')
                    // console.log(numReserve)
                    // console.log(idReserve)

                }
            }
        }else{
            // numReserve.value = '';
            // console.log('3')

        }
    }else{
        numReserve.value = 1000 + 1;
        idReserve = 1000+1;
        // console.log('4')
        // console.log(numReserve)
        // console.log(idReserve)


    }
    
}

let showMessage = document.querySelector('.showMessage');
    // showMessage.style.display = 'block';

function checkReserve(){ 
    // showMessage.style.display = 'block';
    barcode.style.backgroundColor = "none";

    if(mood === 'create' || mood === 'add' || mood === "update"){
        // showMessage.style.display = 'block';

        if(allReserve != ''){
            for(let i =0;i<allReserve.length;i++){
                for(let x =0;x<allReserve[i].myReserve.length;x++){
                    if(allReserve[i].myReserve[x].startReserve == startReserve.value && allReserve[i].myReserve[x].barcode == barcode.value) {
                        console.log("1")

                        
                        document.querySelector('.nameItems').innerHTML = allReserve[i].myReserve[x].barcode;
                        itemsDress.value = "هذا الصنف محجوز";
                        barcode.value = "";
                        showMessage.style.display = 'block';
                    // console.log('1')
                        // document.querySelector('#reserveAdd').style.display = 'none';
                        break;         
                    }else{
                        console.log("2")
                        for(let i=0;i<items.length;i++){   
                            // console.log(items)

                            if(barcode.value == items[i].myItems.barcode) {
                                itemsDress.value = items[i].myItems.title;
                                // totalPrice.value = items[items.length-1][i].myItems.priceNight;
                                // console.log('2')

                            } 
                        }     
                    }
                }
            }
        }else{
            console.log("3")

            for(let i=0;i<items.length;i++){   
                if(barcode.value == items[i].myItems.barcode) {
                    itemsDress.value = items[i].myItems.title;
                    totalPrice.value = items[i].myItems.priceNight;
                } 
            }  
        }
        
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
    document.querySelector('#btnShowInp').style.display = 'none';
    document.querySelector('.viewTable').style.display = 'none';
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

        }else if(mood === 'add'){
            let myReserve = [];

            for(let i =0;i<allReserve.length;i++){
    
                if(allReserve[i]._id == tmp){
                    myReserve = allReserve[i].myReserve
                    myReserve.push(newReserve);
                    ipcRenderer.send('update-reserve', {myReserve, tmp})
    
                    window.location.reload();
                }
                
            }
            
            
        
            
        }else if(mood === 'update'){
            let myReserve = [];
            if(allReserve[tmpOther2]._id == tmp){
                for(let i =0;i<allReserve[tmpOther2].myReserve.length;i++){
                    myReserve = allReserve[tmpOther2].myReserve
    
                }
                myReserve[tmpOther] = {
                    user: userName.innerHTML,
                    date: allReserve[tmpOther2].myReserve[0].date,
                    time:allReserve[tmpOther2].myReserve[0].time,
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
                // console.log(myReserve[tmpOther])
                // console.log(newReserve)
                localStorage.setItem('allReserve',JSON.stringify(allReserve))
                localStorage.setItem('allReserveOther',JSON.stringify(allReserve))

                ipcRenderer.send('update-reserve', {myReserve, tmp})
                
    
                window.location.reload();
                
    
            }    
        
        

        }else if( mood === 'settle') {
            let myReserve = [];
            // console.log("tmp")

            for(let i =0;i<allReserve.length;i++){
                // console.log(tmp)
                // console.log(myReserve)
                // console.log(allReserve[i].myReserve)
                if(allReserve[i]._id == tmp){
                    // console.log(myReserve)
                    // console.log(allReserve[i].myReserve)
                    myReserve = allReserve[i].myReserve
                    myReserve.push(newReserve);
                    // console.log(myReserve)
                    // console.log(allReserve[i].myReserve)
                    allReserve.splice(i,1);
                    localStorage.setItem('allReserve',JSON.stringify(allReserve))
                    ipcRenderer.send('update-reserve', {myReserve, tmp})
                    ipcRenderer.send('myHistory',myReserve,`${tmp}`)
                    ipcRenderer.send('delete-reserve',tmp)

                    printreceipt(tmp)
                    window.location.reload();
                    
                }     
            }
            
            
        }
    }
        
        // showAllReserve();
        // showReserve();
    barcode.value =
    itemsDress.value =
    itemsOthers.value =
    totalPrice.value =
    pricePaid.value =
    priceRemaining.value = '';


})
let tableReserve= '';


function settlementAuto(){
    console.log(dateNow.value)
    if(allReserve.length != 0 ){

        for(let i=0;i<allReserve.length; i++){
            if(allReserve[i].length != 0 ){

                for(let x=0; x<allReserve[i].myReserve.length; x++) {
                    let myData = allReserve[i].myReserve[x];
                    if(myData.startReserve < dateNow.value) {
                        let tmp = allReserve[i]._id;
                    //     console.log(myData.startReserve)
                    let myReserve = allReserve[i].myReserve
                        // myReserve.push(newReserve);
                        // console.log(myReserve)
                        // console.log(allReserve[i].myReserve)
                        allReserve.splice(i,1);
                        localStorage.setItem('allReserve',JSON.stringify(allReserve))
                        // ipcRenderer.send('update-reserve', {myReserve, tmp})
                        ipcRenderer.send('myHistory',myReserve,`${tmp}`);
                        ipcRenderer.send('delete-reserve',tmp)
                    }
                }
            }
        }
    }
    
}
// settlementAuto();


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
    if(newRes != ""){
        e.preventDefault();
        ipcRenderer.send('myReserve',newRes,`${idReserve}`)
        document.querySelector('.viewTable').style.display = 'block';
        document.querySelector('.invoiceClient').style.display = 'none';
        getAllReserve();
        // readReserve();
        // showAllReserve();
        // showReserve();
        printInvoice(tmpPrintInvoice);
        window.location.reload();
    }else{
        window.location.reload();

    }
    
    

})

function addInReserveOld(id){
    console.log(id)
    reserveAdd.style.display = 'block';
    document.querySelector('#btnShowInp').style.display = "none";
    for(let i=0;i<allReserve.length; i++){
        console.log(allReserve[i].myReserve)
        if(allReserve[i]._id == id){
           
            let myDataReserve = allReserve[i].myReserve;
            numReserve.value = myDataReserve[0].numReserve;
            nameReserve.value = myDataReserve[0].nameReserve;
            phone.value = allReserve[i].myReserve[0].phone;
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
    reserveAdd.style.display = 'block';
    document.querySelector('.infoItems').style.display = 'none';
    document.querySelector('.infoPersonal').style.display = 'none';
    document.querySelector('#btnShowInp').style.display = "none";
    document.querySelector('#totalPrice').style.display = "none";
    document.querySelector('#totalPr').style.display = "block";
    console.log(id)

    let result = 0;
    for(let i=0;i<allReserve.length; i++){
        if(allReserve[i]._id == id){
            let myDataReserve = allReserve[i].myReserve;

            nameReserve.value = myDataReserve[0].nameReserve;
            numReserve.value = myDataReserve[0].numReserve;
            for(let x=0;x<myDataReserve.length; x++){
                result += +myDataReserve[x].remain;
                myDataReserve[x].state = 'close';
            }
            barcode.value = 'تصفيه';
            itemsDress.value = 'تصفيه';

            totalPr.value = +result;
           
        }
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
let inpuCheckPass = document.querySelector('#passCheck');

let checkTmpRese;
let tmpMoodReserve;


function updateReserve(i,x,id) {
    reserveAdd.style.display = 'block';

    tmp = id;
    tmpOther = i;
    tmpOther2 = x;
    mood = 'update';
    create.innerHTML = 'تحديث';
    


    if(allReserve[x]._id == id){
        let myDataReserve = allReserve[x].myReserve;
        startReserve.value = myDataReserve[i].startReserve;
        nameReserve.value = myDataReserve[i].nameReserve;
        numReserve.value = myDataReserve[i].numReserve;
        barcode.value = myDataReserve[i].barcode;
        itemsDress.value = myDataReserve[i].itemsDress;
        itemsOthers.value = myDataReserve[i].itemsOthers;
        numPersonal.value = myDataReserve[i].numPersonal;
        phone.value = myDataReserve[i].phone;
        adress.value = myDataReserve[i].adress;
        totalPrice.value = myDataReserve[i].price;
        pricePaid.value = myDataReserve[i].paid;
        priceRemaining.value = myDataReserve[i].remain;
        nameReserve.focus();
        scroll({
            top:0,
            behavior: "smooth",
        })
    }
    
    
}
let tmpIdDelete1,tmpIdDeleteX;
function deletReserve(id,x) {
    document.querySelector('.alarm1').style.display = 'block';
    tmpIdDelete1 = id;
    tmpIdDeleteX = x;
    document.querySelector('#passDelete').focus();
}

function checkPass1(){
    if(document.querySelector('#passDelete').value == '100'){
        allReserve.splice(tmpIdDeleteX,1)
        localStorage.setItem('allReserve',JSON.stringify(allReserve))
        ipcRenderer.send('delete-reserve',tmpIdDelete1)
        showReserve();
    }else{
        document.querySelector('#passDelete').value = '';
    }
    getAllReserve();

    window.location.reload();

}

function exitePass(){
    window.location.reload();
}
function exitePass2(){
    showMessage.style.display = "none";
    barcode.value = "";
    itemsDress.value = "";
}


function deletSomeReserve(i,x,id){
    if(document.querySelector('#passDelete').value == '100'){

        let myReserve = [];
        barcode.value = '-'
        let newReserve = {
            user: userName.innerHTML,
            date: '-',
            barcode: '-',
            numReserve: '-',
            nameReserve: '-',
            itemsDress : '-',
            itemsOthers: '-',
            numPersonal : '-',
            startReserve: '-',
            endReserve: '-',
            phone: '-',
            adress: '-',
            price: '0',
            paid: '0',
            remain: '0',
            namRecieve: '-',
            idNameRecieve: '-',
            adressRecieve:'-',
            phoneRecieve: '-',
            state: 'close'                                    
        
        }
        if(allReserve[x]._id == id){
            for(let z =0;z<allReserve[x].myReserve.length;z++){
                myReserve = allReserve[x].myReserve;
                
                tmp = id;

            }
            allReserve[i].splice(x,1);
            localStorage.setItem('allReserve',JSON.stringify(allReserve))

            myReserve.push(newReserve)
            ipcRenderer.send('update-reserve', {myReserve, tmp})
            window.location.reload();
            showAllReserve();
            showReserve();
        }  
    }
   
}
function showAllReserve() {
    // readReserve();

    let tableReserve= '';
    // ipcRenderer.send('get-reserve', 'bing')
    // ipcRenderer.on('get-reserve',(e,args)=>{
    //     const myReserve = JSON.parse(args)
    //     allReserve.push(myReserve)
        // tableReserve = '';


        for(let x=0;x<allReserve.length; x++){
            // if(allReserve[x].myReserve[0].startReserve != '-'){
                // console.log(allReserve[x].myReserve)
                tableReserve += `
                <tr>
                    <td>${allReserve[x].myReserve[0].date}</td>
                    <td>${allReserve[x].myReserve[0].time}</td>
                    <td>${allReserve[x].myReserve[0].numPersonal} - ${allReserve[x].myReserve[0].phone}</td>
                    <td>${allReserve[x].myReserve[0].numReserve}</td>
                    <td>${allReserve[x].myReserve[0].nameReserve}</td>
                    <td>${allReserve[x].myReserve[0].startReserve}</td>
                    
                    <td><button onclick="printreceipt('${allReserve[x]._id}');">ايصال نقدية</button></td>
                    
                </tr>
                `
            // }else{

            // }
                

        }
        
        document.querySelector('.AllReservation').innerHTML = tableReserve;
           
           
           
        

    // })
    
}
// showAllReserve();
// console.log(dateNow.value)
function showReserve() {
    // readReserve();

    let tableReserve= '';
    // ipcRenderer.send('get-reserve', 'bing')
    // ipcRenderer.on('get-reserve',(e,args)=>{
    //     const myReserve = JSON.parse(args)
    //     allReserve.push(myReserve)
        tableReserve = '';
        for(let x=0;x<allReserve.length; x++){
            if(allReserve[x].myReserve[0].startReserve != '-'){
               
                tableReserve += `
                <tr>
                    <td>${x+1}</td>
                    <td>${allReserve[x].myReserve[0].date}</td>
                    <td>${allReserve[x].myReserve[0].time}</td>
                    <td>${allReserve[x].myReserve[0].user}</td>
                    <td>${allReserve[x].myReserve[0].numReserve}</td>
                    <td>${allReserve[x].myReserve[0].nameReserve}</td>
                    <td>${allReserve[x].myReserve[0].startReserve}</td>
                    <td><button onclick="showDetails('${allReserve[x]._id}','${x}');">عرض</button></td>
                    <td><button onclick="printreceipt('${allReserve[x]._id}');">ايصال نقدية</button></td>
                    <td><button onclick="addInReserveOld('${allReserve[x]._id}');">اضافة</button></td>
                    <td><button onclick="settlement('${allReserve[x]._id}');">تصفيه</button></td>
                    <td><button onclick="deletReserve('${allReserve[x]._id}','${x}');">حذف</button></td>                    
                </tr>
                `

            }else{

            }
            
            
            
        }
        document.querySelector('.tbodyReserve').innerHTML = tableReserve;
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
        for(let i=0;i<allReserve[x].myReserve.length; i++){
            if(allReserve[x].myReserve[i].barcode != '-'){
                tableReserve2 += `
                <tr>
                    <td>${i+1}</td>
                    <td>${allReserve[x].myReserve[i].date}</td>
                    <td>${allReserve[x].myReserve[i].time}</td>
                    <td>${allReserve[x].myReserve[i].numReserve}</td>
                    <td>${allReserve[x].myReserve[i].nameReserve}</td>
                    <td>${allReserve[x].myReserve[i].startReserve}</td>
                    <td>${allReserve[x].myReserve[i].numPersonal}</td>
                    <td>${allReserve[x].myReserve[i].phone}</td>
                    <td>${allReserve[x].myReserve[i].barcode}</td>
                    <td>${allReserve[x].myReserve[i].itemsDress}</td>
                    <td>${allReserve[x].myReserve[i].price}</td>
                    <td>${+allReserve[x].myReserve[i].paid }</td>
                    <td>${allReserve[x].myReserve[i].remain}</td>
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
    for(let x=0;x<allReserve.length; x++){
        if(allReserve[x]._id == id){
            let myDataReserve = allReserve[x].myReserve;
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
        <td colspan='10'>الاجمالي</td>
        
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

    // document.querySelectorAll('.nameInvoice')[0].innerHTML = reserve[i].nameReserve;
    // document.querySelectorAll('.nameInvoice')[1].innerHTML = reserve[i].nameReserve;

    // document.querySelectorAll('.recieveInvoice')[0].innerHTML = reserve[i].namRecieve;
    // document.querySelectorAll('.recieveInvoice')[1].innerHTML = reserve[i].namRecieve;

    // document.querySelectorAll('.idInvoice')[0].innerHTML = reserve[i].idNameRecieve;
    // document.querySelectorAll('.idInvoice')[1].innerHTML = reserve[i].idNameRecieve;

    // document.querySelectorAll('.phoneInvoice')[0].innerHTML = reserve[i].phoneRecieve;
    // document.querySelectorAll('.phoneInvoice')[1].innerHTML = reserve[i].phoneRecieve;

    // document.querySelectorAll('.adressInvoice')[0].innerHTML = reserve[i].adressRecieve;
    // document.querySelectorAll('.adressInvoice')[1].innerHTML = reserve[i].adressRecieve;

    // document.querySelectorAll('.itemsRecieve')[0].innerHTML = reserve[i].itemsDress + ' - ' + reserve[i].itemsOthers;
    // document.querySelectorAll('.itemsRecieve')[1].innerHTML = reserve[i].itemsDress;
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

            document.querySelectorAll('.receiptPhone1')[0].innerHTML = myDataReserve.numPersonal;
            document.querySelectorAll('.receiptPhone1')[1].innerHTML = myDataReserve.numPersonal;

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

    for(let x=0;x<allReserve.length; x++){
        if(allReserve[x]._id == id){
            document.querySelector('.reservation').style.display = 'none';
            document.querySelector('.receipt').style.display = 'block';
            let myDataReserve = allReserve[x].myReserve;
            console.log(myDataReserve[0].phone)

            document.querySelectorAll('.receiptPhone1')[0].innerHTML = myDataReserve[0].numPersonal;
            document.querySelectorAll('.receiptPhone1')[1].innerHTML = myDataReserve[0].numPersonal;

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

            tbRecipt = '';

            for(let i=0;i<allReserve[x].myReserve.length; i++){

                if(allReserve[x].myReserve[i].barcode != '-'){
                    tbRecipt += `
                        
                        <tr>
                            <td>${allReserve[x].myReserve[i].barcode}</td>
                            <td>${allReserve[x].myReserve[i].itemsDress}</td>
                            <td>${allReserve[x].myReserve[i].itemsOthers}</td>
                            <td>${allReserve[x].myReserve[i].startReserve}</td>
                            <td>${allReserve[x].myReserve[i].price}</td>
                            <td>${allReserve[x].myReserve[i].paid}</td>
                            <td>${allReserve[x].myReserve[i].remain}</td>
                        </tr>
                    
                    `
                }
                
                    
            
            }
            document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
            document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
        }

    }

        
    
    clacTotal(id);
    window.print();
    window.location.reload();
    
  
}
// function calcTotalInvoice(){

//     for(let x=0;x<allReserve[allReserve.length-1].length; x++){
//         if(allReserve[allReserve.length-1][x]._id == id){
//             let totalPrice = 0;
//             let totalPaid = 0;
//             let totalRemain = 0;
//             for(let i=0;i<allReserve[allReserve.length-1][x].myReserve.length; i++){
//                 tbRecipt = '';
//                 totalPrice += +allReserve[allReserve.length-1][x].myReserve[i].price;
//                 totalPaid += +allReserve[allReserve.length-1][x].myReserve[i].paid;
//                 totalRemain += +allReserve[allReserve.length-1][x].myReserve[i].remain;
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
//     for(let x=0;x<allReserve.length; x++){
//         if(allReserve[x]._id == id){
//             let totalPrice = 0;
//             let totalPaid = 0;
//             let totalRemain = 0;
//             for(let i=0;i<allReserve[x].myReserve.length; i++){
//                 tbRecipt = '';
//                 totalPrice += +allReserve[x].myReserve[i].price;
//                 totalPaid += +allReserve[x].myReserve[i].paid;
//                 totalRemain += +allReserve[x].myReserve[i].remain;
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
    for(let x=0;x<allReserve.length; x++){
        if(allReserve[x]._id == id){
            let totalPrice = 0;
            let totalPaid = 0;
            let totalRemain = 0;
            for(let i=0;i<allReserve[x].myReserve.length; i++){
                tbRecipt = '';
                totalPrice += +allReserve[x].myReserve[i].price;
                totalPaid += +allReserve[x].myReserve[i].paid;
                totalRemain += +allReserve[x].myReserve[i].remain;
                tbRecipt += `
                        
                        <tr>
                            <td colspan='4'>الاجمالي</td>
                            <td>${totalPrice}</td>
                            <td>${totalPaid}</td>
                            <td>${totalRemain}</td>
        
                    
                        </tr>
                    
                    `
            }
            document.querySelectorAll('.tbodyRecip')[0].innerHTML += tbRecipt;
            document.querySelectorAll('.tbodyRecip')[1].innerHTML += tbRecipt;
        }
    }
    
    
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


function searchNumReserve(value){
    let tableSearch ='';
    

    for(let i=0;i<allReserve.length; i++){
        for(let x=0; x<allReserve[i].myReserve.length; x++) {

            if(allReserve[i].myReserve[x].numReserve.includes(value)) {
                let myData = allReserve[i].myReserve[x];
                tableSearch += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData.date}</td>
                    <td>${myData.time}</td>
                    <td><mark>${myData.numReserve}</mark></td>
                    <td>${myData.nameReserve}</td>
                    <td>${myData.startReserve}</td>
                    <td>${myData.barcode}</td>
                    <td>${myData.itemsDress}</td>
                    <td>${myData.price}</td>
                    <td>${myData.paid}</td>
                    <td>${myData.remain}</td>
                    <td><button onclick="printreceipt('${allReserve[i]._id}');">ايصال نقدية</button></td>
                    <td></td>
                    <td></td>
                    <td></td>

                </tr>
                `
            }else if(allReserve[i].myReserve[x].nameReserve.includes(value)){
                let myData = allReserve[i].myReserve[x];

                tableSearch += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData.date}</td>
                    <td>${myData.time}</td>
                    <td>${myData.numReserve}</td>
                    <td><mark>${myData.nameReserve}</mark></td>
                    <td>${myData.startReserve}</td>
                    <td>${myData.barcode}</td>
                    <td>${myData.itemsDress}</td>
                    <td>${myData.price}</td>
                    <td>${myData.paid}</td>
                    <td>${myData.remain}</td>
                    <td><button onclick="printreceipt('${allReserve[i]._id}');">ايصال نقدية</button></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                `
            }else if(allReserve[i].myReserve[x].barcode.includes(value)){
                let myData = allReserve[i].myReserve[x];

                tableSearch += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData.date}</td>
                    <td>${myData.time}</td>
                    <td>${myData.numReserve}</td>
                    <td>${myData.nameReserve}</td>
                    <td>${myData.startReserve}</td>
                    <td><mark>${myData.barcode}</mark></td>
                    <td>${myData.itemsDress}</td>
                    <td>${myData.price}</td>
                    <td>${myData.paid}</td>
                    <td>${myData.remain}</td>
                    <td><button onclick="printreceipt('${allReserve[i]._id}');">ايصال نقدية</button></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                `
            }else{

            }
            
        }
        
    }
    document.querySelector('.tbodysearch').innerHTML = tableSearch;
}

function searchDateReserve(value){
    let tableSearchNum='';
    for(let i=0;i<allReserve.length; i++){
        for(let x=0; x<allReserve[i].myReserve.length; x++) {
            let myData = allReserve[i].myReserve[x];

            if(value == myData.startReserve) {
                

                tableSearchNum += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myData.date}</td>
                    <td>${myData.time}</td>
                    <td>${myData.numReserve}</td>
                    <td>${myData.nameReserve}</td>
                    <td><mark>${myData.startReserve}</mark></td>
                    <td>${myData.barcode}</td>
                    <td>${myData.itemsDress}</td>
                    <td>${myData.price}</td>
                    <td>${myData.paid}</td>
                    <td>${myData.remain}</td>
                    <td><button onclick="printreceipt('${allReserve[i]._id}');">ايصال نقدية</button></td>
                    <td></td>
                    <td></td>
                    <td></td>
                
                </tr>
            `
            }
            
        }
        
    }
    document.querySelector('.tbodysearch').innerHTML = tableSearchNum;
}


let btnSearDe = document.querySelector('#btnSearDe');
function showSearch2(value){
    // let tableSearch ='';
    
    tableReserve = "";
    for(let x=0;x<allReserve.length; x++){
        for(let i=0; i<allReserve[x].myReserve.length; i++) {
            let myData = allReserve[x];

            if(myData.myReserve[i].nameReserve.includes(value)) {

                tableReserve += `
                <tr>
                    <td>${myData.myReserve[i].date}</td>
                    <td>${myData.myReserve[i].time}</td>
                    <td>${myData.myReserve[i].user}</td>
                    <td>${myData.myReserve[i].numReserve}</td>
                    <td>${myData.myReserve[i].nameReserve}</td>
                    <td>${myData.myReserve[i].startReserve}</td>
                    <td><button onclick="showDetails('${myData._id}');">عرض</button></td>
                    <td><button onclick="printreceipt('${myData._id}');">ايصال نقدية</button></td>
                    <td><button onclick="addInReserveOld('${myData._id}');">اضافة</button></td>
                    <td><button onclick="settlement('${myData._id}');">تصفيه</button></td>
                    <td><button onclick="deletReserve('${myData._id}');">حذف</button></td>                    
                </tr>
                `
            }else if(value == myData.myReserve[i].numReserve){
                tableReserve += `
                <tr>
                    <td>${myData.myReserve[i].date}</td>
                    <td>${myData.myReserve[i].time}</td>
                    <td>${myData.myReserve[i].user}</td>
                    <td>${myData.myReserve[i].numReserve}</td>
                    <td>${myData.myReserve[i].nameReserve}</td>
                    <td>${myData.myReserve[i].startReserve}</td>
                    <td><button onclick="showDetails('${myData._id}');">عرض</button></td>
                    <td><button onclick="printreceipt('${myData._id}');">ايصال نقدية</button></td>
                    <td><button onclick="addInReserveOld('${myData._id}');">اضافة</button></td>
                    <td><button onclick="settlement('${myData._id}');">تصفيه</button></td>
                    <td><button onclick="deletReserve('${myData._id}');">حذف</button></td>                    
                </tr>
                `
            }

        }
    }
    document.querySelector('.tbodyReserve').innerHTML = tableReserve;



}

// function searchDateReserve(value){
//     let tableSearchNum='';
//     console.log(value)
//     for(let x=0;x<allReserve[allReserve.length-1].length; x++){
//         for(let i=0; i<allReserve[allReserve.length-1][i].myReserve.length; i++) {
//             let myData = allReserve[allReserve.length-1][x];
//             console.log(value)
//             console.log(myData.myReserve[i].startReserve)

//             if(value == myData.myReserve[i].startReserve){
//                 tableSearchNum = '';
//                 tableSearchNum += `
//                 <tr>
//                     <td>${myData.myReserve[i].date}</td>
//                     <td>${myData.myReserve[i].user}</td>
//                     <td>${myData.myReserve[i].numReserve}</td>
//                     <td>${myData.myReserve[i].nameReserve}</td>
//                     <td>${myData.myReserve[i].startReserve}</td>
//                     <td><button onclick="showDetails('${myData._id}');">عرض</button></td>
//                     <td><button onclick="printreceipt('${myData._id}');">ايصال نقدية</button></td>
//                     <td><button onclick="addInReserveOld('${myData._id}');">اضافة</button></td>
//                     <td><button onclick="settlement('${myData._id}');">تصفيه</button></td>
//                     <td><button onclick="deletReserve('${myData._id}');">حذف</button></td>                    
//                 </tr>
//                 `
//             }
//         }
//     }
//     document.querySelector('.tbodyReserve').innerHTML = tableSearchNum;

// }


function printInvoiceEmpty() {
    document.querySelector('.reservation').style.display = 'none';
    document.querySelector('.invoice1').style.display = 'block';
    
    window.print();
    refresh();
}
function printInvoiceEmpty2() {
    document.querySelector('.reservation').style.display = 'none';
    document.querySelector('.invoice2').style.display = 'block';
    
    window.print();
    refresh();
}
function printInvoiceEmpty3() {
    document.querySelector('.reservation').style.display = 'none';
    document.querySelector('.invoice3').style.display = 'block';
    
    window.print();
    refresh();

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

