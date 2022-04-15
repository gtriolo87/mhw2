/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const IMG_CHECKED = 'images/checked.png';
const IMG_UNCHECKED = 'images/unchecked.png';

const arrayChoices1 = [];
const arrayChoices2 = [];
const arrayChoices3 = [];
let selectedChoice1 = null;
let selectedChoice2 = null;
let selectedChoice3 = null;

/* gestione pulizia scelta */
function cleanChoice(element) {
    element.classList.remove('unchecked');
    element.addEventListener('click', checkChoice);

    if (element.className === "checked") {
        element.classList.remove('checked');
        for (const child of element.childNodes) {
            if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.className === 'checkbox') {
                    child.src = IMG_UNCHECKED;
                }
            }
        }

    }
}

/* funzione di restart del quiz */
function cleanQuiz(event) {
    const resultView = event.currentTarget.parentNode;
    for (const choice of arrayChoices1) {
        cleanChoice(choice);
    }
    for (const choice of arrayChoices2) {
        cleanChoice(choice);
    }
    for (const choice of arrayChoices3) {
        cleanChoice(choice);
    }
    resultView.classList.add('hidden');
    selectedChoice1 = null;
    selectedChoice2 = null;
    selectedChoice3 = null;
}

/* Funzione controllo e definizione risultato */
function checkResult() {
    const resultTitle = document.querySelector('#result-title');
    const resultContent = document.querySelector('#result-content');
    let winnerChoice;

    if ((selectedChoice1.dataset.choiceId === selectedChoice2.dataset.choiceId) || (selectedChoice1.dataset.choiceId === selectedChoice3.dataset.choiceId)) {
        console.log('Vittoria 1 con: ' + selectedChoice1.dataset.choiceId);
        winnerChoice = selectedChoice1;
    } else if (selectedChoice2.dataset.choiceId === selectedChoice3.dataset.choiceId) {
        console.log('Vittoria 2 con: ' + selectedChoice2.dataset.choiceId);
        winnerChoice = selectedChoice2;
    } else {
        console.log('Vince 1 perchè tutti diversi: ' + selectedChoice1.dataset.choiceId);
        winnerChoice = selectedChoice1;
    }
    resultTitle.textContent = RESULTS_MAP[winnerChoice.dataset.choiceId].title;
    resultContent.textContent = RESULTS_MAP[winnerChoice.dataset.choiceId].contents;
}

/* funzione di gestione click della scelta */
function checkChoice(event) {
    const choice = event.currentTarget;
    let choiceArray;
    switch (choice.dataset.questionId) {
        case 'one':
            if (selectedChoice1) {
                cleanChoice(selectedChoice1);
            }
            choiceArray = arrayChoices1;
            selectedChoice1 = choice;
            break;
        case 'two':
            if (selectedChoice2) {
                cleanChoice(selectedChoice2);
            }
            choiceArray = arrayChoices2;
            selectedChoice2 = choice;
            break;
        case 'three':
            if (selectedChoice3) {
                cleanChoice(selectedChoice3);
            }
            choiceArray = arrayChoices3;
            selectedChoice3 = choice;
            break;
    }

    for (const actualChoice of choiceArray) {
        actualChoice.classList.add('unchecked');
    }

    choice.classList.add('checked');
    choice.classList.remove('unchecked');
    choice.removeEventListener('click', checkChoice);
    for (const child of choice.childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            if (child.className === 'checkbox') {
                child.src = IMG_CHECKED;
            }
        }
    }

    //Controllo che se tutte le selezioni sono state fatte rimuovo i click e faccio vedere il risultato
    if (selectedChoice1 && selectedChoice2 && selectedChoice3) {
        for (const choice of arrayChoices1) {
            choice.removeEventListener('click', checkChoice);
        }
        for (const choice of arrayChoices2) {
            choice.removeEventListener('click', checkChoice);
        }
        for (const choice of arrayChoices3) {
            choice.removeEventListener('click', checkChoice);
        }
        const resultView = document.querySelector('#result-view');
        resultView.classList.remove('hidden');
        checkResult();
    }
}


/* alla prima esecuzione mi mappo degli array con tutti gli id delle possibili risposte per ogni domanda*/
const choices = document.querySelectorAll('.choice-grid div');
for (const choice of choices) {
    //console.log('valore: ' + choice.dataset.choiceId + ' e '+ choice.dataset.questionId)
    switch (choice.dataset.questionId) {
        case 'one':
            arrayChoices1.push(choice);
            break;
        case 'two':
            arrayChoices2.push(choice);
            break;
        case 'three':
            arrayChoices3.push(choice);
            break;
    }
    choice.addEventListener('click', checkChoice);
}


const restart = document.querySelector('#result-view button');
restart.addEventListener('click', cleanQuiz);
