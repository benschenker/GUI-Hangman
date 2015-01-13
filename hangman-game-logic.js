(function() {
    'use strict';
    /////////////////////////////////////////////////
    // Variable declaration
    /////////////////////////////////////////////////
    var phrase, setPhrase, guess, charactersGuessed, displayCurrent;

    /////////////////////////////////////////////////
    // Variable initialization
    /////////////////////////////////////////////////
    setPhrase = function(text) {
        if(phrase){
            return false;
        } else {
            phrase = text.replace(/[^A-Za-z ]+/g, '').toUpperCase();
            return true;
        }
    };

    charactersGuessed = [];

    guess = function(character) {
        if(character) {
            charactersGuessed.push(character.toUpperCase());
        }
        return displayCurrent();
    };

    displayCurrent = function() {
        var displayedPhrase, unknownLettersRemaining, numIncorrect;
        /////////////////////////////////////////////////
        unknownLettersRemaining = 0;
        numIncorrect = 0;

        displayedPhrase = window.hangman.util.forEachLetter(phrase, function(character) {
            if(character === " ") {
                return character;
            } else if (window.hangman.util.contains(charactersGuessed, character)) {
                return character;
            } else {
                unknownLettersRemaining = unknownLettersRemaining + 1;
                return "-";
            }
        });
        window.hangman.util.forEachLetter(
            charactersGuessed.join(''), function(character) {
                if (phrase.indexOf(character)===-1) {
                    numIncorrect++;
                }
        });
        /////////////////////////////////////////////////
        console.log("Currently:", displayedPhrase);
        console.log("So far you've guessed ", charactersGuessed);

        if(unknownLettersRemaining === 0) {
            console.log("You win!");
            window.hangman.util.cornifyTimes(4);
        }
        return {
            secretState: displayedPhrase,
            numIncorrect: numIncorrect
        };
    };

    /////////////////////////////////////////////////
    // Do Stuff
    /////////////////////////////////////////////////
    console.log("Welcome to hangman! There is a secret phrase");
    console.log("Commands you can use: guess('a')");

    // displayCurrent();

    /////////////////////////////////////////////////
    // Export variables
    /////////////////////////////////////////////////
    window.hangman.logic = {
        /*
        guess
            Inputs
                character - a character that is to be guessed to be part of the phrase
            Outputs
                {
                    secretState - a string showing the phrase, only revealing
                                characters that have been guessed
                    numIncorrect - the number of incorrect guesses so far
                }
        */
        guess: guess,
        /*
        setPhrase
            Inputs
                text - a string that the secret phrase is set to
            Outputs
                true if successful
                false if phrase has already been set
        */
        setPhrase: setPhrase
    };
})();