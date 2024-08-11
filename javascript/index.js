//sideMenu

const sideMenu = document.getElementById("sidemenu");
function openmenu() {
  sideMenu.style.right = "0";
}
function closemenu() {
  sideMenu.style.right = "-200px";
}
//tab-links and tab-contents elements
const tabLinks = document.getElementsByClassName("tab-links");
const tabContents = document.getElementsByClassName("tab-contents");

//opening a tab
function opentab(tabName, event) {
    //removing the active class from all tab links
    for (const tabLink of tabLinks) {
        tabLink.classList.remove("active-link");
    }

    //removing the active class from all tab contents
    for (const tabContent of tabContents) {
        tabContent.classList.remove("active-tab");
    }

    //Adding the active class to the clicked tab link and corresponding tab content
    event.currentTarget.classList.add("active-link");
    const tabContentElement = document.getElementById(tabName);
    if (tabContentElement) {
        tabContentElement.classList.add("active-tab");
    } else {
        console.error(`Tab content with ID "${tabName}" not found.`);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("form");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const text = document.getElementById("text");
    const navLinks = document.querySelectorAll(".nav ul li a");
    const sections = document.querySelectorAll("section, .about, .projects");
    const homeLink = document.querySelector('.nav ul li a[href="index.html"]');
  
    // Function to remove 'active' class from all links
    function removeActiveClasses() {
      navLinks.forEach(link => link.classList.remove("active"));
    }
  
    // Function to add 'active' class to the current link
    function addActiveClass(link) {
      removeActiveClasses();
      link.classList.add("active");
    }
  
    // Add click event listeners to each nav link
    navLinks.forEach(link => {
      link.addEventListener("click", function() {
        addActiveClass(link);
      });
    });
  
    // IntersectionObserver callback function
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav ul li a[href="#${id}"]`);
  
        if (entry.isIntersecting) {
          addActiveClass(link);
        }
      });
    };
  
    // IntersectionObserver options
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    };
  
    // Create an IntersectionObserver
    const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    // Observe each section
    sections.forEach(section => {
      observer.observe(section);
    });
  
    // Highlight 'Home' when at the top of the page
    window.addEventListener("scroll", function() {
      if (window.scrollY < 100) { // Adjust this value if needed
        addActiveClass(homeLink);
      }
    });
  
    // Initial check in case the page loads at the top
    if (window.scrollY < 100) {
      addActiveClass(homeLink);
    }
    
    // clear validation messages when typing starts
            name.addEventListener("input", clearMessage);
            email.addEventListener("input", clearMessage);
            text.addEventListener("input", clearMessage);
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
});