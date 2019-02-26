var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
//this file should just be index, rules, stats, about, logout
var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.json());
app.use(express.urlencoded());

app.use(require('./controllers/user'));
var Users = require(__dirname +'/models/User');


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
            var user=Users.createBlankUser;


        var user_data={};
        user_data.name=user['name'];
        response.status(200);
        response.setHeader('Content-Type', 'text/html');
        response.render('game', {user:user_data});
  }
  });

});







app.get('/results', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('results', {user:user_data});
});

app.get('/rules', function(request, response){
  console.log('Request- rules');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('rules');
});


app.get('/stats', function(request, response){

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats',{users:userData, villains:villainData});
});

app.get('/about', function(request, response){
  console.log('Request- about');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about');
});

app.get('/play_again', function(request, response){
/*  var data=Users.allUsers;
    for(var i=0; i<data.length;i++){
          var user_data={};
          user_data.name=data[i].name;
          response.status(200);
          response.setHeader('Content-Type', 'text/html')
          response.render('game', {user:user_data});
          break;
        }
}*/
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
