var player_name = localStorage.getItem('player_name');
var win_count = 0;
var lose_count = 0;
var tie_count = 0;
var game_count = 0;

if(!player_name){
  showOrNot(document.getElementById("enter_name"), true);
}
else{
  updateNames();
  showOrNot(document.getElementById("throw_choice"), true);
}

document.getElementById("enter_name_button").addEventListener("click", function(){
  var p_name = document.getElementById("enter_name_input").value;
  localStorage.setItem("player_name", p_name);
  showOrNot(document.getElementById("enter_name"), false);
  showOrNot(document.getElementById("throw_choice"), true);
  updateNames(p_name);
});

function updateNames(name){
  var name_spots = document.getElementsByClassName("player_name_span");
  for(var i = 0; i<name_spots.length; i++){
    console.log(name_spots[i]);
    name_spots[i].innerHTML = name;
  }
}

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
  var player_choice = document.getElementById("player_throw_choice");
  var opponent_throw_choice = "";
  var chances = Math.random();
  var result = "";
  if(player_choice == " "){
    //add feedback that there is error ***
  }
  if(chances < 0.33){
    opponent_throw_choice = "Rock";
  }
  else if(chances < 0.66 && chances > 0.33){
    opponent_throw_choice = "Paper";
  }
  else{
    opponent_throw_choice = "Scissors";
  }
  if(opponent_throw_choice == player_choice){
    result = "You Tied. :|";
    tie_count++;
    game_count++;
  }
  else if(opponent_throw_choice == "Rock" && player_choice == "Paper"){
    result = "You Won! :)";
    win_count ++;
    game_count++;
  }
  else if(opponent_throw_choice == "Paper" && player_choice == "Scissors"){
    result = "You Won! :)";
    win_count++;
    game_count++;
  }
  else if(opponent_throw_choice == "Scissors" && player_choice == "Rock"){
    result = "You Won! :)";
    win_count ++;
    game_count++;
  }
  else if(opponent_throw_choice == "Rock" && player_choice == "Scissors"){
    result = "You Lost! :(";
    lose_count ++;
    game_count++;
  }
  else if(opponent_throw_choice == "Paper" && player_choice == "Rock"){
    result = "You Lost! :(";
    lose_count ++;
    game_count++;
  }
  else if(opponent_throw_choice == "Scissors" && player_choice == "Paper"){
    result = "You Lost! :(";
    lose_count ++;
    game_count++;
  }
  showOrNot(document.getElementById("game_results"), true);
});

makeTogglable(document.getElementById("show_rules_button"), document.getElementById("rules"));
makeTogglable(document.getElementById("show_stats_button"), document.getElementById("stats"));
function makeTogglable(button_element, div_element){
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }
    else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
    }
  });
}
