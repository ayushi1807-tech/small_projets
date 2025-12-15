const quotes = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "You miss 100% of the shots you don't take.",
  "Don't watch the clock; do what it does. Keep going.",
  "The best way to predict the future is to invent it.",
  "Do what you can, with what you have, where you are.",
  "Act as if what you do makes a difference. It does.",
  "In the middle of every difficulty lies opportunity.",
  "You only live once, but if you do it right, once is enough.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "It always seems impossible until it is done.",
  "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The key to success is to focus on goals, not obstacles.",
  "Believe in yourself and all that you are.",
  "The only place where success comes before work is in the dictionary.",
  "Courage is not having the strength to go on; it is going on when you don't have the strength.",
  "Difficulties in life are intended to make us better, not bitter.",
  "Everything you’ve ever wanted is on the other side of fear.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Start where you are. Use what you have. Do what you can.",
  "Do not wait to strike till the iron is hot, but make it hot by striking.",
  "Fall seven times, stand up eight.",
  "Only I can change my life. No one can do it for me.",
  "Perseverance is not a long race; it is many short races one after the other.",
  "Turn your wounds into wisdom.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Knowing yourself is the beginning of all wisdom.",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
  "The journey of a thousand miles begins with one step.",
  "A wise man can learn more from a foolish question than a fool can learn from a wise answer.",
  "Your time is limited, don't waste it living someone else's life.",
  "Wisdom begins in wonder.",
  "The best way to find yourself is to lose yourself in the service of others.",
  "When the student is ready, the teacher will appear.",
];

const usedIndes= new Set();
const quoteElement = document.getElementById("quote")


function generateQuote(){

    if(usedIndes.size >= quotes.length){
        usedIndes.clear();
    }

    while(true){
        const randIndex = Math.floor(Math.random() * quotes.length)


        if(
            usedIndes.has(randIndex) 
        ) continue
        const quote = quotes[randIndex]
        quoteElement.innerHTML = quote;
        break;
    }
   
}