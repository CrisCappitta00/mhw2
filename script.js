/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
/*creo una costante globale che tiene traccia di tutte le risposte */
const risposte = document.querySelectorAll('[data-question-id]');
const check = 'images/checked.png';
const unchecked = 'images/unchecked.png';
const button = document.querySelector('button');
button.addEventListener('click', reset);
/*insieme valori tiene traccia dei choiceid per ogni questionid */
let insieme_valori = {};
/*conteggio tiene traccia del conteggio per ogni choiceid */
let conteggio = {};
/*Accedo alle risposte del file constants.js */

for (const risposta of risposte) {
    risposta.addEventListener('click', segnarisposta);
}

function segnarisposta(event) {
    const risposta = event.currentTarget;
    const questionId = risposta.dataset.questionId;
    const choice = risposta.dataset.choiceId;
    salvarisposta(questionId, choice);
    controllarisposte();
    const image = document.createElement('img');
    image.src = check;
    image.classList.add('checkbox');
    risposta.removeChild(risposta.querySelector('.checkbox'));
    risposta.appendChild(image);
    const brother_risposta = document.querySelectorAll('[data-question-id="'+ questionId+ '"]');
    for (const temp_risposta of brother_risposta) {
        if(temp_risposta.dataset.choiceId !== choice){
            temp_risposta.classList.add('transparent');
            deselezionarisposta(temp_risposta);
        }
    }
    risposta.classList.remove('transparent');
}
function deselezionarisposta(deseleziona) {
    const image = document.createElement('img');
    image.src = unchecked;
    image.classList.add('checkbox');
    deseleziona.removeChild(deseleziona.querySelector('.checkbox'));
    deseleziona.appendChild(image);
}
function salvarisposta(question_id, choice_id){
    insieme_valori[question_id] = choice_id;
}
/*Controllarisposta controlla le risposte date e se sono state date 3 risposte entra dentro l'if e comincia a contare i choiceid a cui accede tramite le chiavi*/
function controllarisposte(){
    if(Object.keys(insieme_valori).length === 3){
    for(const question_id in insieme_valori){
        const choice_id = insieme_valori[question_id];
        AddConteggio(choice_id);
    }
    disattivarisposte();
    inserelementi();
}
}
function AddConteggio(choice_id){
     if(conteggio[choice_id] === undefined){
        conteggio[choice_id] = 0;
    }
    conteggio[choice_id]++;
}

function highConteggio(){
    let max = 0;
    let risultato = null;
    for(const choice_id in conteggio){
        if(conteggio[choice_id] > max){
            max = conteggio[choice_id];
            risultato = choice_id;
        }
    }
    return risultato;
}
/*disattivo la possibilità di dare risposte */
function disattivarisposte(){
    for(const risposta of risposte){
    risposta.removeEventListener('click', segnarisposta);
}
}
function inserelementi(){
    const footer = document.querySelector('footer');
    const div = footer.querySelector('div');
    const h1 = div.querySelector('h1');
    const span = div.querySelector('span');
    h1.innerHTML = RESULTS_MAP[highConteggio()].title;
    span.innerHTML = RESULTS_MAP[highConteggio()].contents;
    footer.classList.remove('hidden');
}
function reset(){
    //resetto i valori
    insieme_valori = {};
    conteggio = {};
    for (const risposta of risposte) {
        risposta.addEventListener('click', segnarisposta);
        deselezionarisposta(risposta);
        risposta.classList.remove('transparent');
    }
    const footer = document.querySelector('footer');
    footer.classList.add('hidden');
    
}