
var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client_secret.json');
// Create a document object using the ID of the spreadsheet - obtained from its URL.

var doc = new GoogleSpreadsheet('1D4cOG9jV0L0UiuK4TEYpHTGgb_tizTMk4O3Hl4VlEq4');

exports.getUser = function(user_id, callback) {
  console.log("Users.getUser: "+user_id);

  var user = createBlankUser();
  var all_users = exports.allUsers(function(rows){
    for(var i=1; i<rows.length; i++){
      if(rows[i].name.trim()==user_id.trim()){
        user={
          name:rows[i].Name.trim(),
          games_played:rows[i].gamesPlayed.trim(),
          lost:rows[i].Lost.trim(),
          won:rows[i].Won.trim(),
          password:rows[i].Password.trim()
        }
      }
    }
    callback(user);
  });
}



//exports.getUserbyName=function(callback){
  //exports.getUsers(function(user_data){
  ///  for loop
        //callback(user_data)
  //}
//}



exports.updateUser = function(user_id, new_info) {
  console.log("Users.getUser");
  var user={
    name:"test"
  };
  return user;
}

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
    scissors:"0"
  };
  doc.addRow(1,user, function(err) {
    if(err) {
      console.log(err);
    }

  });
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
    games_played:"0",
    lost:"0",
    won:"0",
    password:""
  };
  return user;
}
//callback=function meant to be called as soon as function is finished
//helps with timing, need to reorganize w callbacks to use google sheets
//dont have to worry about parsing the data
