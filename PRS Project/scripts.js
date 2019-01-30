var result = "";
var p_name;
var feedback_content = "";
var player;
var opponent;

showOrNot(document.getElementById("enter_name"), true);
showOrNot(document.getElementById("throw_choice"), false);

document.getElementById("enter_name_button").addEventListener("click", function(){
  p_name = document.getElementById("enter_name_input").value;
  player = JSON.parse(localStorage.getItem(p_name));
  if(p_name == ""){
    feedback.classList.remove("good");
    feedback.classList.add("bad");
    feedback_content = "Please Enter a Name to Continue.";
    updateFeedback();
  }
  else{
    showOrNot(document.getElementById("enter_name"), false);
    showOrNot(document.getElementById("throw_choice"), true);
    feedback.classList.remove("bad");
    feedback.classList.add("good");
    feedback_content = "Name Successfully Saved!";
    updateFeedback();
  }
  if(!player){
    opponent = {
      'name': "Opponent",
      'game_count': 0,
      'win_count': 0,
      'lose_count': 0,
      'tie_count': 0,
      'rock_count': 0,
      'paper_count': 0,
      'scissors_count': 0
    }
    player = {
      'name': p_name,
      'game_count': 0,
      'win_count': 0,
      'lose_count': 0,
      'tie_count': 0,
      'rock_count': 0,
      'paper_count': 0,
      'scissors_count': 0
    }
    localStorage.setItem(p_name,JSON.stringify(player));
    localStorage.setItem(opponent.name, JSON.stringify(opponent));
  }
  updateSpans();
});

function showOrNot(div_element, show){
  if(show && div_element.classList.contains("hidden")){
    div_element.classList.remove("hidden");
    div_element.classList.add("visible");
  }
  else if(!show && div_element.classList.contains("visible")){
    div_element.classList.remove("visible");
    div_element.classList.add("hidden");
  }
}

document.getElementById("throw_choice_button").addEventListener("click", function(){
  var player_choice = document.getElementById("player_throw_choice").value;
  var opponent_throw_choice = "";
  var chances = Math.random();
  if(player_choice == " "){
    feedback.classList.remove("good");
    feedback.classList.add("bad");
    feedback_content = "Please Choose Either Rock, Paper, or Scissors to Play.";
    updateFeedback();
  }
  else{
    if(player_choice == "Rock"){
      player.rock_count = player.rock_count+1;
    }
    else if(player_choice == "Paper"){
      player.paper_count = player.paper_count+1;
    }
    else{
      player.scissors_count = player.scissors_count+1;
    }
    localStorage.setItem(player.name,JSON.stringify(player));

    if(chances < 0.33){
      opponent_throw_choice = "Rock";
      opponent.rock_count = opponent.rock_count+1;
    }
    else if(chances < 0.66 && chances > 0.33){
      opponent_throw_choice = "Paper";
      opponent.paper_count = opponent.paper_count+1;
    }
    else{
      opponent_throw_choice = "Scissors";
      opponent.scissors_count = opponent.scissors_count+1;
    }
    localStorage.setItem(opponent.name,JSON.stringify(opponent));

    if(opponent_throw_choice == player_choice){
      result = "You Tied. :|";
      player.tie_count = player.tie_count+1;
      player.game_count = player.game_count+1;
      opponent.tie_count = opponent.tie_count+1;
      opponent.game_count = opponent.game_count+1;
      localStorage.setItem(player.name,JSON.stringify(player));
      localStorage.setItem(opponent.name,JSON.stringify(opponent));
    }
    else if(opponent_throw_choice == "Rock" && player_choice == "Paper"){
      result = "You Won! :)";
      player.win_count = player.win_count+1;
      player.game_count = player.game_count+1;
      opponent.lose_count = opponent.lose_count+1;
      opponent.game_count = opponent.game_count+1;
      localStorage.setItem(player.name,JSON.stringify(player));
      localStorage.setItem(opponent.name,JSON.stringify(opponent));
    }
    else if(opponent_throw_choice == "Paper" && player_choice == "Scissors"){
      result = "You Won! :)";
      player.win_count = player.win_count+1;
      player.game_count = player.game_count+1;
      opponent.lose_count = opponent.lose_count+1;
      opponent.game_count = opponent.game_count+1;
      localStorage.setItem(player.name,JSON.stringify(player));
      localStorage.setItem(opponent.name,JSON.stringify(opponent));
    }
    else if(opponent_throw_choice == "Scissors" && player_choice == "Rock"){
      result = "You Won! :)";
      player.win_count = player.win_count+1;
      player.game_count = player.game_count+1;
      opponent.lose_count = opponent.lose_count+1;
      opponent.game_count = opponent.game_count+1;
      localStorage.setItem(player.name,JSON.stringify(player));
      localStorage.setItem(opponent.name,JSON.stringify(opponent));
    }
    else if(opponent_throw_choice == "Rock" && player_choice == "Scissors"){
      result = "You Lost! :(";
      player.lose_count = player.lose_count+1;
      player.game_count = player.game_count+1;
      opponent.win_count = opponent.win_count+1;
      opponent.game_count = opponent.game_count+1;
      localStorage.setItem(player.name,JSON.stringify(player));
      localStorage.setItem(opponent.name,JSON.stringify(opponent));
    }
    else if(opponent_throw_choice == "Paper" && player_choice == "Rock"){
      result = "You Lost! :(";
      player.lose_count = player.lose_count+1;
      player.game_count = player.game_count+1;
      opponent.win_count = opponent.win_count+1;
      opponent.game_count = opponent.game_count+1;
      localStorage.setItem(player.name,JSON.stringify(player));
      localStorage.setItem(opponent.name,JSON.stringify(opponent));
    }
    else if(opponent_throw_choice == "Scissors" && player_choice == "Paper"){
      result = "You Lost! :(";
      player.lose_count = player.lose_count+1;
      player.game_count = player.game_count+1;
      opponent.win_count = opponent.win_count+1;
      opponent.game_count = opponent.game_count+1;
      localStorage.setItem(player.name,JSON.stringify(player));
      localStorage.setItem(opponent.name,JSON.stringify(opponent));
    }

    var results_spots = document.getElementsByClassName("result_span");
    for(var i = 0; i<results_spots.length; i++){
      results_spots[i].innerHTML=result;
    }
    var player_spots = document.getElementsByClassName("player_choice_span");
    for(var i = 0; i<player_spots.length; i++){
      player_spots[i].innerHTML=player_choice;
    }
    var opponent_spots = document.getElementsByClassName("opponent_choice_span");
    for(var i = 0; i<opponent_spots.length; i++){
      opponent_spots[i].innerHTML=opponent_throw_choice;
    }

    showOrNot(document.getElementById("game_results"), true);
    showOrNot(document.getElementById("throw_choice"), false);

    if(player_choice == "Rock"){
      var playerImageSrc = "Images/PlayerRock.jpg"
    }
    if(player_choice == "Paper"){
      var playerImageSrc = "Images/PlayerPaper.jpg"
    }
    if(player_choice == "Scissors"){
      var playerImageSrc = "Images/PlayerScissors.jpg"
    }
    var playerImageInput = document.getElementById("player_image");
    playerImageInput.src = playerImageSrc;

    if(opponent_throw_choice == "Rock"){
      var opponentImageSrc = "Images/OpponentRock.jpg"
    }
    if(opponent_throw_choice == "Paper"){
      var opponentImageSrc = "Images/OpponentPaper.jpg"
    }
    if(opponent_throw_choice == "Scissors"){
      var opponentImageSrc = "Images/OpponentScissors.jpg"
    }
    var opponentImageInput = document.getElementById("opponent_image");
    opponentImageInput.src = opponentImageSrc;

    feedback.classList.remove("bad");
    feedback.classList.add("good");
    feedback_content = player_choice + " successfully played!";
    updateFeedback();

    updateSpans();
  }
});

document.getElementById("play_again_button").addEventListener("click", function(){
  showOrNot(document.getElementById("game_results"), false);
  showOrNot(document.getElementById("throw_choice"), true);
  document.getElementById("player_throw_choice").value = " ";
});

function updateSpans(){
  var player_name_spots = document.getElementsByClassName("player_name_span");
  for(var i = 0; i<player_name_spots.length; i++){
    player_name_spots[i].innerHTML = player.name;
  }
  var game_count_spots = document.getElementsByClassName("game_count_span");
  for(var i = 0; i<game_count_spots.length; i++){
    game_count_spots[i].innerHTML = player.game_count;
  }
  var win_count_spots = document.getElementsByClassName("win_count_span");
  for(var i = 0; i<win_count_spots.length; i++){
    win_count_spots[i].innerHTML = player.win_count;
  }
  var lose_count_spots = document.getElementsByClassName("lose_count_span");
  for(var i = 0; i<lose_count_spots.length; i++){
    lose_count_spots[i].innerHTML = player.lose_count;
  }
  var tie_count_spots = document.getElementsByClassName("tie_count_span");
  for(var i = 0; i<tie_count_spots.length; i++){
    tie_count_spots[i].innerHTML = player.tie_count;
  }

  var player_rock_spots = document.getElementsByClassName("player_rock_span");
  for(var i = 0; i<player_rock_spots.length; i++){
    player_rock_spots[i].innerHTML = player.rock_count;
  }
  var player_paper_spots = document.getElementsByClassName("player_paper_span");
  for(var i = 0; i<player_paper_spots.length; i++){
    player_paper_spots[i].innerHTML = player.paper_count;
  }
  var player_scissors_spots = document.getElementsByClassName("player_scissors_span");
  for(var i = 0; i<player_scissors_spots.length; i++){
    player_scissors_spots[i].innerHTML = player.scissors_count;
  }

  var opponent_rock_spots = document.getElementsByClassName("opponent_rock_span");
  for(var i = 0; i<opponent_rock_spots.length; i++){
    opponent_rock_spots[i].innerHTML = opponent.rock_count;
  }
  var opponent_paper_spots = document.getElementsByClassName("opponent_paper_span");
  for(var i = 0; i<opponent_paper_spots.length; i++){
    opponent_paper_spots[i].innerHTML = opponent.paper_count;
  }
  var opponent_scissors_spots = document.getElementsByClassName("opponent_scissors_span");
  for(var i = 0; i<opponent_scissors_spots.length; i++){
    opponent_scissors_spots[i].innerHTML = opponent.scissors_count;
  }
}

function updateFeedback(){
  var feedback_spots = document.getElementsByClassName("feedback_span");
  for(var i = 0; i<feedback_spots.length; i++){
    feedback_spots[i].innerHTML=feedback_content;
  }
  if(feedback_spots != " "){
    showOrNot(document.getElementById("feedback"), true);
  }
  else{
    showOrNot(document.getElementById("feedback"), false);
  }
}
