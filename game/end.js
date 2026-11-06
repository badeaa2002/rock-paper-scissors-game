

 const gameHistory=JSON.parse(localStorage.getItem("gameHistory"))||[];
 //table
 const Table=document.getElementById("result-table");
//end button
 const endBtn=document.getElementById("End");

  
//create new row for each game
 function displayHistory(){
    gameHistory.forEach((game,index) => {
        const row=document.createElement("tr");
        row.innerHTML=`
        <td> Game ${index +1}</td>
        <td> ${game.player1}</td>
        <td> ${game.player2}</td>
        <td> ${game.rounds}</td>
        <td> ${game.player1score}</td>
        <td> ${game.player2score}</td>
        <td> ${game. Winner}</td>
         `

      Table.appendChild(row);
        
    });
 };

 //call function
 displayHistory();

//clear localstorage
 endBtn.addEventListener("click",()=>{
    localStorage.clear();
    window.location.href="../start.html";
 })

