const gameBody = document.getElementById("game-body");
const $lives = document.getElementById("lives");
var seconds = document.getElementById("timer").textContent;
var zombieId = 0;

//Iteration 1: Create an array and store zombie images
const img = [
  "zombie-1.png",
   "zombie-2.png",
   "zombie-4.png",
   "zombie-5.png",
   "zombie-6.png",
 ];

//Iteration 2: Add shotgun sound
 const expAudio = new Audio(
   "https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav"
 );

//Iteration 3: Use audio methods to enhance the audio effects
 expAudio.volume = 0.2;
 gameBody.onclick = () => {
   expAudio.pause();
   expAudio.currentTime = 0;
   expAudio.play();
 };

const backgroundSound = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3"
);
backgroundSound.play();


// Iteration 4: Use loop property to repeat the background sound
 backgroundSound.loop = true;


const maxlives = 4;
var lives = 4;

//Iteration 5: Function to create a zombie
 function makeZombie() {
   randomImage = img[getRandomInt(0, img.length)];
   gameBody.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieId}">`;
   let zombie = document.getElementById("zombie" + zombieId);
   zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
   zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
   zombie.onclick = () => {
     zombieDestruct(zombie);
   };
 }

// Iteration 6: Function to check if the player has missed clicking on a zombie
 function checkCollision(zombie) {
   if (zombie.getBoundingClientRect().top <= 0) {
     lives--;
     return true;
   }
   return false;
 }


//  Iteration 7:Function to destroy a zombie when it is shot or missed
 function zombieDestruct(zombie) {
   zombie.style.display = "none";
   zombieId++;
   makeZombie();
 }


// Iteration 8: Start game by calling the makeZombie function
 makeZombie(zombieId);

// Iteration 9: Create a function to get random integer
 function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
 }




// Timer
var timer = setInterval(function () {
  seconds--;
  document.getElementById("timer").textContent = seconds;
  let zombie = document.getElementById("zombie" + zombieId);
  if (checkCollision(zombie) == true) {
    zombieDestruct(zombie);
    if (lives == 0) {
      clearInterval(timer);
      endGame("lost");
    }
  }
  if (seconds == 0) {
    clearInterval(timer);
    endGame("won");
  }
}, 1000);