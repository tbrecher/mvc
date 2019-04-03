var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var doc = new GoogleSpreadsheet('1D4cOG9jV0L0UiuK4TEYpHTGgb_tizTMk4O3Hl4VlEq4');

exports.getVillain = function(villain_id, callback) {
  console.log("Villains.getVillain: "+villain_id);
    var villain = createBlankVillain();
  var all_villains = exports.allVillains(function(rows){
    for(var i=0; i<rows.length; i++){
      if(rows[i].name.trim()==villain_id){
        villain={
          name:rows[i].name.trim(),
          gamesplayed:rows[i].gamesplayed.trim(),
          lose:rows[i].lose.trim(),
          win:rows[i].win.trim(),
          tie:rows[i].tie.trim(),
          rock:rows[i].rock.trim(),
          paper:rows[i].paper.trim(),
          scissor:rows[i].scissor.trim()

        }
        console.log("right villain");
      }
      else{
        console.log("villain_id issues");
      }
    }
    console.log("Callback-"+villain.name);
    callback(villain);
  });
}

exports.updateVillain = function(newV) {
  console.log("update requested"+newV.name);
  //exports.getVillain(newV.name, function(v){
  //  console.log("update requested2");
    exports.allVillains(function(rows){
      console.log("update requested3");
        for(var i = 0; i <rows.length; i++){
            if(rows[i].name.trim() == newV.name.trim()){
                          rows[i].name = newV.name;
                          rows[i].gamesplayed=newV.gamesplayed;
                          rows[i].win=newV.win;
                          rows[i].lose=newV.lose;
                          rows[i].tie=newV.tie;
                          rows[i].rock=newV.rock;
                          rows[i].scissor=newV.scissor;
                          rows[i].paper=newV.paper;
                        }
                          if(!rows[i].freq){
                            rows[i].freq = 0;
                          }
                          rows[i].freq = JSON.parse(rows[i].freq)+1;
                          rows[i].save();
              }
              console.log("update complete");
            });
}


var createBlankVillain= function(){
  var villain={
    name:"",
    gamesplayed:"0",
    lose:"0",
    win:"0",
    tie:"0",
    rock:"0",
    paper:"0",
    scissor:"0"
  };
  return villain;
}

exports.allVillains= function(callback){//parameter of function is a function
 doc.useServiceAccountAuth(creds, function (err) {
  //Get all of the rows from the spreadsheet.
   doc.getRows(2, function (err, rows) {
     console.log(rows[0]);
     callback(rows);
   });
 });
}
