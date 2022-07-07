// PART 1 CREATE A NEW PATTERN

// P1 #3 At the top of the game.js file, create a new array called buttonColors
// and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColors = ["red", "blue", "green", "yellow"];

// P1 #5 At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

// P3 #3 At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

// PART 6 START THE GAME
// P6 #0 You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// P6 #2 Create a new variable called level and start at level 0.
var level = 0;

// P6 #1 Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
// You'll need a variable called started to toggle to true once the game starts and if it's true, then further key presses should not trigger nextSequence().
$(document).keydown(function () {
  if (!started) {
    // P6 #3 The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// PART 3 CHECK WHICH BUTTON IS PRESSED

// P3 #1 Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// All buttons share the same class (btn)
// jQuery has a .click() function
// jQuery handlers are anonymous functions
$(".btn").click(function () {
  // P3 #2 Inside the handler, create a new variable called userChosenColor to store the id of the button that got clicked.
  // Inside the handler, you can use the keyword this to refer to the button object that triggered the click.
  // You can use the attr() function in jQuery to find out the value of any of the attributes of an object.
  var userChosenColor = $(this).attr("id");

  // P3 #4 Add the contents of the variable userChosenColor created in step 2 to the end of this new userClickedPattern
  // You can use console.log(userClickedPattern); to check which buttons the user clicked.
  userClickedPattern.push(userChosenColor);

  // P4 #1 In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColor);
  // When a user clicks on a button, the corresponding animation should be played
  animatePress(userChosenColor);

  // PART 7 Check the User's Answer Against the Game Sequence
  // P7 #2 Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// P7 #1 Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  // P7 #3 Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //P7 #4 If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //P7 #5 Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    // PART 8 GAME Over

    // P8 #1 In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

    //P8 #2 In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // P8 #3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // P9 #2 Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}

// P1 #1 Create a new function called nextSequence()
function nextSequence() {
  // P7 #6 Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // P6 #4 Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //P6 #5 Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  // P1 #2 Inside the new function generate a new random number between 0 and 3,
  // and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  // P1 #4 Create a new variable called randomChosenColor
  // and use the randomNumber from step 2 to select a random color from the buttonColors array.
  var randomChosenColor = buttonColors[randomNumber];

  // P1 #6 Add the new randomChosenColor generated in step 4 to the end of the gamePattern
  gamePattern.push(randomChosenColor);

  // PART 2 SHOW THE SEQUENCE TO THE USER WITH ANIMATIONS AND SOUND

  // P2 #1 Use jQuery to select the button with the same id as the randomChosenColor
  // P2 #2 Use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // P4 #4 Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColor);
}

// PART 4 ADD SOUNDS TO BUTTON CLICKS

// P4 #2 Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  // P4 #3 Take the code we used to play sound in the nextSequence() function and move it to playSound().
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

// PART 5 ADD ANIMATIONS TO USER CLICKS
// P5 #1 Create a new function called animatePress(), it should take a single input parameter called currentColor.
function animatePress(currentColor) {
  // P5 #2 Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");
  // P5 #3 use Javascript to remove the pressed class after a 100 milliseconds.
  // Use setTimeout(function() {YOUR CODE}, delayInMilliseconds);
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// STEP 9 RESTART THE GAME
// P9 #1 Create a new function called startOver().
function startOver() {
  // P9 #3 Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
