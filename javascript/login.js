var sideme = document.getElementById("sidemenu");
        function openmenu(){
            sideme.style.right = "0";
        }
        function closemenu(){
            sideme.style.right = "-200px";
        }






const loginform = document.getElementById("loginform");
const email = document.getElementById("email");
const password = document.getElementById("password");

loginform.addEventListener("submit", (e) => {
    e.preventDefault();

    checkLogin();
});

function checkLogin(){
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue === ""){
        setErrorFor(email, "email is blank");
    }else if(!realEmail(emailValue)){
        setErrorFor(email, "email is not valid");
    }else{
        setSuccessFor(email);
    }

    if(passwordValue === ""){
        setErrorFor(password, "password is blank");
    }else if(!realPassword(passwordValue)){
        setErrorFor(password, "password is not strong");
    }else{
        setSuccessFor(password);
    }

    
}

function setErrorFor(input, message){
    const loginControl = input.parentElement;
    const small = loginControl.querySelector("small");

    small.innerText = message;

    loginControl.className = "loginfield error";

}

function realEmail(email){
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = "loginfield success";
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
        