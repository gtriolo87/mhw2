/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

/* Revisione 1: codice modificato senza l'uso di variabili globali */

const IMG_CHECKED = 'images/checked.png';
const IMG_UNCHECKED = 'images/unchecked.png';

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
    const allChoices = document.querySelectorAll('.choice-grid div');

    for (const singleChoice of allChoices) {
        cleanChoice(singleChoice);
    }

    resultView.classList.add('hidden');
}

/* Funzione controllo e definizione risultato */
function checkResult(choiceChecked) {
    const resultTitle = document.querySelector('#result-title');
    const resultContent = document.querySelector('#result-content');
    let winnerChoice;

    if ((choiceChecked[0].dataset.choiceId === choiceChecked[1].dataset.choiceId) || (choiceChecked[0].dataset.choiceId === choiceChecked[2].dataset.choiceId)) {
        console.log('Vittoria 1 con: ' + choiceChecked[0].dataset.choiceId);
        winnerChoice = choiceChecked[0];
    } else if (choiceChecked[1].dataset.choiceId === choiceChecked[2].dataset.choiceId) {
        console.log('Vittoria 2 con: ' + choiceChecked[1].dataset.choiceId);
        winnerChoice = choiceChecked[1];
    } else {
        console.log('Vince 1 perchè tutti diversi: ' + choiceChecked[0].dataset.choiceId);
        winnerChoice = choiceChecked[0];
    }
    resultTitle.textContent = RESULTS_MAP[winnerChoice.dataset.choiceId].title;
    resultContent.textContent = RESULTS_MAP[winnerChoice.dataset.choiceId].contents;
}

/* funzione di gestione click della scelta */
function checkChoice(event) {
    const choice = event.currentTarget;
    const oldChoice = document.querySelector('.choice-grid div[data-question-id=' + choice.dataset.questionId + '].checked');

    if (!oldChoice) {
        const questionChoices = document.querySelectorAll('.choice-grid div[data-question-id=' + choice.dataset.questionId + ']');
        for (const otherChoice of questionChoices) {
            otherChoice.classList.add('unchecked');
        }
    } else {
        cleanChoice(oldChoice);
        oldChoice.classList.add('unchecked');
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
    const choiceChecked = document.querySelectorAll('.choice-grid div.checked');
    if (choiceChecked.length === 3) {
        const allChoices = document.querySelectorAll('.choice-grid div');
        for (const singleChoice of allChoices) {
            singleChoice.removeEventListener('click', checkChoice);
        }
        const resultView = document.querySelector('#result-view');
        resultView.classList.remove('hidden');
        checkResult(choiceChecked);
    }
}


/* alla prima esecuzione mi mappo degli array con tutti gli id delle possibili risposte per ogni domanda*/
const choices = document.querySelectorAll('.choice-grid div');
for (const choice of choices) {
    choice.addEventListener('click', checkChoice);
}


const restart = document.querySelector('#result-view button');
restart.addEventListener('click', cleanQuiz);
