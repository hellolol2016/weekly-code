function computerPlay(){
    let play = Math.floor(Math.random()*3);
    if(play === 0){
        return ("Rock");
    } else if (play === 1){
        return ("Paper");
    } else {
        return ("Scissors");
    }
}


let pp = 0;
let cp = 0;

function round(playerSelection){
    let ps = playerSelection.trim().toLowerCase();
    let cs = computerPlay().trim().toLowerCase();
    let pwin = false;
    let cwin = false;
    if(ps === cs){
        return(`It's a tie! ${ps + " ties with " + cs}`)
    } else if(ps === "rock"){
        if(cs === "scissors"){
            pwin=true;
            pp++;
        }else if (cs === "paper") {
            cwin=true;
            cp++;
        }
    } else if(ps==="paper"){
        if(cs==="rock"){
            pwin=true;
            pp++;
        } else if (cs === "scissors") {
            cwin=true;
            cp++;
        }
    } else if(ps==="scissors"){
        if(cs==="paper"){
            pwin=true;
            pp++
        } else if (cs === "rock"){
            cwin=true;
            cp++;
        }
    }

    if(pwin){
        return(`Player wins! ${ps + " beats " + cs}`);
    } 
    if(cwin) {
        return(`Computer wins! ${cs + " beats " + ps}`);
    } 

}
const computerScore = document.querySelector('.cp');
const playerScore = document.querySelector('.pp');
const msg = document.querySelector('.msg');
const buttons = document.querySelectorAll('button');
const winMessage = document.querySelector('.winner');
const restart = document.querySelector('.restart');
buttons.forEach((button)=>{
    button.addEventListener('click',()=>{
        if(pp < 5 && cp < 5){
            msg.textContent = round(button.className);
        }
        
        playerScore.textContent = `Player: ${pp}`;
        computerScore.textContent = `Computer: ${cp}`;
        if(pp === 5 || cp === 5){
            if(cp> pp){
                winMessage.textContent = "Computer wins with 5 points!"
            }else{
                winMessage.textContent="Player wins with 5 points!"
            }
            restart.style.display = "block";
            restart.addEventListener('click',reset)
        }
    });
});

function reset(){
    cp = 0;
    pp = 0;
    playerScore.textContent = `Player:`;
    computerScore.textContent = `Computer:`;
    restart.style.display = "none";
    winMessage.textContent = ""
}