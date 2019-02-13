
var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client_secret.json');
// Create a document object using the ID of the spreadsheet - obtained from its URL.

var doc = new GoogleSpreadsheet('*spreadsheet ID*');

exports.getUser = function(user_id) {
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
}

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
  //fill
}

var getAllDatabaseRows= function(){
  doc.useServiceAccountAuth(creds, function (err) {
  // Get all of the rows from the spreadsheet.
    doc.getRows(1, function (err, rows) {
      console.log(rows);
    });
  });
}


var createBlankUser= function(){
  var user={
    name:"test",
    games_played:"test",
    lost:"test",
    won:"test",
    password:"test"
  };
  return user;
}
