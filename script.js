const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
const cardSuits = ['H', 'S', 'C', 'D'];
let userScore = 0;


// check to make sure document is ready
$(function() {
    console.log("the doc is alive");

    // function to scroll to new section when won
    const scrollTo = (sectionNum) => {
        $(sectionNum).css('display', 'flex');
        $("body,html").animate(
            {
                scrollTop: $(sectionNum).offset().top
            },
            800
        )}; 

    
    // function to randomize card 
    const randomizer = (optionArray) => {
        randomChoice = Math.floor(Math.random() * optionArray.length);
        return optionArray[randomChoice];
    };


    $('.cardButton').on('click', function () {

            const userClickedButton = $(this).text();
            console.log(userClickedButton);

            const newValue = randomizer(cardValues);
            const newSuit = randomizer(cardSuits);

            const newCardLink = String('./assets/' + newValue + newSuit + '.png');

            console.log

            $('header .mainMovingCard').attr('src', newCardLink);
            

            if ((newSuit === 'H' || newSuit === 'D') & userClickedButton === "Red") {
                alert("Congrats!");
                scrollTo('.sectionGameTwo');
                
            } else if ((newSuit === 'C' || newSuit === 'S') & userClickedButton === "Black") {
                alert("Congrats!");
                scrollTo('.sectionGameTwo');
            };




        });


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
    // Game involves user guessing if card will be higher (button 1) or lower (button 2) in value to that of Game's 1 card
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
