


document.getElementById("opponentDrop").addEventListener("change",function(){
  hideAll();
  showOrNot(document.getElementById(document.getElementById("opponentDrop").value+"_waiting"), true);
})
  function hideAll(){
    var spots=document.getElementsByClassName("villain_pictures");
    for(var i=0; i<spots.length;i++){
      console.log(spots[i]);
      showOrNot(document.getElementById(spots[i].id),false);
    }
  }




///////////////////Helper function//////////////////
function updateNames(name){
  var name_spots=document.getElementsByClassName("player_name_span");
  for(var i=0; i<name_spots.length;i++){
    console.log(name_spots[i]);
    name_spots[i].innerHTML = name;
  }
}


function showOrNot(div_element, show){
  if(show && div_element.classList.contains("hidden")){
    div_element.classList.remove("hidden");
    div_element.classList.add("visible");
  }else if(!show && div_element.classList.contains("visible")){
    div_element.classList.remove("visible");
    div_element.classList.add("hidden");
    }
}

function toggleVisibility(button_element, div_element){
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
      }
  });
}
