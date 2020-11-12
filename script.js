const rideTheBusApp = {};

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
            scrollTop: $(sectionNum).offset().top
        }, 800)
}; 

// function to randomize card 
rideTheBusApp.randomizer = (optionArray) => {
    randomChoice = Math.floor(Math.random() * optionArray.length);
    return optionArray[randomChoice];
};

// function for when a button is clicked
rideTheBusApp.buttonClickFunc = function() {
    userClickedButton = $(this).text();
    newValue = rideTheBusApp.randomizer(rideTheBusApp.cardValues);
    newSuit = rideTheBusApp.randomizer(rideTheBusApp.cardSuits);
    newCardLink = String("./assets/" + newValue + newSuit + ".png");
   
    // reformatting aces/jacks/queens/kings to numbers
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
    gameSection = $(this).closest("section").attr("class");

    // conditionals to dictate which game user is currently playing
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
    gameOneValue = newValue;
    nextGameSection = ".sectionGameTwo";

    if ((newSuit === "H" || newSuit === "D") & userClickedButton === "Red") {
        $(nextGameSection).css("display", "flex");
        rideTheBusApp.scrollTo(nextGameSection);

    } else if ((newSuit === "C" || newSuit === "S") & userClickedButton === "Black") {
        $(nextGameSection).css("display", "flex");
        rideTheBusApp.scrollTo(nextGameSection);
    };
}

// function for game two
rideTheBusApp.gameTwo = () => {
    gameTwoValue = newValue;
    nextGameSection = ".sectionGameThree";

    if ((gameOneValue < gameTwoValue) & userClickedButton === "Higher") {
        $(nextGameSection).css("display", "flex");
        rideTheBusApp.scrollTo(nextGameSection);
    } else if ((gameOneValue > gameTwoValue) & userClickedButton === "Lower") {
        $(nextGameSection).css("display", "flex");
        rideTheBusApp.scrollTo(nextGameSection);
    } else {
        alert("Sorry you lost! Try again.");
        rideTheBusApp.backToStart();
    }; 
}

// function for game three
rideTheBusApp.gameThree = () => {
    gameThreeValue = newValue;
    nextGameSection = ".sectionGameFour";

    if ((
        ((gameOneValue < gameThreeValue) &&
            (gameTwoValue > gameThreeValue))
        ||
        ((gameOneValue > gameThreeValue) &&
            (gameTwoValue < gameThreeValue))
    ) & userClickedButton === "In-Between") {
        $(nextGameSection).css("display", "flex");
        rideTheBusApp.scrollTo(nextGameSection);
    } else if ((
        ((gameOneValue > gameThreeValue) &&
            (gameTwoValue > gameThreeValue))
        ||
        ((gameOneValue < gameThreeValue) &&
            (gameTwoValue < gameThreeValue))
    ) & userClickedButton === "Outside") {
        $(nextGameSection).css("display", "flex");
        rideTheBusApp.scrollTo(nextGameSection);
    } else {
        alert("Sorry you lost! Try again.");
        rideTheBusApp.backToStart();
    };
};

rideTheBusApp.gameFour = () => {
    const winningMsg = "Congratulations you won!! Woo!";
    if (newSuit === "H" & userClickedButton === "Heart") {
        alert(winningMsg);
    } else if (newSuit === "S" & userClickedButton === "Spade") {
        alert(winningMsg);
    } else if (newSuit === "D" & userClickedButton === "Diamond") {
        alert(winningMsg);
    } else if (newSuit === "C" & userClickedButton === "Club") {
        alert(winningMsg);
    } else {
        alert("Sorry you lost! Try again.");
        rideTheBusApp.backToStart();
    }
}

rideTheBusApp.backToStart = () => {
    rideTheBusApp.resetCards();
    rideTheBusApp.scrollTo(".sectionGameOne");
    rideTheBusApp.turnOffSections();
}

rideTheBusApp.resetCards = () => {
    $(".mainMovingCard").attr("src", "./assets/backOfCard.png");
}

rideTheBusApp.turnOffSections = () => {
    $(".sectionGameTwo").css("display", "none");
    $(".sectionGameThree").css("display", "none");
    $(".sectionGameFour").css("display", "none");
}

// initalizing function
rideTheBusApp.init = () => {
    $(".cardButton").on("click", rideTheBusApp.buttonClickFunc);
}

// check to make sure document is ready and run init function
$(function() {
    rideTheBusApp.init();
});




/*
// Pseudo Code
// Landing page with the heading "Ride the Bus Card Game", a quick explanation of how the game works, a card face down & two buttons required for the first part of the game


// FOR ALL GAMES
    // Games (asides from game 1) are laid out on a section which has a default display of none and are turned on when correct button is clicked
    // When clicked compare button value to card drawn
    // If correct button pressed, store card value & congratulate user and move them to next game
    // If incorrect button pressed, send them back to landing page to play again

// Game 1 - Red or Black
    // First game is played on the landing page with two buttons (one labeled red and one labeled black)
    // Buttons are waiting to be clicked, when clicked display random card from deck where the face down card is located

// Game 2 - Higher or Lower
    // Layout of game 2 has card from Game 1 is displayed on left hand side of screen with another face down card in the middle of the screen
    // Game involves user guessing if card will be higher (button 1) or lower (button 2) in value to that of Game"s 1 card
        // Compare stored card value of game 1 and see if card value is higher or lower

// Game 3 - In Between or Outside
    // Layout for game 3 has card from game 1 displayed on left hand side, card from game 2 displayed on right hand side with titles above "Game #x Card", and another card face down in middle of screen
    // Game involves user guessing if middle card will be in between (buttone 1) or outside (button 2) of game 1 and game 2 card
        // Compare stored card value of game 1 and game 2 and see if game 3 card value is in between or outside

// Game 4 - Which Suit
    // Layout for game 4 looks like game 1, just one card face down in center of page
    // Game involves user guessing what suit the card will be
        // Four buttons for each suit


*/
