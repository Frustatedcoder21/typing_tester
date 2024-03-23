const arr = [
    "The old bookstore nestled quietly on the corner, its shelves lined with dusty tomes and forgotten stories waiting to be discovered by curious souls seeking adventure in the pages of time.",
    "Beneath the canopy of stars, the night whispered secrets to those who dared to listen, weaving tales of love and loss, of dreams and destiny, into the fabric of the universe.",
    "Lost in the labyrinth of thoughts, she searched for fragments of truth amidst the chaos of her mind, piecing together memories like shards of glass reflecting the fractured mosaic of her past.",
    "With each passing moment, the world outside seemed to fade away, as if time itself had slowed to a standstill, leaving her suspended in a moment of pure, unadulterated bliss.",
    "In the garden of dreams, where flowers bloom in shades of moonlight and laughter dances on the breeze, she wandered aimlessly, intoxicated by the scent of possibility and the promise of tomorrow.",
    "Underneath the watchful gaze of the moon, the ocean whispered secrets to the shore, its waves carrying stories of love and longing, of heartache and hope, across the vast expanse of time.",
    "Amidst the chaos of the city streets, where life unfolded in a symphony of sound and motion, she found solace in the quiet corners of her mind, where dreams took flight and worries melted away.",
    "With a heart full of courage and a spirit unbroken, he faced the challenges of tomorrow with unwavering resolve, knowing that with each obstacle overcome, he grew stronger and more resilient.",
    "From the ashes of despair, she rose like a phoenix, her spirit ablaze with determination and her eyes shining with the light of a thousand suns, ready to conquer the world with the fire of her passion.",
    "In the twilight hours, when the world was bathed in shadows and the stars whispered secrets to the night, she stood on the threshold of possibility, ready to embrace the unknown with open arms."
];

let second = 60;
const timerDisplay = document.querySelector(".timer");
let interval; // Declare interval variable outside of the function
const sampleBox = document.querySelector(".text");
const writingBox = document.querySelector(".write");
const resetButton = document.querySelector(".reset");
let displayWpm = document.querySelector('#display_wpm');
let game_active = false;
const mismatchSound = new Audio('mismatch_sound.mp3'); // Adjust the file path accordingly
const successSound = new Audio('success_sound.mp3'); // Adjust the file path accordingly

function check(val) {
    const textContainer = document.querySelector('.text');
    textContainer.innerHTML = ''; // Clear previous content
    const sentenceLength = val.length;
    let charactersTyped = 0;
    let wordsTyped = 0;
    let startTime = 0;
    let endTime = 0;

    for (let i = 0; i < sentenceLength; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = val[i];
        textContainer.appendChild(charSpan);
    }

    function countdown() {
        second--;
        timerDisplay.innerHTML = (second < 10 ? "0" + second : second);
    }

    writingBox.addEventListener('input', function(event) {
        if (!game_active) {
            game_active = true;
            interval = setInterval(countdown, 1000);
            startTime = Date.now();
        }

        const inputValue = event.target.value;
        charactersTyped = inputValue.length;
        wordsTyped = inputValue.trim().split(/\s+/).length;

        for (let i = 0; i < sentenceLength; i++) {
            const charSpan = textContainer.children[i];

            if (i < charactersTyped) {
                if (inputValue[i] === val[i]) {
                    charSpan.style.color = 'green';
                } else {
                    charSpan.style.color = 'red';
                    mismatchSound.play(); // Play the sound if there's a mismatch
                }
            } else {
                charSpan.style.color = '';
            }
        }

        if (charactersTyped === sentenceLength) {
            clearInterval(interval);
            endTime = Date.now();
            displayWpm.value = Math.round((wordsTyped / ((endTime - startTime) / 60000)));
            game_active = false;
            successSound.play(); // Play success sound
        }
    });
}

function randomText() {
    const rand = Math.floor(Math.random() * 10);
    sampleBox.textContent = arr[rand];
    writingBox.value = "";
    clearInterval(interval); // Clear the interval before starting a new one
    second = 60;
    timerDisplay.innerHTML = "60";
    check(arr[rand]);
}

resetButton.addEventListener('click', randomText);

// Initial call to set up the sample text and typing validation
randomText();
