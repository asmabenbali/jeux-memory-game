// Selecting the main container element
var main = document.querySelector(".main");

// Creating audio elements for right and wrong actions
var audioRight = document.createElement('audio');
audioRight.src = 'assets/good.mp3';

var audioWrong = document.createElement('audio');
audioWrong.src = 'assets/aaaa.mp3';

// Array containing paths to images
var images = ["./assets/g.jpg", "./assets/d.jpg",'./assets/a.jpg',"./assets/d.jpg", './assets/c.jpg','./assets/e.jpg', './assets/f.jpg',  './assets/a.jpg',  './assets/e.jpg', "./assets/f.jpg", "./assets/g.jpg",'./assets/c.jpg'];

// Function to create the game board
function lettersFunction() {
    for (let i = 0; i < images.length; i++) {
        // Create a div for each image
        div = document.createElement("div");
        main.appendChild(div);

        // Create an image element
        img = document.createElement("img");
        // Set the image source and id
        img.setAttribute("src", images[i]);
        img.setAttribute("id", images[i]);
        // Append the image to the div
        div.appendChild(img);
    }
    // Get all div elements
    all_div = document.getElementsByTagName("div");
}

// Array to store clicked elements
var x = [];
// Flag to control clicks
var flag = true;

// Event handler for the start button
document.getElementById("startButton").onclick = function () {
    // Hide the start button
    this.style.display = "none";
    // Show the finish button
    document.getElementById("finishButton").style.display = "block";

    // Clear the main container
    main.innerHTML = '';
    // Create the game board
    lettersFunction();

    // Play the background audio
    var backgroundAudio = document.getElementById("backgroundAudio");
    backgroundAudio.play();

    // Add click event listeners to new divs
    for (var i = 0; i < all_div.length; i++) {
        all_div[i].onclick = function () {
            // Check if flag is false (indicating no more clicks should be registered)
            if (!flag) return;
            // Show the image inside the div
            this.firstChild.style.opacity = "1";
            if (x.length == 0) {
                // If no elements have been clicked, store the current element
                x[0] = this;
            } else if (x.length == 1) {
                // If one element has been clicked, store the current element
                x[1] = this;
            }

            if (x.length == 2) {
                // If two elements have been clicked, prevent further clicks and check the match
                flag = false;
                setTimeout(check, 700);
            }
        };
    }
};

// Event handler for the finish button
document.getElementById("finishButton").onclick = function () {
    // Show the start button
    document.getElementById("startButton").style.display = "block";
    // Hide the finish button
    this.style.display = "none";

    // Stop the background audio
    var backgroundAudio = document.getElementById("backgroundAudio");
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0; // Reset audio to the beginning

    // Reset game state
    main.innerHTML = '';
    x = [];
    flag = true;
};

// Function to check if the clicked elements match
function check() {
    if (x[0].firstChild.id === x[1].firstChild.id) {
        // If the images match, play the right audio
        audioRight.play();
    } else {
        // If the images don't match, play the wrong audio and hide the images
        audioWrong.play();
        x[0].firstChild.style.opacity = "0";
        x[1].firstChild.style.opacity = "0";
    }
    // Reset clicked elements and flag for further clicks
    x = [];
    flag = true;
}
