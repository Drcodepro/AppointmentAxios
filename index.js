

const form = document.getElementById('userDetailsForm');

form.addEventListener('submit',(event)=>{
event.preventDefault();

var username = document.getElementById('username').value;
var email = document.getElementById('email').value;
var phoneNumber = document.getElementById('phoneNumber').value;

const obj={
        username,
        email,
        phoneNumber
}

axios.post("https://crudcrud.com/api/abdaca1192054a9c991977894f06d08f/BookingAppointment",obj)
.then(response => console.log(response))
.catch(error => console.log(error));

showuserOnScreen(obj);
})

const userlist = document.getElementById('userShow');

function showuserOnScreen(obj){
    const li = document.createElement('li');
    const dltBtn = document.createElement('button');
    dltBtn.innerText="delete";
     
    li.innerHTML=`${obj.username} -- ${obj.email} -- ${obj.phoneNumber}`
    li.append(dltBtn)

    userlist.append(li);
}



