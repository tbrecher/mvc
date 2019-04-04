var express = require('express');
var router = express.Router();

var Users = require('../models/User');
var Villain = require('../models/Villain');






router.get('/user/new',function(request, response){
  console.log('Request- /new user');
  var user=Users.createUser("new","user","blank","blank");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('user_details',{user:user});
});

router.post('/user', function(request,response){
console.log("Post- new user");
Users.createUser(request.body.name,request.body.password,request.body.firstname,request.body.lastname);
response.status(200);
response.setHeader('Content-Type', 'text/html')
response.render('index');
});


function strategy(weapon,villain){
  var counter=0;
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

function gameResult(user,weapon,villain){
  var villainWeapon = strategy(weapon,villain);
  var villainStuff={
    result:"",
    weapon:villainWeapon
  };
  Villain.getVillain(villain,function(v){
    if(villainWeapon=="rock"){
      v.rock=parseInt(v.rock)+1;
    }
    if(villainWeapon=="paper"){
      v.paper=parseInt(v.paper)+1;
    }
    if(villainWeapon=="scissor"){
      v.scissor=parseInt(v.scissor)+1;
    }
    if(villainWeapon=="rock" && weapon=="rock" || villainWeapon=="paper" && weapon=="paper" || villainWeapon=="scissors" && weapon=="scissors"){
    v.tie=parseInt(v.tie)+1;

    }
    if(villainWeapon=="rock" && weapon=="scissors" || villainWeapon=="paper" && weapon=="rock" || villainWeapon=="scissors" && weapon=="paper"){
    v.win=parseInt(v.win)+1;
    }
    if(weapon=="rock" && villainWeapon=="scissors" || weapon=="paper" && villainWeapon=="rock" || weapon=="scissors" && villainWeapon=="paper"){
    v.lose=parseInt(v.lose)+1;
    }
    console.log("RESULT"+villainStuff.result);
    console.log("WEAPON"+villainStuff.weapon);
    Villain.updateVillain(v);
  });

  Users.getUser(user,function(u){
  if(weapon=="rock"){
    u.rock=parseInt(u.rock)+1;
  }
  if(weapon=="paper"){
    u.paper=parseInt(u.paper)+1;
  }
  if(weapon=="scissor"){
    u.scissor=parseInt(u.scissor)+1;
  }
  if(villainWeapon=="rock" && weapon=="rock" || villainWeapon=="paper" && weapon=="paper" || villainWeapon=="scissors" && weapon=="scissors"){
  u.tie=parseInt(u.tie)+1;

  }
  if(villainWeapon=="rock" && weapon=="scissors" || villainWeapon=="paper" && weapon=="rock" || villainWeapon=="scissors" && weapon=="paper"){
  u.lose=parseInt(u.lose)+1;
  }
  if(weapon=="rock" && villainWeapon=="scissors" || weapon=="paper" && villainWeapon=="rock" || weapon=="scissors" && villainWeapon=="paper"){
  u.win=parseInt(u.win)+1;
  }
  Users.updateUserStats(u);
});
if(villainWeapon=="rock" && weapon=="rock" || villainWeapon=="paper" && weapon=="paper" || villainWeapon=="scissors" && weapon=="scissors"){
villainStuff.result="tie";

}
if(villainWeapon=="rock" && weapon=="scissors" || villainWeapon=="paper" && weapon=="rock" || villainWeapon=="scissors" && weapon=="paper"){
  villainStuff.result="lose";
}
if(weapon=="rock" && villainWeapon=="scissors" || weapon=="paper" && villainWeapon=="rock" || weapon=="scissors" && villainWeapon=="paper"){
    villainStuff.result="win";
}
console.log("RESULT"+villainStuff.result);
console.log("WEAPON"+villainStuff.weapon);
  return villainStuff;
}


router.get('/user/:id/results', function(request, response){
  console.log('Request- /'+request.params.id+'/results');
  var u;
  var r = gameResult(request.params.id,request.query.weapon, request.query.villain);
  var user_data={
      name: request.params.id,
      weapon: request.query.weapon,
      villain: request.query.villain,
      result: r.result,
      villainWeapon: r.weapon
    }
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('results',{u:user_data});
  });







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
    password: request.body.password.trim(),
    firstname: request.body.firstname.trim(),
    lastname:request.body.lastname.trim()
  }
  Users.updateUser(name,u.name, u.password,u.firstname,u.lastname);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

router.delete('/user/:id', function(request,response){
  var name= request.params.id;
  var u={
    name: name
  }
  Users.deleteUser(u);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});



module.exports = router;
