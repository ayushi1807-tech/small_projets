const typingText = document.querySelector(".typing-text"),
      paragraph = document.querySelector(".typing-text p"),
      mistakeTag = document.querySelector(".mistake span"),
      timeTag = document.querySelector(".time span b"),
      wpmTag = document.querySelector(".wpm span"),
      cpmTag = document.querySelector(".cpm span"),
      tryAgainBtn = document.querySelector(".try-again");

let timer, maxTime = 60, timeLeft = maxTime;
let charIndex = 0, mistakes = 0, isTyping = false;

// Sample paragraphs


// Function to load a random paragraph
function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    paragraph.innerHTML = ""; // Clear existing content
    paragraphs[randIndex].split("").forEach(char => {
        let spanTag = `<span>${char}</span>`;
        paragraph.innerHTML += spanTag;
    });

    charIndex = 0;
    mistakes = 0;
    timeLeft = maxTime;
    isTyping = false;

    mistakeTag.innerText = mistakes;
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;

    clearInterval(timer);

    // Auto-focus to start typing immediately
    typingText.focus();
}

// Function to handle typing input
function initTyping(e) {
    const characters = paragraph.querySelectorAll("span");
    let typedChar = e.key;

    if (typedChar.length === 1 && !e.ctrlKey && !e.metaKey) { // Ensure valid input
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (charIndex < characters.length) {
            if (typedChar === characters[charIndex].innerText) {
                characters[charIndex].classList.add("correct");
            } else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }
    } else if (e.key === "Backspace" && charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
            mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
    }

    characters.forEach(span => span.classList.remove("active"));
    if (charIndex < characters.length) {
        characters[charIndex].classList.add("active");
    }

    mistakeTag.innerText = mistakes;
    updateWPM();
}

// Function to update WPM & CPM
function updateWPM() {
    let correctChars = charIndex - mistakes;
    let wpm = Math.round((correctChars / 5) / ((maxTime - timeLeft) / 60));
    let cpm = correctChars;
    
    wpmTag.innerText = wpm > 0 ? wpm : 0;
    cpmTag.innerText = cpm > 0 ? cpm : 0;
}

// Function to handle timer
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        updateWPM();
    } else {
        clearInterval(timer);
    }
}

// Try Again button resets everything
tryAgainBtn.addEventListener("click", () => {
    randomParagraph();
});

// Load a new paragraph on page load
randomParagraph();

// Ensure typing starts when page loads
typingText.addEventListener("click", () => typingText.focus());
document.addEventListener("keydown", initTyping);
