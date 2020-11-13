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


// function for when a button is clicked
rideTheBusApp.buttonClick = function () {
    userClickedButton = $(this).text();

    // calling randomizing function to get a random card value and card suit
    newValue = rideTheBusApp.randomizer(rideTheBusApp.cardValues);
    newSuit = rideTheBusApp.randomizer(rideTheBusApp.cardSuits);

    // combining both the new value and new suit returned from randomizer function to create a card source, folder with a full deck of cards is stored in assets 
    newCardLink = String("./assets/" + newValue + newSuit + ".png");

    // reformatting aces/jacks/queens/kings to numbers in order to guage higher/lower & in-between/outside values
    // change to switch / cases
    if (newValue === "J") {
        newValue = 11;
    } else if (newValue === "Q") {
        newValue = 12;
    } else if (newValue === "K") {
        newValue = 13;
    } else if (newValue === "A") {
        newValue = 14;
    }

    // finding the parent section of button thats being pressed
    // ex: returns gameSectionOne/gameSectionTwo/gameSectionThree
    gameSection = $(this).closest("section").attr("class");

    // conditionals to dictate which game user is currently playing
    // change to switch / cases
    if (gameSection === "sectionGameOne") {
        $(`.${gameSection} .mainMovingCard`).attr("src", newCardLink);
        $(".gOneCard").attr("src", newCardLink);
        rideTheBusApp.gameOne();
    } else if (gameSection === "sectionGameTwo") {
        $(`.${gameSection} .mainMovingCard`).attr("src", newCardLink);
        $(".gTwoCard").attr("src", newCardLink);
        rideTheBusApp.gameTwo();
    } else if (gameSection === "sectionGameThree") {
        $(`.${gameSection} .mainMovingCard`).attr("src", newCardLink);
        rideTheBusApp.gameThree();
    } else if (gameSection === "sectionGameFour") {
        $(`.${gameSection} .mainMovingCard`).attr("src", newCardLink);
        rideTheBusApp.gameFour();
    }
}


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


// function for game three (is the value in between or outside)
rideTheBusApp.gameThree = () => {
    gameThreeValue = newValue;
    nextGameSection = ".sectionGameFour";

    letNewGameArray = [gameOneValue, gameThreeValue, gameTwoValue];
    letNewGameArray.sort((a, b) => a - b);
    console.log(letNewGameArray);

    if 
        (letNewGameArray.indexOf(gameThreeValue) == 1 & userClickedButton === "In-Between") {
        console.log("inbetwee")
        // rideTheBusApp.winnerWinner();

    } else if 
        ((
            (letNewGameArray.indexOf(gameThreeValue) == 0) || (letNewGameArray.indexOf(gameThreeValue) == 2)
        ) 
     & userClickedButton === "Outside") {
        console.log("outisde")
        // rideTheBusApp.winnerWinner();
    }// } else {
    //     alert("Sorry you lost! Try again.");
    //     rideTheBusApp.loserLoser();
    // };
};


// function for game four (guess the suit)
rideTheBusApp.gameFour = () => {
    const winningMsg = "Congratulations you won!! Woo!";
    if (newSuit === "H" & userClickedButton === "Heart") {
        rideTheBusApp.disableButtons();
        alert(winningMsg);
    } else if (newSuit === "S" & userClickedButton === "Spade") {
        rideTheBusApp.disableButtons();
        alert(winningMsg);
    } else if (newSuit === "D" & userClickedButton === "Diamond") {
        rideTheBusApp.disableButtons();
        alert(winningMsg);
    } else if (newSuit === "C" & userClickedButton === "Club") {
        rideTheBusApp.disableButtons();
        alert(winningMsg);
    } else {
        alert("Sorry you lost! Try again.");
        rideTheBusApp.loserLoser();
    }
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



// initalizing function
rideTheBusApp.init = () => {
    $(".cardButton").on("click", rideTheBusApp.buttonClick);
}



// check to make sure document is ready and run init function
$(function () {
    rideTheBusApp.init();
});