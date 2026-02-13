let username = document.querySelector("#username");
let password = document.querySelector("#password");
let btnSignIn = document.querySelector(".btn-signIn");
const {ipcRenderer}=   require('electron')

let date = new Date();
let infoReg;
let dateEnd;
let dateNow;
let day,month,year,dayEnd;
if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
    year = `${date.getFullYear()}`;
    month = `0${date.getMonth()+1}`;
    day = `0${date.getDate()}`;
    if(date.getDate()+3 < 10){
        dayEnd = `0${date.getDate()+3}`;
        console.log("1")
    }else{
        dayEnd = `${date.getDate()+3}`;
        console.log("2")

    }

}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
    year = `${date.getFullYear()}`;
    month = `0${date.getMonth()+1}`;
    day = `${date.getDate()}`;
    dayEnd = `${date.getDate()+3}`;

}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
    year = `${date.getFullYear()}`;
    month = `${date.getMonth()+1}`;
    day = `0${date.getDate()}`;
    if(date.getDate()+3 < 10){
        dayEnd = `0${date.getDate()+3}`;
        console.log("1")
    }else{
        dayEnd = `${date.getDate()+3}`;
        console.log("2")

    }

}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    year = `${date.getFullYear()}`;
    month = `${date.getMonth()+1}`;
    day = `${date.getDate()}`;
}

let timeNow = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;


let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}

if(localStorage.infoRegist != null){
    infoReg = JSON.parse(localStorage.infoRegist);
}else{
    infoReg = [];
}
let userNameView ;
let job;


let login = [];


function getLogin(){
    if(infoReg != "" && dateNow < infoReg.dateEnd){
       
        document.querySelector(".user").style.display = "block";
        document.querySelector(".registeUser").style.display = "none";
        document.querySelector(".alarm").style.display = "none";
    }else{
       
        console.log("rrr")

    }

}
// getLogin()



function ActiveApp(){
 document.querySelector(".registeUser").style.display = "block";
 document.querySelector(".alarm").style.display = "none";
}

let btnRegiste = document.querySelector(".btn-registe");

let usernameReg = document.querySelector("#usernameReg");
// let emailReg = document.querySelector("#emailReg");
let phoneReg = document.querySelector("#phoneReg");
let passwordReg = document.querySelector("#passwordReg");

let infoRegist = [];
btnRegiste.addEventListener("click",(e)=>{
    e.preventDefault();
    if((usernameReg.value && phoneReg.value && passwordReg.value) != "" ){
        let infoReg = {
            user : usernameReg.value,
            phone : phoneReg.value,
            password : passwordReg.value,
            dateNow : dateNow,
            dateEnd :`${year}-${month}-${dayEnd}`
        }
        
        localStorage.setItem("infoRegist",JSON.stringify(infoReg))
        document.querySelector(".registeUser").style.display = "none";
        setTimeout(() => {
            document.querySelector(".alarm2").style.display = "block";
        }, 1000);
        setTimeout(() => {
            document.querySelector(".alarm2").style.display = "none";
        }, 2000);
        setTimeout(() => {
            document.querySelector(".user").style.display = "block";

        }, 3000);
    }
    refresh();
})

btnSignIn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(dateEnd == dateNow || dateEnd <= dateNow){
        
    }else{
        
        if(username.value == 'عبدالمعز' && password.value == '0164342246'){
            window.location.href = "./Component/home/home.html";
            userNameView = username.value;
            job = 'it';

        }else if(username.value == 'admin' && password.value == '1122'){
            window.location.href = "./Component/home/home.html";
            userNameView = username.value;
            job = 'it';

        }else{
            for(let i=0;i<users.length;i++){

                if(username.value === users[i].user && password.value === users[i].password ){
                    
                    window.location.href = "./Component/home/home.html";
                    userNameView = username.value;
                     
                }
            }
        }
        localStorage.setItem('userNameView',userNameView);
        localStorage.setItem('dateNow',dateNow);
        
        if(localStorage.dateEnd != null){
            dateEnd = localStorage.dateEnd;
        }else{
            localStorage.setItem('dateEnd',`${year}-${month}-${dayEnd}`);
            // dateEnd = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`;;
        }
        let dataSignIn = {"state":"open","username": userNameView,"date" :dateNow,'dateEnd':`${year}-${month}-${dayEnd}`}
        
        ipcRenderer.send('userNameView',dataSignIn)
    
    }
}) 

function refresh(){
    window.location.reload();
}
