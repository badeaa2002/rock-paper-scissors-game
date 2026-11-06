
//elemnts
const singlePlayer=document.getElementById("single");
const multiPlayers=document.getElementById("multi");
const player1Input = document.getElementById("player1Name");
const player2Input = document.getElementById("player2Name");
//show choose players number screen
document.getElementById("playersNumScreen").hidden=false;

//choose mode function
function chooseMode(mode){
     document.getElementById("playersNumScreen").hidden=true;
     document.getElementById("enterScreen").hidden=false;
     //save the game mode
        const gameData = {
         gameMode:mode
     };
        //creat object in localstorage with the key gameData
        localStorage.setItem("gameData", JSON.stringify(gameData));
        // remove player 2 input filed
        if(mode==="single"){
            player2Input.style.display="none";
        }
};

//submit form
function data(){
    const gameData=JSON.parse(localStorage.getItem("gameData"));
    gameData.player1=player1Input.value;
    if(gameData.gameMode==="single"){
        gameData.player2="computer";
    }
    else if (gameData.gameMode==="multi"){
       gameData.player2=player2Input.value;
    };
 localStorage.setItem("gameData", JSON.stringify(gameData));
};

