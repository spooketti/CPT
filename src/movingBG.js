 // Get canvas element
 var canvas = document.getElementById("canvas");
 var ctx = canvas.getContext("2d");
 // Set canvas dimensions
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 // Load background image
 var background = new Image();
 background.src = "images/background.png";
 // Define background parameters
 var bgWidth = canvas.width; // Width of the background image
 var bgHeight = canvas.height; // Height of the canvas
 var speed = 1; // Speed of panorama motion
 // Initial position of the background
 var xPos = 0;
 // Function to draw the background
 function draw() {
     // Clear canvas
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     // Draw background images
     ctx.drawImage(background, xPos, 0, bgWidth, bgHeight);
     ctx.drawImage(background, xPos + bgWidth, 0, bgWidth, bgHeight);
     // Update position
     xPos -= speed;
     // Check if the first background image is completely off-screen
     if (xPos <= -bgWidth) {
         // Reset its position to the right end of the screen
         xPos += bgWidth;
     } else if (xPos >= 0) {
         // If the second background image is completely off-screen to the left, reset its position to the right end of the screen
         xPos -= bgWidth;
     }
     // Request animation frame
     requestAnimationFrame(draw);
 }
 // Start drawing
 background.onload = function () {
     draw();
 };
 // Adjust canvas dimensions if the window is resized
 window.addEventListener("resize", function () {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     bgHeight = canvas.height;
 });