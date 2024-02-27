let postMenu = document.getElementById("CreatePost")
let postHeadPFP = document.getElementById("PostHeadPFP")
let postHeadUsername = document.getElementById("PostHeadUsername")
let postFile = document.getElementById("PostFile")
let postImagePreview = document.getElementById("PostBodyImage")
let postNoImage = document.getElementById("PostBodyNoImage")
let postBodyInput = document.getElementById("PostBodyInput")
let postBoard = document.getElementById("NavBoardCenter")
let uploadServer = "https://spooketti.pythonanywhere.com/createPost"
let getServer = "https://spooketti.pythonanywhere.com/getPosts?page=1"

function openPostCreate() {
  postHeadPFP.src = localStorage.getItem("globalPFP")
  postHeadUsername.innerText = `Upload as ${localStorage.getItem("globalUsername")}`
  if (localStorage.getItem("globalUserID") == null) {
    window.open("login.html", '_blank');
    return
  }
  postMenu.style.display = "flex"
}

function closeMenu() {
  postMenu.style.display = "none"
}

function submitImage() {
  postFile.click()
}

postFile.addEventListener('change', function (event) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result; // Get the image URL
      const image = new Image();
      image.src = imageUrl;
      image.onload = function () {
        postNoImage.remove()
        postImagePreview.src = image.src
      };
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
});

function submitPost() {
  let payload =
  {
    "caption": postBodyInput.value,
    "image": postImagePreview.src,
  }
  fetch(uploadServer,
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
      if (data == "Success") {
        closeMenu()
      }

    })
    .catch(error => {
      console.error("There was a problem with the fetch", error);
    });
}

function getPosts() {
  fetch(getServer,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Network response failed")
    }).then(data => {
      console.log("Response:", data);
      console.log(data.posts)
      for (let i = 0; i < data.posts.length; i++) {
       // console.log(data.posts[i])
        const boardPostDiv = document.createElement("div");
        boardPostDiv.classList.add("BoardPost");
        const userHoldDiv = document.createElement("div");
        userHoldDiv.classList.add("UserHold");
        const userProfilePicImg = document.createElement("img");
        userProfilePicImg.src = data.posts[i].pfp;
        userProfilePicImg.classList.add("BoardPFP");
        userHoldDiv.appendChild(userProfilePicImg);
        const userDataHoldDiv = document.createElement("div");
        userDataHoldDiv.classList.add("UserDataHold");
        const usernameSpan = document.createElement("span");
        usernameSpan.classList.add("BoardUN");
        usernameSpan.textContent = data.posts[i].username;
        const userIDSpan = document.createElement("span");
        userIDSpan.classList.add("BoardID");
        userIDSpan.textContent = data.posts[i].userID;
        userDataHoldDiv.appendChild(usernameSpan);
        userDataHoldDiv.appendChild(document.createElement("br"));
        userDataHoldDiv.appendChild(userIDSpan);
        userHoldDiv.appendChild(userDataHoldDiv);
        boardPostDiv.appendChild(userHoldDiv);
        const captionParagraph = document.createElement("p");
        captionParagraph.classList.add("BoardCaption");
        captionParagraph.textContent = data.posts[i].caption;
        boardPostDiv.appendChild(captionParagraph);
        const boardImageImg = document.createElement("img");
        boardImageImg.src = data.posts[i].image;
        boardImageImg.classList.add("BoardImage");
        boardPostDiv.appendChild(boardImageImg);
        postBoard.appendChild(boardPostDiv);
      }
    })
    .catch(error => {
      console.error("There was a problem with the fetch", error);
    });
}

getPosts()