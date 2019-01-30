var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');

var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));

app.use(require('./controllers/user'));
var Users = require(__dirname +'/models/User');


var port = 3000;
app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.get('/', function(request, response){
  console.log('Request- default route');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

app.get('/login', function(request, response){
  console.log('Request- login');

  var u = Users.getUser(request.query.player_name);

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('game', {user:u});
});

app.get('/:user/results', function(request, response){
  console.log('Request- /'+request.params.user+'/results');

  var user_data={
      name: request.params.user,
      weapon: request.query.weapon
  };

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.send(JSON.stringify(user_data));
});

app.get('/rules', function(request, response){
  console.log('Request- rules');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('rules');
});

app.get('/stats', function(request, response){
  var userData = loadCSV('data/users.csv');
  var villainData = loadCSV('data/villains.csv');
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

function loadCSV(file) {
  var data = fs.readFileSync(file, "utf8"); //load csv
  var rows = data.split('\n'); //parse csv
  var info = [];
  for(var i = 0; i < rows.length; i++) {
    var user_d = rows[i].trim().split(",");
    var user = {};
    if(file == "data/users.csv" && user_d[0]){
      user["name"] = user_d[0];
      user["password"] = user_d[1];
      user["win"] = parseInt(user_d[2]);
      user["lose"] = parseInt(user_d[3]);
      user["tie"] = parseInt(user_d[4]);
      user["rock"] = parseFloat(user_d[5]);
      user["paper"] = parseFloat(user_d[6]);
      user["scissors"] = parseFloat(user_d[7]);
      user["winLoss"] = parseFloat(user_d[8]);
      info.push(user);
    } if(file == "data/villains.csv" && user_d[0]){
      user["name"] = user_d[0];
      user["win"] = parseInt(user_d[1]);
      user["lose"] = parseInt(user_d[2]);
      user["tie"] = parseInt(user_d[3]);
      user["rock"] = parseFloat(user_d[4]);
      user["paper"] = parseFloat(user_d[5]);
      user["scissors"] = parseFloat(user_d[6]);
      user["winLoss"] = parseFloat(user_d[7]);
      info.push(user);
    }
  }
  return info;
}

function writeCSV(csv_data, csv){
  var data = "";
  //sorts the villains
  csv_data.sort(function(v1,v2) {
    var v2winRatio = 0;
    if(v2.win+v2.lose+v2.tie == 0){
      v2winRatio = 0;
    }
    else{
      v2winRatio = Math.round((v2.win/v2.win+v2.lose+v2.tie)*100);
    }
    var v1winRatio = 0;
    if(v1.win+v1.lose+v1.tie == 0){
      v1winRatio = 0;
    }
    else{
      v1winRatio = Math.round((v1.win/v1.win+v1.lose+v1.tie)*100);
    }
    var diff = v2winRatio-v1winRatio
    return (diff);
  });
  for(var i=0; i<csv_data.length; i++){
    var rows = Object.keys(csv_data[i]);
    for(var j=0; j<rows.length; j++){
        if(csv_data[i][rows[j+1]]=="undefined"){
            break;
        }
        if(j == rows.length-1){
            data += csv_data[i][rows[j]];
        }
        else{
          data += csv_data[i][rows[j]]+",";
        }
    }
    if(i!=csv_data.length-1){
        data+="\n";
    }
  }
  fs.writeFile(csv,data,'utf8',function(){});
}

var counter = 0;
function strategy(weapon,villain){
  var random = Math.random();
  if(villain == "bones"){
    return "rock";
  }
  if(villain == "comic_hans"){
    if(weapon=="rock"){
      return "rock"
    }if(weapon=="paper"){
      return "paper"
    }if(weapon=="scissors"){
      return "scissors"
    }
  }
  if(villain == "gato"){
      if(random>0.7){
        return "rock"
      }
      else{
        return "paper"
      }
  }
  if(villain == "harry"){
      return "scissors";
  }
  if(villain == "manny"){
      return "rock";
  }
  if(villain == "mickey"){
      return "scissors";
  }
  if(villain == "mr_modern"){
      return "paper";
  }
  if(villain == "pixie"){
        return "scissors";
  }
  if(villain == "regal"){
      counter++;
      if(counter%3==0){
        return "rock";
      }
      if(counter%2==0 && !(counter%3==0)){
        return "paper";
      }
      else{
        return "scissors";
      }
  }
  if(villain == "spock"){
    return "scissors";
  }
  if(villain == "the_boss"){
      if(random > 0.5){
        return "paper"
      }
      if (random<0.3){
        return "scissors"
      }
      else{
        return "rock"
      }
  }
  if(villain == "the_magician"){
      if(weapon=="rock"){
        return "paper"
      }if(weapon=="paper"){
        return "scissors"
      }if(weapon=="scissors"){
        return "rock"
      }
  }
  else{
    return "rock";
  }
}
