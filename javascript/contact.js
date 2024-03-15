var sideme = document.getElementById("sidemenu");
        function openmenu(){
            sideme.style.right = "0";
        }
        function closemenu(){
            sideme.style.right = "-200px";
        }








const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const text = document.getElementById("text");
const subscribecontent = document.getElementById("subscribecontent");
const subscribe = document.getElementById("subscribe");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
});

subscribecontent.addEventListener("submit", (e) => {
    e.preventDefault();

    checkSubscription();
});

function checkInputs(){
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const textValue = text.value.trim();

    if(usernameValue === ""){
        setErrorFor(username, "your name is blank");

    }else if(!setTextError(usernameValue)){
        setErrorFor(username, "not a real name")
    }else if(usernameValue.length < 3){
        setErrorFor(username, "insert full name");
    }else{
        setSuccessFor(username);
    }

    if(emailValue === ""){
        setErrorFor(email, "email is blank");
    }else if(!realEmail(emailValue)){
        setErrorFor(email, "email is not valid");
    }else{
        setSuccessFor(email);
    }

    if(textValue === ""){
        setErrorFor(text, "the message is empty");
    }else if(!setTextError(textValue)){
        setErrorFor(text, "write real texts");
    }else if(textValue.length < 20){
        setErrorFor(text, "write a comple message");
    }else{
        setSuccessFor(text);

    // localStorage.setItem("Name", usernameValue);
    // localStorage.setItem("email", emailValue);
    // localStorage.setItem("Message", textValue);

    //form.reset();
    }

}

function setErrorFor(input, message){
    const contactControl = input.parentElement;
    const small = contactControl.querySelector("small");

    small.innerText = message;

    contactControl.className = "formfield error";

}

function setTextError(text){
    return /^[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/.test(text);
}

function setSuccessFor(input){
    const contactControl = input.parentElement;
    contactControl.className = "formfield success";
}

function realEmail(email){
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function checkSubscription(){
    const subscribeValue = subscribe.value.trim();

    if(subscribeValue ===""){
        subscribeError(subscribe);
    }else if(!realEmail(subscribeValue)){
        subscribeError(subscribe);
    }else {
        subscribeSuccess(subscribe);
    }
}

function subscribeError(input){
    const subscribeControl = input.parentElement;
    subscribeControl.className = "subscribeinput error";
}

function subscribeSuccess(input){
    const subscribeControl = input.parentElement;
    subscribeControl.className = "subscribeinput success";
}

