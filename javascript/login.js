//sideMenu
const sideMenu = document.getElementById("sidemenu");
        function openmenu(){
            sideMenu.style.right = "0";
        }
        function closemenu(){
            sideMenu.style.right = "-200px";
        }

       
document.addEventListener("DOMContentLoaded", function(){

//******************login validation**************************

const loginform = document.getElementById("loginform");
const email = document.getElementById("email");
const password = document.getElementById("password");

// clear validation messages when typing starts
email.addEventListener("input", clearMessage);
password.addEventListener("input", clearMessage);

loginform.addEventListener("submit", (e) => {
    e.preventDefault();
    const check = checkLogin();
    if(! check){
        return
    }

    const users = JSON.parse(localStorage.getItem('userDetails'))


    function findUserByEmail(email) {
        return users.find(user => user.email === email);
    }


    const existingUser = users.find(user => user.email == email.value.trim())

    
    // try {
    //     // const response = await fetch()
    // } catch (error) {
        
    // }



});

function checkLogin(){
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue === ""){
        setErrorFor(email, "email is required");
        return false;
    }else if(!realEmail(emailValue)){
        setErrorFor(email, "email is not real");
        return false;
    }
    else{
        setSuccessFor(email);
    }

    if(passwordValue === ""){
        setErrorFor(password, "password is required");
        return false;
    }else if(!realPassword(passwordValue)){
        setErrorFor(password, "has 8-characters and digit-upper-lowercase-specialCharacter");
        return false;
    }
    else{
        setSuccessFor(password);
        return true;
    }

    
}

function setErrorFor(input, message){
    const loginControl = input.parentElement;
    const small = loginControl.querySelector("small");

    small.innerText = message;

    loginControl.className = "loginfield error";

}

function clearMessage() {
    const loginControl = this.parentElement;
    loginControl.classList.remove("error");
    loginControl.classList.remove("success");
    const small = loginControl.querySelector("small");
    small.innerText = "";
}

function realEmail(email){
    return /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/.test(email);
}

function setSuccessFor(input){
    const loginControl = input.parentElement;
    loginControl.className = "loginfield success";
}

function realPassword(password){
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
        return true;
    } else {
        return false;
    }
}

});
        