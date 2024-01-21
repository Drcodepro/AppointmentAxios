///  when the page relode so all the previous user data will rendered on the screen

window.addEventListener('DOMContentLoaded', (event) => {
    getRequest()
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                showuserOnScreen(response.data[i], response.data[i]._id)
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

   ///  post request
    postRequest(obj)
    .then(response => { showuserOnScreen(obj, response.data._id) })
    .catch(error => console.log(error));

    document.getElementById('username').value ="";
    document.getElementById('email').value ="";
    document.getElementById('phoneNumber').value ="";
})



/// function that render the all the user details on the screen 

function showuserOnScreen(obj, userId) {
    const li = document.createElement('li');
    const dltBtn = document.createElement('button');
    dltBtn.innerText = "delete";
    dltBtn.setAttribute('id', userId);

    const editBtn = document.createElement("button");
    editBtn.innerText = 'edit';
    editBtn.setAttribute('id', userId);

    // list item created that contains user details
    li.innerHTML = `${obj.username} -- ${obj.email} -- ${obj.phoneNumber}`
    li.append(dltBtn)
    li.append(editBtn);
    const userlist = document.getElementById('userShow');
    userlist.append(li);


    // edit button  event listner
    editBtn.addEventListener('click', (event) => {
        editeUser(userId);
    })


    // delete button event listner 
    dltBtn.addEventListener('click', (event) => {
        // Call the delete function with the user ID
        deletRequest(userId)
    });
}


function editeUser(userId) {
    getRequest(userId)
        .then((response) => {
            document.getElementById('username').value = response.data.username;
            document.getElementById('email').value = response.data.email;
            document.getElementById('phoneNumber').value = response.data.phoneNumber;
        })
        .catch(error => console.log(error))

    deletRequest(userId)

}




/// Axios requests 

function deletRequest(userId) {
    axios.delete(`https://crudcrud.com/api/740ceeefa0304d3a9fd3a83e71f39973/BookingAppointment/${userId}`)
        .then(response => {
            const userToRemove = document.getElementById(userId);
            if (userToRemove) {
                userToRemove.parentNode.remove();
            }
        })
        .catch(error => console.log(error))
}


function getRequest(userId) {
    if (userId) {
        return axios.get(`https://crudcrud.com/api/740ceeefa0304d3a9fd3a83e71f39973/BookingAppointment/${userId}`)
    }
    return axios.get("https://crudcrud.com/api/740ceeefa0304d3a9fd3a83e71f39973/BookingAppointment")

}

function postRequest(obj) {
    return axios.post("https://crudcrud.com/api/740ceeefa0304d3a9fd3a83e71f39973/BookingAppointment", obj)
}
