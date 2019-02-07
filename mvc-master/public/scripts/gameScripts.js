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
function showOrNot(div_element, show){
  if(show && div_element.classList.contains("hidden")){
    div_element.classList.remove("hidden");
    div_element.classList.add("visible");
  }else if(!show && div_element.classList.contains("visible")){
    div_element.classList.remove("visible");
    div_element.classList.add("hidden");
    }
}
