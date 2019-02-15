
var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client_secret.json');
// Create a document object using the ID of the spreadsheet - obtained from its URL.

var doc = new GoogleSpreadsheet('*spreadsheet ID*');

exports.getUsers=function(callback){
getAllDatabaseRows(function(users){
  callback(users);
})
}

//exports.getUserbyName=function(callback){
  //exports.getUsers(function(user_data){
  ///  for loop
        //callback(user_data)
  //}
//}
/*exports.getUser = function(user_id) {
  console.log("Users.getUser: "+user_id);

  var user = createBlankUser();
  var all_users = getAllDatabaseRows();

  for(var i=1; i<all_users.length; i++){
    var u = all_users[i].split(',');
    if(u[0].trim()==user_id.trim()){
      user={
        name:u[0].trim(),
        games_played:u[1].trim(),
        lost:u[2].trim(),
        won:u[3].trim(),
        password:u[4].trim()
      }
    }
  }
  return user;
}*/

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
    games_played:"0",
    lost:"0",
    won:"0",
  };
  //fill
}

var getAllDatabaseRows= function(callback){//parameter of function is a function
 doc.useServiceAccountAuth(creds, function (err) {
  //Get all of the rows from the spreadsheet.
   doc.getRows(1, function (err, rows) {
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
