"use strict";
console.log("called");
var scores = localStorage.getItem("score");
//Save the default value of the input element
var bowamt = parseInt($("#bow").val());
var ballamt = parseInt($("#ball").val());
var clockamt = parseInt($("#clock").val());
var appleamt = parseInt($("#apple").val());
var umbamt = parseInt($("#umb").val());
var temamt = parseInt($("#tem").val());
var jakamt = parseInt($("#jackpot").val());
var totalbet = 0;
const dice = dicemake();
console.log(bowamt);
console.log(dice);
const playbutton = document.getElementById("musics");
const gameaudio = document.getElementById("music");
function toggleMusic() {
  if (gameaudio.paused) {
    gameaudio.play();
  }
  gameaudio.addEventListener("ended", function () {
    gameaudio.currentTime = 0;
    gameaudio.play();
  });
}

playbutton.addEventListener("click", function () {
  if ($("#musics").text() === "music on") {
    toggleMusic();

    $("#musics").text("music off");
  } else {
    stopMusic();

    $("#musics").text("music on");
  }
});

function playSound() {
  var audio = document.getElementById("myAudio");
  audio.play();
}

function stopMusic() {
  gameaudio.pause();
  gameaudio.currentTime = 0;
}
function playSoundappl() {
  var audio = document.getElementById("myApplause");
  audio.play();
}
function dicemake() {
  const dice = [];
  for (let i = 1; i < 7; i++) {
    const fileName = `images/Picture${i}.svg`;
    // Push the filename into the array
    dice.push(fileName);
  }

  return dice;
}
//
function generateRandomDigits() {
  const digits = [];
  for (let i = 0; i < 6; i++) {
    const randomDigit = Math.floor(Math.random() * 6) + 1;
    const fileName = `images/Picture${randomDigit}.svg`;
    // Push the filename into the array
    digits.push(fileName);
  }
  return digits;
}
function removerclass() {
  var inputElements = document.getElementsByClassName("r-col-sm-4");
  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].classList.remove("r");
  }
}
function draw(imageSources) {
  var inputElements = document.getElementsByClassName("r-col-sm-4");
  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].classList.add("r");
  }

  for (let i = 1; i <= imageSources.length; i++) {
    const img = document.getElementById("dice" + i);
    let index = 1;
    const showNextImage = () => {
      if (index <= dice.length) {
        const randomDigit = Math.floor(Math.random() * 6) + 1;
        img.src = dice[randomDigit - 1];
        index++;
        setTimeout(showNextImage, 50);
      } else {
        img.src = imageSources[i - 1];
      }
    };
    showNextImage();
    img.src = imageSources[i - 1];
  }
}

function countDuplicateStrings(arr) {
  const counts = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    counts[item] = counts[item] ? counts[item] + 1 : 1;
  }
  return counts;
}
function evaluateHand(hand) {
  if (jakamt > 0) {
    if (new Set(hand).size === 6) {
      scores += 6 * jakamt;
      $("#gamestatus").text("You Hit the Jackpot");
      let elem = document.getElementById("gif");
      elem.classList.remove("hidden");
      playSoundappl();
    }
  }
  let count = countDuplicateStrings(hand);
  let counts = parseInt(count["images/Picture1.svg"]);
  if (counts == 0 || counts == 1 || isNaN(counts)) {
    counts = 0;
  } else {
    scores += counts * bowamt;
  }

  let counts2 = parseInt(count["images/Picture2.svg"]);
  if (counts2 == 0 || counts2 == 1 || isNaN(counts2)) {
    counts2 = 0;
  } else {
    scores += counts2 * ballamt;
  }

  let counts3 = parseInt(count["images/Picture3.svg"]);
  if (counts3 == 0 || counts3 == 1 || isNaN(counts3)) {
    counts3 = 0;
  } else {
    scores += counts3 * clockamt;
  }

  let counts4 = parseInt(count["images/Picture4.svg"]);
  if (isNaN(counts4)) {
    counts4 = 0;
  } else {
    scores += counts4 * appleamt;
  }

  let counts5 = parseInt(count["images/Picture5.svg"]);
  if (counts5 == 0 || counts5 == 1 || isNaN(counts5)) {
    counts5 = 0;
  } else {
    scores += counts5 * umbamt;
  }

  let counts6 = parseInt(count["images/Picture6.svg"]);
  if (counts6 == 0 || counts6 == 1 || isNaN(counts6)) {
    counts6 = 0;
  } else {
    scores += counts6 * temamt;
  }

  console.log(counts);
  console.log(counts2);

  console.log(scores);
  return hand;
}
$(document).ready(() => {
  if (typeof Storage !== "undefined") {
    // Retrieve the saved score from local storage
    if (scores == 0 || scores < 0) {
      $("#gamestatus").text("game over please press reset to play again");
    }

    if (scores !== null) {
      scores = parseInt(localStorage.getItem("score"));
      // Update the score display with the saved score
      $("#score").text("Cash:$" + scores);
    } else {
      scores = 500;
      localStorage.setItem("score", scores);
      $("#score").text("Cash:$" + scores);
    }
  }

  $("#switch").click(() => {
    //toogle
    if ($("#switch h3").text() === "Roll dice") {
      bowamt = parseInt($("#bow").val());
      ballamt = parseInt($("#ball").val());
      clockamt = parseInt($("#clock").val());
      appleamt = parseInt($("#apple").val());
      umbamt = parseInt($("#umb").val());
      temamt = parseInt($("#tem").val());
      jakamt = parseInt($("#jackpot").val());
      totalbet =
        bowamt + ballamt + clockamt + appleamt + umbamt + temamt + jakamt;
      //checking validity of betting amount
      if (
        isNaN(bowamt) ||
        isNaN(ballamt) ||
        isNaN(clockamt) ||
        isNaN(appleamt) ||
        isNaN(umbamt) ||
        isNaN(temamt) ||
        isNaN(jakamt)
      ) {
        alert("Please Enter Only Numbers");
        bowamt = ballamt = clockamt = appleamt = umbamt = temamt = jakamt = 0;
        location.reload();
      }
      if (totalbet > scores) {
        alert("Bet Amount must be less than Cash-in-Hand, Please Re-Enter");
        bowamt = ballamt = clockamt = appleamt = umbamt = temamt = jakamt = 0;
        location.reload();
      }
      if (jakamt < 0 || jakamt > scores || jakamt > 500) {
        alert("You Entered Invalid Jackpot or Bet Amount, Please Re-Enter");
        jakamt = 0;
        location.reload();
      }

      if (bowamt < 0 || bowamt > scores || bowamt > 10) {
        alert("You Entered Invalid Jackpot or Bet Amount, Please Re-Enter");
        bowamt = 0;
        location.reload();
      }
      if (ballamt < 0 || ballamt > scores || ballamt > 10) {
        alert("You Entered Invalid Jackpot or Bet Amount, Please Re-Enter");
        ballamt = 0;
        location.reload();
      }
      if (clockamt < 0 || clockamt > scores || clockamt > 10) {
        alert("You Entered Invalid Jackpot or Bet Amount, Please Re-Enter");
        clockamt = 0;
        location.reload();
      }
      if (appleamt < 0 || appleamt > scores || appleamt > 10) {
        alert("You Entered Invalid Jackpot or Bet Amount, Please Re-Enter");
        appleamt = 0;
        location.reload();
      }
      if (umbamt < 0 || umbamt > scores || umbamt > 10) {
        alert("You Entered Invalid Jackpot or Bet Amount, Please Re-Enter");
        umbamt = 0;
        location.reload();
      }
      if (temamt < 0 || temamt > scores || temamt > 10) {
        alert("You Entered Invalid Jackpot or Bet Amount, Please Re-Enter");
        temamt = 0;
        location.reload();
      }
      if (
        (jakamt > 0 && bowamt > 0) ||
        (jakamt > 0 && ballamt > 0) ||
        (jakamt > 0 && clockamt > 0) ||
        (jakamt > 0 && appleamt > 0) ||
        (jakamt > 0 && umbamt > 0) ||
        (jakamt > 0 && temamt > 0)
      ) {
        alert("You Entered Invalid Jackpot or Bet Amount, Please Re-Enter");
        location.reload();
      }
      scores =
        scores -
        bowamt -
        ballamt -
        clockamt -
        appleamt -
        umbamt -
        temamt -
        jakamt;
      console.log(bowamt);
      let deck = generateRandomDigits();
      console.log(deck);

      console.log("Your hand is:", deck);
      console.log("Your hand evaluation is:", evaluateHand(deck));

      localStorage.setItem("score", scores);

      draw(deck);
      playSound();
      $("#score").text("Cash:$" + scores);
      $("#switch h3").text("Next Game");
    } else {
      for (let i = 1; i <= 6; i++) {
        const img = document.getElementById("dice" + i);

        img.src = "images/Picture7.svg";
      }
      var elem = document.getElementById("gif");
      if (!elem.classList.contains("hidden")) {
        elem.classList.add("hidden");
      }
      $("#gamestatus").text("");
      var inputElements = document.getElementsByClassName("bet_amount");
      for (var i = 0; i < inputElements.length; i++) {
        inputElements[i].value = "0";
      }
      removerclass();
      $("#switch h3").text("Roll dice");
    }
  });
  $("#reset").click(() => {
    $("#gamestatus").text("");
    localStorage.removeItem("score");

    location.reload();
  });
});
