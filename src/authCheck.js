let jwt = localStorage.getItem("jwt")
let profileView = document.getElementById("SignupNavbar")
let endpoint = "http://127.0.0.1:8086//checkAuth"
let pm = document.getElementById("profileMenu")
let pmName = document.getElementById("profileMenuName")
let pmUsername = document.getElementById("profileMenuUsername")
let pmPFP= document.getElementById("profileMenuPFP")
let pmUserID = document.getElementById("profileMenuUserID")
let pmBanner = document.getElementById("profileMenuRoleBanner")
let navLink = document.getElementById("NavbarLink")
let displayJSON = 
{
 true:"block",
 false:"none" 
}
let visibility = false
    fetch(endpoint,
        {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
              },
        }).then(response =>{
            if(response.ok)
            {
                profileView.remove()
                 /*<div id="navProfile">
                <img src="https://avatars.githubusercontent.com/u/115603886?v=4" class="navPFP">
                <span>Profile</span>
              </div>*/

                return response.json()
            }
            throw new Error("Network response failed")
        }).then(data => {
            console.log("Response:", data);
            let navProfile = document.createElement("div")
            navProfile.id = "navProfile"
            navLink.appendChild(navProfile)
            pmPFP.src = data["pfp"]
            let navpfp = document.createElement("img")
            navpfp.src = data["pfp"]
            navpfp.className = "navPFP"
            navProfile.appendChild(navpfp)
            let navspan = document.createElement("span")
            navspan.innerText = data["username"]
            pmUserID.innerText = data["userID"]
            pmName.innerText = data["name"]
            pmUsername.innerText = data["username"]
            navProfile.appendChild(navspan)
            navProfile.onclick = panic
                
          })
          .catch(error => {
            console.error("There was a problem with the fetch", error);
            /*
           if(window.location.pathname != "/")
           {
            window.location.href = "index.html"
           }
           */
          });   

function panic()
{
  visibility = !visibility
  pm.style.display = displayJSON[visibility]
}

function logout()
{
  localStorage.removeItem("jwt")
  window.location.reload()
}