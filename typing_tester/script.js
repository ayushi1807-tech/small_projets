const typingText = document.querySelector(".typing-text p"),
      inputField = document.querySelector(".wrapper .input-field"),
      mistakeTag = document.querySelector(".mistake span"),
      timeTag = document.querySelector(".time span b"),
      wpmTag = document.querySelector(".wpm span"),
      cpmTag = document.querySelector(".cpm span"),
      tryAgainBtn = document.querySelector("button");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = 0,
    mistakes = 0,
    isTyping = false;

// Function to load a random paragraph
function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(char => {
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;
    });
    
    inputField.value = "";
    charIndex = mistakes = 0;
    timeLeft = maxTime;
    isTyping = false;
    
    mistakeTag.innerText = mistakes;
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    clearInterval(timer);
    
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

// Function to handle typing input
function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.charAt(charIndex);
    
    if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }

    if (typedChar == "") {
        if (charIndex > 0) {
            charIndex--;
            if (characters[charIndex].classList.contains("incorrect")) {
                characters[charIndex].classList.remove("incorrect");
                mistakes--;
            }
            characters[charIndex].classList.remove("correct");
        }
    } else {
        if (characters[charIndex].innerText === typedChar) {
            characters[charIndex].classList.add("correct");
        } else {
            mistakes++;
            characters[charIndex].classList.add("incorrect");
        }
        charIndex++;
    }

    characters.forEach(span => span.classList.remove("active"));
    if (charIndex < characters.length) {
        characters[charIndex].classList.add("active");
    }

    mistakeTag.innerText = mistakes;
    updateWPM();
}

// Timer function
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        updateWPM();
    } else {
        clearInterval(timer);
        inputField.disabled = true;
    }
}

// Function to calculate WPM & CPM
function updateWPM() {
    let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
    wpmTag.innerText = wpm < 0 || !wpm ? 0 : wpm;
    cpmTag.innerText = charIndex - mistakes;
}

// Try Again button functionality
tryAgainBtn.addEventListener("click", () => {
    randomParagraph();
    inputField.disabled = false;
    inputField.focus();
});

// Load a new paragraph on page load
randomParagraph();
inputField.addEventListener("input", initTyping);
