let postMenu = document.getElementById("CreatePost")
let postHeadPFP = document.getElementById("PostHeadPFP")
let postHeadUsername = document.getElementById("PostHeadUsername")
let postFile = document.getElementById("PostFile")
let postImagePreview = document.getElementById("PostBodyImage")
let postNoImage = document.getElementById("PostBodyNoImage")
let postBodyInput = document.getElementById("PostBodyInput")
let uploadServer = "http://127.0.0.1:8086///createPost"

function openPostCreate()
{
    postHeadPFP.src = localStorage.getItem("globalPFP")
    postHeadUsername.innerText = `Upload as ${localStorage.getItem("globalUsername")}`
    if(localStorage.getItem("globalUserID") == null)
    {
        window.open("login.html", '_blank');
        return
    }
    postMenu.style.display = "flex"
}

function closeMenu()
{
    postMenu.style.display = "none"
}

function submitImage()
{
 postFile.click()
}

postFile.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result; // Get the image URL
            const image = new Image();
            image.src = imageUrl;
            image.onload = function() {
                postNoImage.remove()
                postImagePreview.src = image.src
            };
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});

function submitPost()
{
    let payload = 
    {
        "caption":postBodyInput.value,
        "image":postImagePreview.src,
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
      if(data == "Success")
      {
        //window.location.reload()
      }

    })
    .catch(error => {
      console.error("There was a problem with the fetch", error);
    });

}