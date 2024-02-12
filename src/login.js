let loginUI = document.getElementById("LoginUI")
let signupUI = document.getElementById("SignupUI")
let loginServer = "http://192.168.1.106:8086/login"
let signupServer = "http://192.168.1.106:8086/signup"
let isLoginUI = true;

function toggleUI()
{
    isLoginUI = !isLoginUI;
    switch(isLoginUI)
    {
        case true:
            signupUI.style.display = "none"
            loginUI.style.display = "flex"
            loginUI.style.animation = "fadeInUp 1s ease"
        break;

        case false:
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
    console.log(JSON.stringify(payload))
    fetch(loginServer,
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(payload)
        }).then(response =>{
            if(response.ok)
            {
                console.log(response.headers.get("Set-Cookie"))
                document.cookie = response.headers.get("Set-Cookie")
                return response.text()
            }
            throw new Error("Network response failed")
        }).then(data => {
            console.log("Response:", data);
          })
          .catch(error => {
            console.error("There was a problem with the fetch", error);
          });
})