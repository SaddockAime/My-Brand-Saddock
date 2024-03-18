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

//validating contact form and storing all details on local storage
form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs(){
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const textValue = text.value.trim();

    if(usernameValue === ""){
        setErrorFor(username, "Name is required");

    }else if(!setTextError(usernameValue)){
        setErrorFor(username, "not a real name")
    }else if(usernameValue.length < 3){
        setErrorFor(username, "insert full name");
    }else{
        setSuccessFor(username);
    }

    if(emailValue === ""){
        setErrorFor(email, "email is required");
    }else if(!realEmail(emailValue)){
        setErrorFor(email, "email is not valid");
    }else{
        setSuccessFor(email);
    }

    if(textValue === ""){
        setErrorFor(text, "message is required");
    }else if(!setTextError(textValue)){
        setErrorFor(text, "write real texts");
    }else if(textValue.length < 15){
        setErrorFor(text, "write a complete message");
    }else{
        setSuccessFor(text);
    }

    if(usernameValue !="" & setTextError(usernameValue) & 
        !usernameValue.length<3 & emailValue !="" & realEmail(emailValue)
        & textValue !="" & setTextError(textValue) & textValue.length>=15){

            var existingMessage = localStorage.getItem("Messages");

            var message = existingMessage ? JSON.parse(existingMessage) : [];
    
            message.push({ name: usernameValue, 
                            email: emailValue, 
                            Message: textValue
                        });
            
            var messageJSON = JSON.stringify(message);
    
            localStorage.setItem("Messages", messageJSON);
    
        form.reset();
        console.log(messageJSON);

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
    return /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/.test(email);
}

//validating subscription form and storing all details on local storage
subscribecontent.addEventListener("submit", (e) => {
    e.preventDefault();

    checkSubscription();
});

function checkSubscription(){
    const subscribeValue = subscribe.value.trim();

    if(subscribeValue ===""){
        subscribeError(subscribe);
    }else if(!realEmail(subscribeValue)){
        subscribeError(subscribe);
    }else {
        subscribeSuccess(subscribe);
    }

    if(subscribeValue !="" & realEmail(subscribeValue)){
        
        var existingSubscription = localStorage.getItem("Subscription");

        var subscription = existingSubscription ? JSON.parse(existingSubscription) : [];

        subscription.push({
            email: subscribeValue
        });

        var subscriptionJSON = JSON.stringify(subscription);

        localStorage.setItem("Subscription", subscriptionJSON);

        subscribecontent.reset();
        console.log(subscriptionJSON);
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

