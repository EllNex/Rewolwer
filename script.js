

const losob = document.querySelector('.osoby');
const startbtn = document.querySelector('.start');
const text = document.querySelector('.tekst');
const zakres = document.querySelector('.zakres');

let liczbauczniow = 30;
let nrodp;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getRandomSleepTime() {
    return Math.floor(Math.random() * 1001) + 800;
}



async function updateClasses(nrodp) {
    let numberElements = document.querySelectorAll("[class^='number']");
    let foundCorrect = false; // Flag to check if the correct number has been found

    for (let element of numberElements) {
        let match = element.className.match(/number(\d+)/);

        if (match) {
            let numberValue = parseInt(match[1]);

            if (numberValue === nrodp) {
                // Step 1: If this is the correct one, apply numwin and set the flag
                
                console.log("good number");
                element.classList.add("numwin");
                foundCorrect = true;
            } else if (!foundCorrect) {
                // Step 2: If correct number hasn't been found yet, add numdead with delay
                console.log("bad number");
                element.classList.add("numdead");
                await sleep(getRandomSleepTime());
            } else {
                // Step 3: If the correct number was already found, add numdead instantly
                element.classList.add("numdead");
            }
        }
    }
}



async function waitM() {
    let numbers = [];
    
    text.innerHTML = "Pora wylosować liczbę";

    for (let i = 0; i < 6; i++) {
        let randomNumber;
        
        do {
            randomNumber = Math.floor(Math.random() * liczbauczniow) + 1;
        } while (numbers.includes(randomNumber));

        numbers.push(randomNumber);

        await sleep(400);

        text.innerHTML += `<div class="number${i + 1} numerek">${randomNumber}</div>`;
    }
    nrodp = Math.floor(Math.random() * 6) + 1;

    await sleep(800);

    updateClasses(nrodp);
}

startbtn.addEventListener('click', (e)=>{
    waitM();

})

losob.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        liczbauczniow = losob.value;
        zakres.innerHTML="aktualny zakres do: "+liczbauczniow;
    }
})

    
