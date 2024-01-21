


window.addEventListener('DOMContentLoaded',(event)=>{
    axios.get("https://crudcrud.com/api/3f4210f7265e4b6bb5c86a3348c859b1/BookingAppointment")
        .then(response => {
            for(let i = 0;i<response.data.length;i++){
                showuserOnScreen(response.data[i],response.data[i]._id)
            }
        })
        .catch(error => console.log(error));
})

const form = document.getElementById('userDetailsForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;

    const obj = {
        username,
        email,
        phoneNumber
    }

   
    axios.post("https://crudcrud.com/api/3f4210f7265e4b6bb5c86a3348c859b1/BookingAppointment", obj)
        .then(response => {showuserOnScreen(obj,response.data._id)})
        .catch(error => console.log(error));
  
})



const userlist = document.getElementById('userShow');

function showuserOnScreen(obj,userId) {
    const li = document.createElement('li');
    const dltBtn = document.createElement('button');
    dltBtn.innerText = "delete";
    dltBtn.setAttribute('id',userId);

    dltBtn.addEventListener('click', (event) => {
        // Call the delete function with the user ID
        deleteUser(userId);

    });
    
    li.innerHTML = `${obj.username} -- ${obj.email} -- ${obj.phoneNumber}`
    li.append(dltBtn)

    userlist.append(li);
}




function deleteUser(userId){
        axios.delete(`https://crudcrud.com/api/3f4210f7265e4b6bb5c86a3348c859b1/BookingAppointment/${userId}`)
        .then(response => {
            const userToRemove = document.getElementById(userId);
            if (userToRemove) {
                userToRemove.parentNode.remove();
            }
        })
}


