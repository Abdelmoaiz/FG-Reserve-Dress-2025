const {ipcRenderer}=   require('electron')
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database:"Database_Center_Engy_2025"
});

let date = new Date();
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
let dateNow;
if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() >= 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 >= 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}
userName.innerHTML = localStorage.getItem('userNameView');

let fromDate = document.querySelector('#fromDate');
let toDate = document.querySelector('#toDate');
let searchReports = document.querySelector('#searchReports');
dateAndTime.innerHTML = fromDate.value = toDate.value = dateNow;

function changDate(){
    toDate.value = fromDate.value
}

function homePage(){
    window.location.href = "../home/home.html";
}

let tableExp = document.querySelector('.tableExpenses');
let tableExpOthers = document.querySelector('.tableExpensesOthers');
let tableImports = document.querySelector('.tableImports');

let tableTotalReports = document.querySelector('.tableTotalReports');

function showAllReports(){
    tableExp.style.display = 'block';
    tableImports.style.display = 'block';
    
    tableTotalReports.style.display = 'block';

}

function showReportsExpenses(){
    tableExp.style.display = 'block';
    tableImports.style.display = 'none';
    
    tableTotalReports.style.display = 'none';

}


function showReportsImports(){
    tableExp.style.display = 'none';
    tableImports.style.display = 'block';
    tableTotalReports.style.display = 'none';

}



function showTotalAllReports(){
    tableExp.style.display = 'none';
    tableImports.style.display = 'none';
    tableExpOthers.style.display = 'none';
    
    tableTotalReports.style.display = 'block';

}
function returnback(){
    window.location.href = '../accountClients/index.html'
}


let totalReserve = 0;
let dateReserve;
let totalExpenses = 0;
let totalExpensesOthers = 0;

let tableExpen;
let tableExpenOthers;
let tableSala;



let trTableRports =  document.querySelectorAll('.trTableRports');
let tableRports2;
let resultTotal = 0;
let resultPaid = 0;
let resultRemain = 0;



let newTableTotal;


let expenses;
if(localStorage.myExpenses != null){
    expenses = JSON.parse(localStorage.myExpenses)
}else{
    expenses = []
}


let expensesOthers;
if(localStorage.myExpensesOthers != null){
    expensesOthers = JSON.parse(localStorage.myExpensesOthers)
}else{
    expensesOthers = []
}



function getDateNow(){
    toDate.value = fromDate.value;

}
getDateNow();




let allHistory  = [];
if(localStorage.allHistory != null){
    allHistory = JSON.parse(localStorage.allHistory);
}else{
    allHistory = []
}
let reserve  = [];
if(localStorage.myReserve != null){
    reserve = JSON.parse(localStorage.myReserve);
}else{
    reserve = []
}

setTimeout(() => {
    getReserve();
    getHistory();
    getExpenses();
    searchReport();
}, 1);

function getReserve() {
    ipcRenderer.send('get-reserve', 'bing')
    ipcRenderer.on('get-reserve',(e,args)=>{
        const myReserve = JSON.parse(args)
        
        localStorage.setItem("myReserve", JSON.stringify(JSON.parse(args)))
    })
}
function getHistory() {
    ipcRenderer.send('get-history', 'bing')
    ipcRenderer.on('get-history',(e,args)=>{
        const myReserve = JSON.parse(args)
        
        localStorage.setItem("allHistory", JSON.stringify(JSON.parse(args)))
    })
}


getHistory();





// get expenses
function getExpenses() {
    ipcRenderer.send('get-expenses', 'bing')
    ipcRenderer.on('get-expenses',(e,args)=>{
        const myExpenses = JSON.parse(args)
        localStorage.setItem("myExpenses", JSON.stringify(JSON.parse(args)))

        // expenses.push(myExpenses)

    })
}
getExpenses();

// get expensesOthers
function getExpensesOthers() {
    ipcRenderer.send('get-expensesOthers', 'bing')
    ipcRenderer.on('get-expensesOthers',(e,args)=>{
        const myExpensesOthers = JSON.parse(args)
        localStorage.setItem("myExpensesOthers", JSON.stringify(JSON.parse(args)))

        // expenses.push(myExpenses)

    })
}
getExpensesOthers();





function searchReport() {
    let tableRports2 ='';
   
   
    let query = `SELECT * FROM myreserve`;
    con.query(query,function(err,result){
        
        if(err){console.log(err)}
        else{    
            for(let i = 0; i < result.length; i++){
                if(fromDate.value <= result[i].date && toDate.value >= result[i].date){
                    console.log(result[i])
                    dateReserve = fromDate.value;
                    resultTotal += +result[i].price;
                    resultPaid += +result[i].paid;
                    resultRemain = +resultTotal - +resultPaid;

                    totalReserve = resultPaid;
                    tableRports2 +=
                    `
                    <tr class='trTableRports' >
                        <td></td>
                        <td>${result[i].date}</td>
                        <td>${result[i].numReserve}</td>
                        <td>${result[i].nameReserve}</td>
                        <td>${result[i].barcode}</td>
                        <td>حجز ${result[i].itemsDress + ' - ' + result[i].itemsOthers}</td>
                        <td>${+result[i].paid}</td>
                    </tr>
                    `    
                }else{

                }
            

        
                
            }
            document.querySelector('.tbodyReports2').innerHTML = tableRports2;
                
            
        }
    })

    

    // tableRports2 += `
    // <tr style='border:2px solid'>
    //     <th colspan='6' >الاجمالي</th>              
    //     <th >${resultPaid}</th>
    // </tr>
    // `
    // document.querySelector('.tbodyReports2').innerHTML = tableRports2;
    // tableRports2 = '';

    resultTotal = 
    resultRemain = 0;
    
    // tableRports2 ='';

    
   
    for(let i=0; i<allHistory.length; i++){
        for(let x=0; x< allHistory[i].myReserve.length;x++){
            if(fromDate.value <= allHistory[i].myReserve[x].date && toDate.value >= allHistory[i].myReserve[x].date){
                dateReserve = fromDate.value;
                resultTotal += +allHistory[i].myReserve[x].price;
                resultPaid += +allHistory[i].myReserve[x].paid;
                resultRemain = +resultTotal - +resultPaid;

                totalReserve = resultPaid;
                tableRports2 +=
                `
                <tr class='trTableRports' >
                    <td></td>
                    <td>${allHistory[i].myReserve[x].date}</td>
                    <td>${allHistory[i].myReserve[x].user}</td>
                    <td>${allHistory[i].myReserve[x].nameReserve}</td>
                    <td>${allHistory[i].myReserve[x].numReserve}</td>
                    <td>حجز ${allHistory[i].myReserve[x].itemsDress + ' - ' + allHistory[i].myReserve[x].itemsOthers}</td>
                    <td>${+allHistory[i].myReserve[x].paid}</td>
                </tr>
                `    
            }else{

            }
            

        }
                

            
        
    }

    

    tableRports2 += `
    <tr style='border:2px solid'>
        <th colspan='6' >الاجمالي</th>              
        <th >${resultPaid}</th>
    </tr>
    `
    document.querySelector('.tbodyReports2').innerHTML = tableRports2;
    // tableRports2 = '';

    
    tableRports2 ='';

    
 
   
    let totalExpen = 0;
    ipcRenderer.send('get-expenses', 'bing')
        ipcRenderer.on('get-expenses',(e,args)=>{
            const myExpenses = JSON.parse(args)
            tableExpen ='';
            resultTotal = 
            resultPaid = 
            resultRemain = 0;
    
            expenses.push(myExpenses)
            for(let i = 0; i < expenses[expenses.length-1].length; i++){
                if(fromDate.value <= expenses[expenses.length-1][i].myExpenses.expensesDate && toDate.value >= expenses[expenses.length-1][i].myExpenses.expensesDate){
                    totalExpen += +expenses[expenses.length-1][i].myExpenses.price;
                    totalExpenses = totalExpen
                    tableExpen += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${expenses[expenses.length-1][i].myExpenses.expensesDate}</td>
                            <td>${expenses[expenses.length-1][i].myExpenses.user}</td>
                            <td>${expenses[expenses.length-1][i].myExpenses.expensesType}</td>
                            <td>${expenses[expenses.length-1][i].myExpenses.price}</td>
                        </tr>
                    `
                }else{

                    // tableExpen = '';

                }
                
                
            }
        
            tableExpen += `
                        <tr>
                            <td colspan='4'>الاجمالي</td>
                            <td>${totalExpen}</td>
                        </tr>
                    `
            document.querySelector('.tbodyReportsExpen').innerHTML = tableExpen;
            // totalExpen = 0;


        })
    
    tableExpenOthers ='';
    let totalExpenOthers = 0;
    for(let i = 0; i < expensesOthers.length; i++){
        if(fromDate.value <= expensesOthers[i].myExpensesOthers.expensesDate && toDate.value >= expensesOthers[i].myExpensesOthers.expensesDate){
            totalExpenOthers += +expensesOthers[i].myExpensesOthers.price;
            totalExpensesOthers = totalExpenOthers
            tableExpenOthers += `
                <tr>
                    <td>${i+1}</td>
                    <td>${expensesOthers[i].myExpensesOthers.expensesDate}</td>
                    <td>${expensesOthers[i].myExpensesOthers.user}</td>
                    <td>${expensesOthers[i].myExpensesOthers.expensesType}</td>
                    <td>${expensesOthers[i].myExpensesOthers.price}</td>
                </tr>
            `
        }else{

            tableExpenOthers = '';

        }
        
        
    }
    tableExpenOthers += `
                <tr>
                    <td colspan='4'>الاجمالي</td>
                    <td>${totalExpenOthers}</td>
                </tr>
            `
    document.querySelector('.tbodyReportsExpenOthers').innerHTML = tableExpenOthers;

           
    showTotalReserve();
}

let tableTotal;
function showTotalReserve(){
    console.log(totalExpenses)
    tableTotal = '';
    totalReserve =0;
    let query = `SELECT * FROM myreserve`;
    con.query(query,function(err,result){
        if(err){console.log(err)}
        else{    
            for(let i = 0; i < result.length; i++){
                if(fromDate.value <= result[i].date && toDate.value >= result[i].date){


                    let totalAllExport =0;
                    totalAllExport = +totalExpenses + +totalExpensesOthers;

                    

                    tableTotal += `
                    <tr>
                        <td>${dateReserve}</td>
                        <td> ايرادات</td>
                        <td>-</td>
                        <td class='colorGreen'>${totalReserve}</td>
                    </tr>
                    <tr>
                    <td>${dateReserve}</td>
                    <td>مصرفات</td>
                    <td class='colorRed'>${totalExpenses}</td>
                    <td>-</td>
                    
                    </tr>
                    <tr>
                        <td>${dateReserve}</td>
                        <td>ملاحظات</td>
                        <td class='colorRed'>${totalExpensesOthers}</td>
                        <td>-</td>

                    </tr>
                    
                    
                
                    <tr>
                        <td colspan='2'>الاجمالي</td>
                        
                        <td colspan='2' class='colorTotal'>${+totalReserve - +totalAllExport}</td>
                    </tr>
                    `

                }
            }
            document.querySelector('.tbodyTotalReports').innerHTML = tableTotal;
            // showColorTotal();
            totalReserve =
            totalAllExport =
            totalExpenses = 
            totalExpensesOthers = 0;
            tableTotal = '';
        }
    })

}
// searchReport();

function showColorTotal(){
    if(document.querySelector('.colorTotal').innerHTML < 0){
        document.querySelector('.colorTotal').style.color = 'red';
    }else{
        document.querySelector('.colorTotal').style.color = 'green';

    }
    
}

let fromD = '2023-07-10';
let toD = '2023-07-30';




function printReport(){
    document.querySelector('.inputs').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('aside').style.display = 'none';
    document.querySelector('.content').style.width = '100%';
    document.querySelector('.cancel').style.display = 'block';
    window.print();
}

function refresh(){
    window.location.reload();
}