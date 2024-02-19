let loginUI = document.getElementById("LoginUI")
let signupUI = document.getElementById("SignupUI")

let loginGreetingElement = document.getElementById("LoginGreeting")
let signupGreetingElement = document.getElementById("SignupGreeting")
let loginServer = "http://127.0.0.1:8086///login"
let signupServer = "http://127.0.0.1:8086///signup"
let isLoginUI = true;
let pfpUploadEl = document.getElementById("fileUploadLogin")
let pfpPreview = document.getElementById("LoginPFPPreview")
let defaultPFP
let pfpChanged = false

let loginGreetings = ["We're glad to see you back","Welcome back to VividFusion"]
let signupGreetings = ["Sign up for VividFusion","Wecome to VividFusion"]

function toggleUI()
{
    isLoginUI = !isLoginUI;
    switch(isLoginUI)
    {
        case true:
            genLoginGreet()
            signupUI.style.display = "none"
            loginUI.style.display = "flex"
            loginUI.style.animation = "fadeInUp 1s ease"
        break;

        case false:
            genSignupGreet()
            loginUI.style.display = "none"
            signupUI.style.display = "flex"
            signupUI.style.animation = "fadeInUp 1s ease"
        break;
    }
}

document.getElementById("signupForm").addEventListener("submit",function(e)
{
    e.preventDefault()
    let username = document.getElementById("signupUsername").value
    let name = document.getElementById("signupName").value
    let id = document.getElementById("signupID").value
    let password = document.getElementById("signupPW").value
    let pfp = pfpChanged ? pfpPreview.src : defaultPFP
    let payload = {
        "userID":id,
        "password":password,
        "name":name,
        "username":username,
        "pfp":pfp
    }
    fetch(signupServer,
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(payload)
        }).then(response =>{
            if(response.ok)
            {
                return response.text()
            }
            throw new Error("Network response failed")
        }).then(data => {
            console.log("Response:", data);
            let jwt = JSON.parse(data)
            localStorage.setItem("jwt",jwt["jwt"])
            window.location.href = "index.html"
          })
          .catch(error => {
            console.error("There was a problem with the fetch", error);
          });
})

document.getElementById("loginForm").addEventListener("submit",function(e){
    e.preventDefault()
    let id = document.getElementById("usernameLogin").value
    let password = document.getElementById("passwordLogin").value
    let payload = {
        "userID":id,
        "password":password,
    }
    fetch(loginServer,
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
              },
            credentials: "include",
            body: JSON.stringify(payload)
        }).then(response =>{
            if(response.ok)
            {
                return response.text()
            }
            throw new Error("Network response failed")
        }).then(data => {
            console.log("Response:", data);
            let jwt = JSON.parse(data)
            localStorage.setItem("jwt",jwt["jwt"])
            window.location.href = "index.html"
          })
          .catch(error => {
            console.error("There was a problem with the fetch", error);
          });
})

function genLoginGreet()
{
    loginGreetingElement.innerText = loginGreetings[Math.floor(Math.random() * loginGreetings.length)]
}

function genSignupGreet()
{
    signupGreetingElement.innerText = signupGreetings[Math.floor(Math.random())*signupGreetings.length]
}

function uploadPFP()
{
    pfpUploadEl.click()
}

genLoginGreet()
genSignupGreet()

pfpUploadEl.addEventListener('change', function(event) {
    pfpChanged = true
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result; // Get the image URL
            const image = new Image();
            image.src = imageUrl;
            image.onload = function() {
                pfpPreview.src = image.src
            };
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});

let xhr = new XMLHttpRequest();       
    xhr.open("GET", "../assets/img/DefaultPFP.png", true); 
    xhr.responseType = "blob";
    xhr.onload = function () {
            let reader = new FileReader();
            reader.onload = function(event) {
               let res = event.target.result;
               defaultPFP = res
            }
            let file = this.response;
            reader.readAsDataURL(file)
    };
    xhr.send()