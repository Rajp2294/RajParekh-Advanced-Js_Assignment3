// Time Limit
let timeLimit = 60;

// para text to be used
let para_arr = [
    "The journey of a thousand miles begins with one step.",
    "If you're going through hell, keep going.",
    "Push yourself, because no one else is going to do it for you.",
    "Talent can't beat hardwork!"
];

// element selection
let timer_text = document.querySelector(".current-time");
let accuracy_text = document.querySelector(".current-accuracy");
let error_text = document.querySelector(".current-errors");
let cpm_text = document.querySelector(".current-cpm");
let wpm_text = document.querySelector(".current-wpm");
let quote_text = document.querySelector(".instruction");
let input_area = document.querySelector(".input_text");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = timeLimit;
let timeElapsed = 0;
let totalErrors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
    quote_text.textContent = null;
    current_quote = para_arr[quoteNo];

    // separate each character and make an element   
    // to individually style them
    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

    // accessing the first para
    if (quoteNo < para_arr.length - 1)
        quoteNo++;
    else
        quoteNo = 0;
}

function analyzeText() {
    // get current input and split
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    // increment characters typed
    characterTyped++;
    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index]

        // character typed incorrectly
        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

            // correct character
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');

            // incorrect character
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');

            // increase errors
            errors++;
        }
    });

    // display number of errors
    error_text.textContent = totalErrors + errors;

    // update accuracy 
    let correctCharacters = (characterTyped - (totalErrors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

    // if current text is completely typed 
    // irrespective of errors
    if (curr_input.length == current_quote.length) {
        updateQuote();

        // update total errors
        totalErrors += errors;

        // clear the input area
        input_area.value = "";
    }
}

function startCheck() {

    resetValues();
    updateQuote();

    // start new timer and clear old
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function resetValues() {
    timeLeft = timeLimit;
    timeElapsed = 0;
    errors = 0;
    totalErrors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}

function updateTimer() {
    if (timeLeft > 0) {
        // decrease current time left
        timeLeft--;

        // increase time elapsed
        timeElapsed++;

        // update timer text
        timer_text.textContent = timeLeft + "s";
    } else {
        // on completion 
        finishCheck();
    }
}

function finishCheck() {
    // stop the timer
    clearInterval(timer);

    // disable the input area
    input_area.disabled = true;

    // show completion text
    quote_text.textContent = "Click on restart to start a new game.";

    // display restart button
    restart_btn.style.display = "block";

    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

    // update cpm and wpm
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    // display the cpm and wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}
