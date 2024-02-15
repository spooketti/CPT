let jwt = localStorage.getItem("jwt")
let profileView = document.getElementById("SignupNavbar")
let endpoint = "http://127.0.0.1:8086//checkAuth"
let navLink = document.getElementById("NavbarLink")
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
            let navpfp = document.createElement("img")
            navpfp.src = data["pfp"]
            navpfp.className = "navPFP"
            navProfile.appendChild(navpfp)
            let navspan = document.createElement("span")
            navspan.innerText = data["username"]
            navProfile.appendChild(navspan)
                
          })
          .catch(error => {
            console.error("There was a problem with the fetch", error);
          });   

