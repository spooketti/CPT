
ctx.fillStyle = "black"
ctx.fillRect(10, 10, 150, 100);

document.addEventListener("paste",function(e)
{
 if(!e.clipboardData)
 {
    return
 }   
 let items = e.clipboardData.items;
 for(let i=0;i<items.length;i++)
 {
   if(items[i].type.indexOf("image") !== -1)
   {
    let img = items[i].getAsFile()
    let reader = new FileReader()

    reader.onload = function(e) {
        let img = new Image();
        img.src = e.target.result;

        // Draw the image on the canvas
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    };

    // Read the blob as a Data URL
    reader.readAsDataURL(img);
   }
 }
})