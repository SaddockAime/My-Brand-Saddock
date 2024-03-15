var sideme = document.getElementById("sidemenu");
        function openmenu(){
            sideme.style.right = "0";
        }
        function closemenu(){
            sideme.style.right = "-200px";
        }


        const signUp = document.getElementById("signUp");
        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        
        signUp.addEventListener("submit", (e) => {
            e.preventDefault();
        
            checkSignIn();
        });
        
        function checkSignIn(){
            const usernameValue = username.value.trim();
            const emailValue = email.value.trim();
            const passwordValue = password.value.trim();

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
        
            if(passwordValue === ""){
                setErrorFor(password, "password is blank");
            }else if(!realPassword(passwordValue)){
                setErrorFor(password, "password is not strong");
            }else{
                setSuccessFor(password);
            }
        
            
        }
        
        function setErrorFor(input, message){
            const signupControl = input.parentElement;
            const small = signupControl.querySelector("small");
        
            small.innerText = message;
        
            signupControl.className = "signupfield error";
        
        }

        function setTextError(text){
            return /^[A-Za-z]+$/.test(text);
        }
        
        function realEmail(email){
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        }
        
        function setSuccessFor(input){
            const signupControl = input.parentElement;
            signupControl.className = "signupfield success";
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