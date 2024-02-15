document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result; // Get the image URL
            const image = new Image();
            image.src = imageUrl;
            image.onload = function() {
                displayImage(image);
            };
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});

function displayImage(image) {
    const container = document.getElementById('imageContainer');
    container.innerHTML = ''; // Clear previous content

    // Create a canvas element to draw the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const aspectRatio = image.width / image.height;
    canvas.width = 500;
    canvas.height = 500 / aspectRatio;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Append the canvas to the container
    container.appendChild(canvas);

    // Add event listener to saturation slider
    document.getElementById('saturationSlider').addEventListener('input', function() {
        adjustImage(image);
    });

    // Add event listener to brightness slider
    document.getElementById('brightnessSlider').addEventListener('input', function() {
        adjustImage(image);
    });

    // Add event listener to reset button
    document.getElementById('resetButton').addEventListener('click', function() {
        resetImage(image);
    });
}

function adjustImage(image) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const aspectRatio = image.width / image.height;
    canvas.width = 600;
    canvas.height = 600 / aspectRatio;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const saturationValue = document.getElementById('saturationSlider').value / 100;
    const brightnessValue = document.getElementById('brightnessSlider').value / 100;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const hsl = rgbToHsl(r, g, b);
        const newSaturation = hsl[1] * saturationValue;
        const newRgb = hslToRgb(hsl[0], newSaturation, hsl[2] * brightnessValue);
        data[i] = newRgb[0];
        data[i + 1] = newRgb[1];
        data[i + 2] = newRgb[2];
    }

    ctx.putImageData(imageData, 0, 0);

    // Replace the image with the adjusted image
    const container = document.getElementById('imageContainer');
    container.innerHTML = ''; // Clear previous content
    container.appendChild(canvas);
}

function resetImage(image) {
    displayImage(image);
    let range = document.getElementById('saturationSlider');
    range.addEventListener('saturationSlider', function(){
    range.value = '100';
    })
    range.addEventListener('mouseout', function(){
    range.value = '50';
    })

}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

// Convert HSL to RGB
function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function downloadImage() {
    const canvas = document.querySelector('canvas');
    const downloadButton = document.getElementById('downloadButton');
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    downloadButton.href = image;
    downloadButton.download = 'edited_image.png';
}

