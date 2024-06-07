const wordguess=document.querySelector('.word');
const hangimg=document.querySelector('.box1 img');
const guesstext=document.querySelector('.guess span');
const keyboard=document.querySelector('.keyboard');
const gameModal=document.querySelector('.game');
const playAgian=document.querySelector('.playAgain')
let currentword;
let wrong=0,correct=[];
const maxGuess=6;

// reset the game
const reset=()=>{
    correct=[];
    wrong=0;
    hangimg.src=`Media/hangman-${wrong}.svg`;
    guesstext.innerHTML=`${wrong} / 6`;
    keyboard.querySelector('button').forEach(btn=>btn.disabled=false);
    wordguess.innerHTML=currentword.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModal.classList.remove('show');
}

// selecting a random word & hint
const random=()=>{
    const{word,hint}=wordList[Math.floor(Math.random() * wordList.length)];
    currentword=word;
    console.log(word);
    document.querySelector('#hint b').innerHTML=hint;
    wordguess.innerHTML=word.split("").map(()=>`<li class="letter"></li>`).join("");
}

const gameOver=(iswon)=>{
    setTimeout(()=>{
        const modaltext= iswon? 'You found the word:':'The correct word was:';
        gameModal.querySelector('img').src=`Media/${iswon? 'Victory':'Lost'}`.gif;
        gameModal.querySelector('h4').innerHTML=`${iswon? 'Congrats!':'Game Over!'}`;
        gameModal.querySelector('p').innerHTML=`${modaltext} <b>${currentword}</b>`;
        gameModal.classList.add('show');
    },300)
}

// checking 
const initGame = (button,clicked) => {
    if(currentword.includes(clicked)){
        [...currentword].forEach((letter,index)=>{
            if(letter===clicked){
                correct.push(letter);
                wordguess.querySelectorAll('li')[index].innerHTML=letter;
                wordguess.querySelectorAll('li')[index].classList.add('guessed');
            }
        })
    }else{
        wrong++;
        hangimg.src=`Media/hangman-${wrong}.svg`;
    }
    button.disabled=true;
    guesstext.innerHTML=`${wrong} / 6`;
// EndGame
    if(wrong===maxGuess) return gameOver(false);
    if(correct.length===currentword.length) return gameOver(true);
}
// creating keyboard & event listener
for(let i=65;i<=90;i++){
    const button=document.createElement('button');
    button.innerHTML=String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener('click',(e)=>initGame(e.target,String.fromCharCode(i)));
}
random();