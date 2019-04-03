
var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client_secret.json');
// Create a document object using the ID of the spreadsheet - obtained from its URL.

var doc = new GoogleSpreadsheet('1D4cOG9jV0L0UiuK4TEYpHTGgb_tizTMk4O3Hl4VlEq4');

exports.getUser = function(user_id, callback) {
  console.log("Users.getUser: "+user_id);
    var user = createBlankUser();
  var all_users = exports.allUsers(function(rows){
    for(var i=0; i<rows.length; i++){
      if(rows[i].name.trim()==user_id){
        console.log("SERIOUSLY"+user_id);
        user={
          name:rows[i].name.trim(),
          password:rows[i].password.trim(),
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
        console.log("user_id issues");
      }
    }
    console.log("Callback-"+user.name);
    callback(user);
  });
}



//exports.getUserbyName=function(callback){
  //exports.getUsers(function(user_data){
  ///  for loop
        //callback(user_data)
  //}
//}



exports.updateUser = function(name,user_name,password) {
  console.log("update requested"+name);
    exports.getUser(name, function(u){
    console.log("update requested2");
    exports.allUsers(function(rows){
      console.log("update requested3");
        for(var i = 0; i <rows.length; i++){
            if(rows[i].name.trim() == u.name.trim() && rows[i].password.trim() == u.password.trim()){
                   console.log(rows[i]);
                          rows[i].name = user_name;
                          rows[i].password = password;
                          if(!rows[i].freq){
                            rows[i].freq = 0;
                          }
                          rows[i].freq = JSON.parse(rows[i].freq)+1;
                rows[i].save();
              }
            }
            console.log("update complete");
  });
});
}

exports.updateUserStats = function(newU) {
  console.log("update requested"+newU.name);
//  exports.getUser(name, function(u){
    //console.log("update requested2");
    exports.allUsers(function(rows){
      console.log("update requested3");
      for(var i = 0; i <rows.length; i++){
          if(rows[i].name.trim() == newU.name.trim()){
                        rows[i].name = newU.name;
                        rows[i].gamesplayed=newU.gamesplayed;
                        rows[i].win=newU.win;
                        rows[i].lose=newU.lose;
                        rows[i].tie=newU.tie;
                        rows[i].rock=newU.rock;
                        rows[i].scissor=newU.scissor;
                        rows[i].paper=newU.paper;
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



  /*  var user={
      name:user_name,
      password: u.name,
      gamesPlayed:u.games_played,
      win:u.won,
      lose:u.lost,
      tie:u.tie,
      rock:u.rock,
      paper:u.paper,
      scissors:u.scissors
    };*/

  //fill

exports.deleteUser = function(user_id){
  //fill
}

exports.createUser = function(user_name, user_password){
  var user={
    name:user_name,
    password: user_password,
    gamesPlayed:"0",
    win:"0",
    lose:"0",
    tie:"0",
    rock:"0",
    paper:"0",
    scissor:"0"
  };
  doc.addRow(1,user, function(err) {
    if(err) {
      console.log(err);
    }

  });
  return user;
  //fill
}

exports.allUsers= function(callback){//parameter of function is a function
 doc.useServiceAccountAuth(creds, function (err) {
  //Get all of the rows from the spreadsheet.
   doc.getRows(1, function (err, rows) {
     console.log(rows[0]);
     callback(rows);
   });
 });
}


var createBlankUser= function(){
  var user={
    name:"",
    password:"",
    games_played:"0",
    lose:"0",
    win:"0",
    tie:"0",
    rock:"0",
    paper:"0",
    scissor:"0"
  };
  return user;
}


//callback=function meant to be called as soon as function is finished
//helps with timing, need to reorganize w callbacks to use google sheets
//dont have to worry about parsing the data
