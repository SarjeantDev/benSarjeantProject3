// RIDE THE BUS GAME
// BEN SARJEANT - PROJECT 3 @ JUNO COLLEGE
// defining namesapce
const rideTheBusApp = {};

// global variables
rideTheBusApp.cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]
rideTheBusApp.cardSuits = ["H", "S", "C", "D"];
rideTheBusApp.gameOneValue = 0;
rideTheBusApp.gameTwoValue = 0;
rideTheBusApp.gameThreeValue = 0;
rideTheBusApp.userClickedButton = "";
rideTheBusApp.newValue = "";
rideTheBusApp.newSuit = "";
rideTheBusApp.newCardLink = "";
rideTheBusApp.gameSection = "";
rideTheBusApp.nextGameSection = "";

// function to scroll to new section when won
rideTheBusApp.scrollTo = (sectionNum) => {
    $("body,html").animate({
        scrollTop: $(`${sectionNum}`).offset().top
    }, 2000)
};

// function to randomize card 
rideTheBusApp.randomizer = (optionArray) => {
    randomChoice = Math.floor(Math.random() * optionArray.length);
    return optionArray[randomChoice];
};


// function to listen for a clicked button and execute the game function
rideTheBusApp.buttonClick = function () {
    userClickedButton = $(this).text();

    // calling randomizing function to get a random card value and card suit
    newValue = rideTheBusApp.randomizer(rideTheBusApp.cardValues);
    newSuit = rideTheBusApp.randomizer(rideTheBusApp.cardSuits);

    // combining both the new value and new suit returned from randomizer function to create a card source, folder with a full deck of cards is stored in assets 
    newCardLink = String("./assets/" + newValue + newSuit + ".png");

    // switch statement to reformat aces/jacks/queens/kings to numbers in order to guage higher/lower & in-between/outside values
    switch (newValue) {
        case "J":
            newValue = 11;
            break;
        case "Q":
            newValue = 12;
            break;
        case "K":
            newValue = 13;
            break;
        case "A":
            newValue = 14;
            break;
    }    

    // finding the parent section of button thats being pressed
    // ex: returns gameSectionOne/gameSectionTwo/gameSectionThree
    gameSection = $(this).closest("section").attr("class");

    // switch statement to dictate which game user is currently playing and execute that function while updating card visuals
    switch (gameSection) {
        case "sectionGameOne":
            rideTheBusApp.updateMainCard();
            $(".gOneCard").attr("src", newCardLink);
            rideTheBusApp.gameOne();
            break;
        case "sectionGameTwo":
            rideTheBusApp.updateMainCard();
            $(".gTwoCard").attr("src", newCardLink);
            rideTheBusApp.gameTwo();
            break;
        case "sectionGameThree":
            rideTheBusApp.updateMainCard();
            rideTheBusApp.gameThree();
            break;
        case "sectionGameFour":
            rideTheBusApp.updateMainCard();
            rideTheBusApp.gameFour();
            break;
    }
 }
 // end of buttonClicked func 


// function for game one
rideTheBusApp.gameOne = () => {
    // storing game one value in variable to be used in next game
    gameOneValue = newValue;
    nextGameSection = ".sectionGameTwo";

    // if suit is a heart or diamond and user selected the red button
    if ((newSuit === "H" || newSuit === "D") & userClickedButton === "Red") {
        rideTheBusApp.winnerWinner();
    } else if ((newSuit === "C" || newSuit === "S") & userClickedButton === "Black") {
        rideTheBusApp.winnerWinner();
    };
}
// end of game one func


// function for game two
rideTheBusApp.gameTwo = () => {
    gameTwoValue = newValue;
    nextGameSection = ".sectionGameThree";

    if ((gameOneValue < gameTwoValue) & userClickedButton === "Higher") {
        rideTheBusApp.winnerWinner();
    } else if ((gameOneValue > gameTwoValue) & userClickedButton === "Lower") {
        rideTheBusApp.winnerWinner();
    } else {
        alert("Sorry you lost! Try again.");
        rideTheBusApp.loserLoser();
    }; 
}
// end of game two func


// function for game three (is the value in between or outside)
rideTheBusApp.gameThree = () => {
    gameThreeValue = newValue;
    nextGameSection = ".sectionGameFour";

    // create new array to store each game value
    letNewGameArray = [gameOneValue, gameTwoValue, gameThreeValue];
    // sort new array in ascending order 
    letNewGameArray.sort((a, b) => a - b);

    // first conditional checking that game three value doesn't equal game one or game two (user loses)
    if ((gameOneValue == gameThreeValue) || (gameTwoValue == gameThreeValue)) {
        alert("Sorry you lost! Try again.");
        rideTheBusApp.loserLoser();

    // second conditional checking if game three value is in the middle of the the new array and user has pressed correct button (user wins)
    } else if 
        (letNewGameArray.indexOf(gameThreeValue) == 1 & 
        userClickedButton === "In-Between") {
        rideTheBusApp.winnerWinner();

    // third conditional checking if game three value is of the the new array and user has pressed correct button 
    } else if 
        (((letNewGameArray.indexOf(gameThreeValue) == 0) || (letNewGameArray.indexOf(gameThreeValue) == 2)) & 
        userClickedButton === "Outside") {
        rideTheBusApp.winnerWinner();
    
    // last conditional to catch every other option
    } else {
        alert("Sorry you lost! Try again.");
        rideTheBusApp.loserLoser();
    };
};


// function for game four (guess the suit)
rideTheBusApp.gameFour = () => {
    const winningMsg = "Congratulations you won!! Woo!";
    if (newSuit === "H" & userClickedButton === "Heart") {
        rideTheBusApp.disableButtons();
        alert(winningMsg);
        rideTheBusApp.showPlayAgainButton();
    } else if (newSuit === "S" & userClickedButton === "Spade") {
        rideTheBusApp.disableButtons();
        alert(winningMsg);
        rideTheBusApp.showPlayAgainButton();
    } else if (newSuit === "D" & userClickedButton === "Diamond") {
        rideTheBusApp.disableButtons();
        alert(winningMsg);
        rideTheBusApp.showPlayAgainButton();
    } else if (newSuit === "C" & userClickedButton === "Club") {
        rideTheBusApp.disableButtons();
        alert(winningMsg);
        rideTheBusApp.showPlayAgainButton();
    } else {
        alert("Sorry you lost! Try again.");
        rideTheBusApp.loserLoser();
    }
}


// function to update main card 
rideTheBusApp.updateMainCard = () => {
    $(`.${gameSection} .mainMovingCard`).attr("src", newCardLink);
}


// function to show play again button
rideTheBusApp.showPlayAgainButton = () => {
    $('.cardButtonPlayAgain').css("display", "block");
    $('.cardButtonPlayAgain').prop("disabled", false);
    rideTheBusApp.playAgain();
}


// function to fire losing function when play again is selected
rideTheBusApp.playAgain = () => {
    $('.cardButtonPlayAgain').on("click", rideTheBusApp.loserLoser);
    
}


// function to turn off play again button fater being clicked, included in loserLoser function
rideTheBusApp.turnOffPlayAgain = () => {
    $(".cardButtonPlayAgain").css("display", "none");
}


// function to reset all cards when user loses
rideTheBusApp.resetCards = () => {
    $(".mainMovingCard").attr("src", "./assets/backOfCard.png");
    $(".gOneCard").attr("src", "./assets/backOfCard.png");
    $(".gTwoCard").attr("src", "./assets/backOfCard.png");
}


// function to make all sections dissappear when user losers
rideTheBusApp.turnOffSections = () => {
    $(".sectionGameTwo").css("display", "none");
    $(".sectionGameThree").css("display", "none");
    $(".sectionGameFour").css("display", "none");
}


// function to disable button within game section
// this is to make sure user cant play the same game twice if they have won
rideTheBusApp.disableButtons = () => {
    $(`.${gameSection} .cardButton`).prop("disabled", true);
}



// function to enable all buttons
rideTheBusApp.enableButtons = () => {
    $(".cardButton").prop("disabled", false);
}


// function when user LOSES to send user back to beginning 
rideTheBusApp.loserLoser = () => {
    rideTheBusApp.resetCards();
    rideTheBusApp.turnOffSections();
    rideTheBusApp.scrollTo(".sectionGameOne");
    rideTheBusApp.enableButtons();
    rideTheBusApp.turnOffPlayAgain();
}


// function when user WINS (yay) to send user to next section
rideTheBusApp.winnerWinner = () => {
    // calling disableButton function so user cannot click again if won
    rideTheBusApp.disableButtons();
    // change section from display:none to display:flex 
    $(nextGameSection).css("display", "flex");
    // calling scrollTo function to move to next section
    rideTheBusApp.scrollTo(nextGameSection);
}

// listening for clicked button to execute the button clicked function
rideTheBusApp.buttonListener = () => {
    $(".cardButton").on("click", rideTheBusApp.buttonClick);
}


// initalizing function 
rideTheBusApp.init = () => {
    rideTheBusApp.buttonListener();
}


// check to make sure document is ready and run init function
$(function () {
    rideTheBusApp.init();
});