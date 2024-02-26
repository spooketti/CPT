let jwt = localStorage.getItem("jwt")
let profileView = document.getElementById("SignupNavbar")
let endpoint = "http://127.0.0.1:8086////checkAuth"
let pm = document.getElementById("profileMenu")
let pmName = document.getElementById("profileMenuName")
let pmUsername = document.getElementById("profileMenuUsername")
let pmPFP = document.getElementById("profileMenuPFP")
let pmUserID = document.getElementById("profileMenuUserID")
let pmBanner = document.getElementById("profileMenuRoleBanner")
let navLink = document.getElementById("NavbarLink")
let logoutButton = document.getElementById("profileMenuLogout")
let pmChangeDiv = document.getElementById("profileMenuChangeMenu")
let changeDName = document.getElementById("changeDisplayName")
let changeName = document.getElementById("changeName")
let changeOldPW = document.getElementById("changeOldPW")
let changeNewPW = document.getElementById("changeNewPw")
let changePFPButton = document.getElementById("changePFPButton")
let changePreviewPFP = document.getElementById("changePreviewPFP")
let applyChangeButton = document.getElementById("profileMenuApplyChange")
let pmChangeFile = document.getElementById("changeFile")
let previewPFPChanged = false;
let displayJSON =
{
  true: "block",
  false: "none"
}
let visibility = false
fetch(endpoint,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    },
  }).then(response => {
    if (response.ok) {
      profileView.remove()
      /*<div id="navProfile">
     <img src="https://avatars.githubusercontent.com/u/115603886?v=4" class="navPFP">
     <span>Profile</span>
   </div>*/

      return response.json()
    }
    clearGlobalUser()
    throw new Error("Network response failed")
  }).then(data => {
    console.log("Response:", data);
    localStorage.setItem("globalPFP", data["pfp"])
    localStorage.setItem("globalUsername", data["username"])
    localStorage.setItem("globalRole", data["role"])
    localStorage.setItem("globalName", data["name"])
    localStorage.setItem("globalUserID", data["userID"])

    let navProfile = document.createElement("div")
    navProfile.id = "navProfile"
    navLink.appendChild(navProfile)
    pmPFP.src = data["pfp"]
    changePreviewPFP.src = data["pfp"]
    let navpfp = document.createElement("img")
    navpfp.src = data["pfp"]
    navpfp.className = "navPFP"
    navProfile.appendChild(navpfp)
    let navspan = document.createElement("span")
    navspan.innerText = data["username"]
    pmUserID.innerText = data["userID"]
    pmName.innerText = data["name"]
    pmUsername.innerText = data["username"]
    pmBanner.innerText = data["role"]
    switch (data["role"]) {
      case "Creator":
        pmBanner.className = "creatorRole"
        logoutButton.classList.add("creatorRole")
        changePFPButton.classList.add("creatorRole")
        applyChangeButton.classList.add("creatorRole")
        break;

      case "Admin":
        pmBanner.className = "adminRole"
        logoutButton.classList.add("adminRole")
        changePFPButton.classList.add("adminRole")
        applyChangeButton.classList.add("adminRole")

        break;
    }
    navProfile.appendChild(navspan)
    navProfile.onclick = showUserProfile

  })
  .catch(error => {
    clearGlobalUser()
    console.error("There was a problem with the fetch", error);
    /*
   if(window.location.pathname != "/")
   {
    window.location.href = "index.html"
   }
   */
  });

function showUserProfile() {
  visibility = !visibility
  pm.style.display = displayJSON[visibility]
}

function logout() {
  localStorage.clear()
  window.location.reload()
}

function applyChanges() {
  let dName = changeName.value
  let dUsername = changeDName.value
  let dOld = changeOldPW.value
  let dNew = changeOldPW.value
  let dPfp = previewPFPChanged ? changePreviewPFP.src : " "
  let payload = {
    "name":dName,
    "username":dUsername,
    "oldPW":dOld,
    "newPW":dNew,
    "pfp":dPfp

  }
  fetch("http://127.0.0.1:8086//updateUser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: "include",
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.ok) {
        return response.text()
      }
      throw new Error("Network response failed")
    }).then(data => {
      console.log("Response:", data);
      if(data == "Success")
      {
        //window.location.reload()
      }

    })
    .catch(error => {
      console.error("There was a problem with the fetch", error);
    });
}



function uploadPFPChange() {
  pmChangeFile.click()
}

pmChangeFile.addEventListener('change', function (event) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result; // Get the image URL
      const image = new Image();
      image.src = imageUrl;
      image.onload = function () {
        previewPFPChanged = true;
        changePreviewPFP.src = image.src
      };
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
});

function clearGlobalUser()
{
  let jwtClone = jwt
  localStorage.clear()
  localStorage.setItem("jwt",jwtClone)
}