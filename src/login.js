let loginUI = document.getElementById("LoginUI")
let signupUI = document.getElementById("SignupUI")

let loginGreetingElement = document.getElementById("LoginGreeting")
let signupGreetingElement = document.getElementById("SignupGreeting")
let loginServer = "http://127.0.0.1:8086//login"
let signupServer = "http://127.0.0.1:8086//signup"
let isLoginUI = true;

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
    let payload = {
        "userID":id,
        "password":password,
        "name":name,
        "username":username
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
                console.log(response.headers.getSetCookie())
                console.log(document.cookie)
                return response.json()
            }
            throw new Error("Network response failed")
        }).then(data => {
            console.log("Response:", data);
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

function dummy()
{
    let payload = {
        "userID":"spooketti"
    }
    fetch("http://127.0.0.1:8086//dummy",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
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
          })
          .catch(error => {
            console.error("There was a problem with the fetch", error);
          });
}

genLoginGreet()
genSignupGreet()