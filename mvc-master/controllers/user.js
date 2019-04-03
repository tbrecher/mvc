var express = require('express');
var router = express.Router();

var Users = require('../models/User');
var Villain = require('../models/Villain');

/*router.get('/user/:id', function(req, res){
  console.log('GET Request- /user/'+req.params.id+' '+ new Date());

  Users.getUser(req.params.id, function(u){
    console.log("get User"+u);
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('user_details', {user:u});
  });
});*/




router.get('/user/new',function(request, response){
  console.log('Request- /new user');
  var user=Users.createUser("new","user");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('user_details',{user:user});
});

router.post('/user', function(request,response){
console.log("Post- new user");
Users.createUser(request.body.name,request.body.password);
response.status(200);
response.setHeader('Content-Type', 'text/html')
response.render('index');
});


function strategy(weapon,villain){
  var random = Math.random();
  if(villain == "bones"){return "rock";}
  if(villain == "manny"){return "rock";}
  if(villain == "mr_modern"){return "paper";}
  if(villain == "harry"){return "paper";}
  if(villain == "mickey"){return "scissors";}
  if(villain == "pixie"){return "scissors";}
  if(villain == "spock"){return "scissors";}
  if(villain == "comic_hans"){
    if(weapon=="rock"){return "rock";}
    if(weapon=="paper"){return "paper";}
    if(weapon=="scissors"){return "scissors";}
  }
  if(villain == "gato"){
      if(random>0.7){return "rock";}
      else{return "paper";}
  }
  if(villain == "regal"){
      counter++;
      if(counter%3==0){return "rock";}
      if(counter%2==0 && !(counter%3==0)){return "paper";}
      else{return "scissors";}
  }
  if(villain == "the_boss"){
      if(random > 0.5){return "paper";}
      if(random<0.3){return "scissors";}
      else{return "rock";}
  }
  if(villain == "the_magician"){
      if(weapon=="rock"){return "paper";}
      if(weapon=="paper"){return "scissors";}
      if(weapon=="scissors"){return "rock";}
  }
}

function gameResult(weapon,villain){
  var villain=villain;
  var villainWeapon = strategy(weapon,villain);
  villainStuff=[]
  var result="";
  Villain.getVillain(villain,function(v){
  /*var villainStuff = {
    name:villain,
    weapon:villainWeapon,
    win:0,
    lose:0,
    tie:0,
    rock:0,
    paper:0,
    scissor:0,
    result:""
  };*/
  if(weapon="rock"){
    v.rock+=1;
  }
  if(weapon="paper"){
    v.paper+=1;
  }
  if(weapon="scissor"){
    v.scissor+=1;
  }
  if(villainWeapon=="rock" && weapon=="rock" || villainWeapon=="paper" && weapon=="paper" || villainWeapon=="scissors" && weapon=="scissors"){
    v.tie+=1;
  result="tie";

  }
  if(villainWeapon=="rock" && weapon=="scissors" || villainWeapon=="paper" && weapon=="rock" || villainWeapon=="scissors" && weapon=="paper"){
    v.win+=1;
    result="lose";
  }
  if(weapon=="rock" && villainWeapon=="scissors" || weapon=="paper" && villainWeapon=="rock" || weapon=="scissors" && villainWeapon=="paper"){
    v.lose+=1;
      result="win";
  }
  villainStuff=[result,villainWeapon];
  Villain.updateVillain(v.name);
});
  return villainStuff;
}


router.get('/user/:id/results', function(request, response){
  console.log('Request- /'+request.params.user+'/results');
  var u;
  var r = gameResult(request.query.weapon, request.query.villain);
  var user_data={
      name: request.params.id,
      weapon: request.query.weapon,
      villain: request.query.villain,
      result: r[1],
      villainWeapon: r[2]
    }
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('results',{u:user_data});
  });




//user.js method for new user and input parameters
//app.put presentation
//



router.get('/user/:id/edit', function(req, res){
  console.log('Request- /user/'+req.params.id);
  Users.getUser(req.params.id, function(u){
    console.log(u);
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('user_details', {user:u});
  });
});

router.put('/user/:id', function(request,response){
  var name= request.params.id;
  var u={
    name: request.body.name.trim(),
    password: request.body.password.trim()
  }
  Users.updateUser(name,u.name, u.password);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});



module.exports = router;
