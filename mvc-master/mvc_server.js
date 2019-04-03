var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
//this file should just be index, rules, stats, about, logout
var app = express();
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.json());
app.use(express.urlencoded());

app.use(require('./controllers/user'));
var Users = require(__dirname +'/models/User');
var Villains = require(__dirname +'/models/Villain');

var port = 3000;
app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function(request, response){
  console.log('Request- default route');
  response.status(200);
  //Users.allUsers();
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

app.get('/login', function(request, response){
  console.log('Request- login');

  var data=Users.allUsers(function(rows){
    var new_user=true;
    for(var i=0; i<rows.length;i++){
      if(request.query.player_name==rows[i]["name"]){
        new_user=false;
        if(request.query.password==rows[i]["password"]){
          var user_data={};
          user_data.name=rows[i].name;
          response.status(200);
          response.setHeader('Content-Type', 'text/html')
          response.render('game', {user:user_data});
          break;
        }
        else{
          response.status(200);
          response.setHeader('Content-Type', 'text/html')
          response.render('error');
          break;
        }
      }
    }
    if(new_user){
      var user=Users.createUser("new","user");
      console.log(user);
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render('user_details',{user:user});
    }
  });
});

app.get('/rules', function(request, response){
  console.log('Request- rules');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('rules');
});

app.get('/stats', function(request, response){
  console.log('Request- stats');
  var allusers = [];
  var allvillains = [];
  Users.allUsers(function(allUsers){
    for(var i = 0; i <allUsers.length; i++){
      var user = {};
      user["name"] = allUsers[i].name;
      user["password"] = allUsers[i].password;
      user["gamesplayed"] = parseInt(allUsers[i].gamesplayed);
      user["win"] = parseInt(allUsers[i].win);
      user["lose"] = parseInt(allUsers[i].lose);
      user["tie"] = parseInt(allUsers[i].tie);
      user["rock"] = parseInt(allUsers[i].rock);
      user["paper"] = parseInt(allUsers[i].paper);
      user["scissor"] = parseInt(allUsers[i].scissor);
      allusers.push(user);
    }
    Villains.allVillains(function(allVillains){
      for(var i = 0; i <allVillains.length; i++){
        var villain = {};
        villain["name"] = allVillains[i].name;
        villain["gamesplayed"] = parseInt(allVillains[i].gamesplayed);
        villain["win"] = parseInt(allVillains[i].win);
        villain["lose"] = parseInt(allVillains[i].lose);
        villain["tie"] = parseInt(allVillains[i].tie);
        villain["rock"] = parseInt(allVillains[i].rock);
        villain["paper"] = parseInt(allVillains[i].paper);
        villain["scissor"] = parseInt(allVillains[i].scissor);
      //  Villains.updateVillain(user);
        allvillains.push(villain);
      }
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render('stats', {users:allusers, villains:allvillains});
    });
  });
});

app.get('/about', function(request, response){
  console.log('Request- about');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about');
});


app.get('/play_again/:id', function(request, response){
  console.log('Request- play again')
  Users.getUser(request.params.id, function(u){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('game', {user:u});
  });
});

function gameResult(weapon,villain){
  var villainWeapon = strategy(weapon,villain);
  var villainStuff = []
  if(villainWeapon=="rock" && weapon=="rock" || villainWeapon=="paper" && weapon=="paper" || villainWeapon=="scissors" && weapon=="scissors"){
    villainStuff=[villainWeapon,"tie"];
  }
  if(villainWeapon=="rock" && weapon=="scissors" || villainWeapon=="paper" && weapon=="rock" || villainWeapon=="scissors" && weapon=="paper"){
    villainStuff=[villainWeapon,"lose"];
  }
  if(weapon=="rock" && villainWeapon=="scissors" || weapon=="paper" && villainWeapon=="rock" || weapon=="scissors" && villainWeapon=="paper"){
    villainStuff=[villainWeapon,"win"];
  }
  return villainStuff;
}
