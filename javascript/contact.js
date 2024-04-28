//sideMenu
const sideMenu = document.getElementById("sidemenu");
        function openmenu(){
            sideMenu.style.right = "0";
        }
        function closemenu(){
            sideMenu.style.right = "-200px";
        }


document.addEventListener("DOMContentLoaded", function(){
const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const text = document.getElementById("text");
const subscribecontent = document.getElementById("subscribecontent");
const subscribe = document.getElementById("subscribe");
const messageDiv = document.getElementById("message");

// clear validation messages when typing starts
        name.addEventListener("input", clearMessage);
        email.addEventListener("input", clearMessage);
        text.addEventListener("input", clearMessage);
        subscribe.addEventListener("input", clearMessage);

//contact form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
});

async function checkInputs(){
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const textValue = text.value.trim();

    if(nameValue === ""){
        setErrorFor(name, "Name is required");

    }else if(!setTextError(nameValue)){
        setErrorFor(name, "not a real name")
    }else if(nameValue.length < 3){
        setErrorFor(name, "insert full name");
    }else{
        setSuccessFor(name);
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

    if(nameValue !="" & setTextError(nameValue) & 
        !nameValue.length<3 & emailValue !="" & realEmail(emailValue)
        & textValue !="" & setTextError(textValue) & textValue.length>=15){

            const messageData = {
                name: nameValue,
                email: emailValue,
                message: textValue
            };

            try {
                const response = await fetch('https://my-brand-saddock-backend.onrender.com/api/messages/createMessage', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(messageData)
                  });
                  
                  const data = await response.json();
                  console.log('Messages', data);

                  if(response.status === 200){
                    form.reset();
                    alert("message sent successfully");
                  }
            } catch (error) {
                console.log('Error', error);
            }
    }
}

function setErrorFor(input, message){
    const contactControl = input.parentElement;
    const small = contactControl.querySelector("small");

    small.innerText = message;

    contactControl.className = "formfield error";
}

function clearMessage() {
    const contactControl = this.parentElement;
    contactControl.classList.remove("error");
    contactControl.classList.remove("success");
    const small = contactControl.querySelector("small");
    //small.innerText = "";
}

function setTextError(text){
    return /^[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/.test(text);
}

function setSuccessFor(input){
    const contactControl = input.parentElement;
    contactControl.className = "formfield success";
    setTimeout(() => {
        contactControl.className = contactControl.className.replace(" success", "");
    }, 1000);
}

function realEmail(email){
    return /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/.test(email);
}



//subscription form
subscribecontent.addEventListener("submit", (e) => {
    e.preventDefault();

    checkSubscription();
});

async function checkSubscription(){
    const subscribeValue = subscribe.value.trim();

    if(subscribeValue ===""){
        subscribeError(subscribe);
    }else if(!realEmail(subscribeValue)){
        subscribeError(subscribe);
    }else {
        subscribeSuccess(subscribe);
    }

    if(subscribeValue !="" & realEmail(subscribeValue)){

        const subscribeData = {
            email: subscribeValue
        };

        try {
            const response = await fetch('https://my-brand-saddock-backend.onrender.com/api/subscribers/createSubscriber', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscribeData)
              });
              
              const data = await response.json();
              messageDiv.textContent = data.message;
              console.log('Subscriber', data);

              if(response.ok){
                subscribecontent.reset();
                alert("Subscription sent successfully");
              }
        } catch (error) {
            console.log('Error', error);
        }
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

});

