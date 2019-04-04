
var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client_secret.json');
// Create a document object using the ID of the spreadsheet - obtained from its URL.

var doc = new GoogleSpreadsheet('1D4cOG9jV0L0UiuK4TEYpHTGgb_tizTMk4O3Hl4VlEq4');

exports.getUser = function(user_id, callback) {
  console.log("user requested Users.getUser: "+user_id+getTime());
    var user = createBlankUser();
  var all_users = exports.allUsers(function(rows){
    for(var i=0; i<rows.length; i++){
      if(rows[i].name.trim()==user_id){
        user={
          name:rows[i].name.trim(),
          password:rows[i].password.trim(),
          firstname:rows[i].firstname.trim(),
          lastname:rows[i].lastname.trim(),
          gamesplayed:rows[i].gamesplayed.trim(),
          lose:rows[i].lose.trim(),
          win:rows[i].win.trim(),
          tie:rows[i].tie.trim(),
          rock:rows[i].rock.trim(),
          paper:rows[i].paper.trim(),
          scissor:rows[i].scissor.trim(),
          created:rows[i].created.trim(),
          updated:rows[i].updated.trim()

        }
          console.log("right user");
      }
      else{
        console.log("user_id issues");
      }
    }
    console.log("Callback-"+user.name);
    callback(user);
  });
}






exports.updateUser = function(name,user_name,password,firstname,lastname) {
  console.log("Update requested Users.updateUser"+name+getTime());
    exports.getUser(name, function(u){
    exports.allUsers(function(rows){
        for(var i = 0; i <rows.length; i++){
            if(rows[i].name.trim() == u.name.trim() && rows[i].password.trim() == u.password.trim()){
                   console.log(rows[i]);
                          rows[i].name = user_name;
                          rows[i].password = password;
                          rows[i].firstname = firstname;
                          rows[i].lastname= lastname;
                          rows[i].updated=getTime();
                          if(!rows[i].freq){
                            rows[i].freq = 0;
                          }
                          rows[i].freq = JSON.parse(rows[i].freq)+1;
                rows[i].save();
              }
            }
            console.log("update complete"+getTime());
  });
});
}

exports.updateUserStats = function(newU) {
  console.log("update requested Users.updateUserStats"+newU.name+getTime());
    exports.allUsers(function(rows){
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
            console.log("update complete"+getTime());
          });
  }





exports.deleteUser = function(user){
  console.log("delete requested Users.deleteUser"+user.name+getTime());
    exports.allUsers(function(rows){
      for(var i = 0; i <rows.length; i++){
          if(rows[i].name.trim() == user.name.trim()){
                        rows[i].del();
                      }
            }
            console.log("delete complete"+getTime());
          });

}

exports.createUser = function(user_name, user_password,firstname,lastname){
  console.log("Users.createUser"+user_name+getTime());
  var user={
    name:user_name,
    password: user_password,
    firstname:firstname,
    lastname:lastname,
    gamesPlayed:"0",
    win:"0",
    lose:"0",
    tie:"0",
    rock:"0",
    paper:"0",
    scissor:"0",
    created: getTime(),
    updated: "Not Updated"
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
    firstname:"",
    lastname:"",
    games_played:"0",
    lose:"0",
    win:"0",
    tie:"0",
    rock:"0",
    paper:"0",
    scissor:"0",
    created: getTime(),
    updated: "Not Updated"
  };
  return user;
}
function getTime(){
  var today= new Date();
  var date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time=today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
  var dateTime= date+' '+time;
  return dateTime;
}


//callback=function meant to be called as soon as function is finished
//helps with timing, need to reorganize w callbacks to use google sheets
//dont have to worry about parsing the data
