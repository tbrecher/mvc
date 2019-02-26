var express = require('express');
var router = express.Router();

var Users = require('../models/User');

router.get('/user/:id', function(req, res){
  console.log('GET Request- /user/'+req.params.id+' '+ new Date());

  Users.getUser(req.params.id, function(u){
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('user_details', {user:u});
  });

});




router.get('/user/new',function(request, response){
  console.log('Request- /new user');
  var u=User.createBlankUser();
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('user_details');

});
router.post('/user', function(request,response){
console.log("Post- new user");
User.createUser(request.body.name,request.body.password);
});


router.get('/:user/results', function(request, response){
  console.log('Request- /'+request.params.user+'/results');
    var u = Users.getUser(request.params.id);
  var user_data={
      name: request.params.user,
      weapon: request.query.weapon,
      villain: request.query.villain,
      result: request.params.result
      //villainWeapon: request.query.weapon,
    }
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('results',{user:u});
  });



//user.js method for new user and input parameters
//app.put presentation
//



router.get('/user/:id/edit', function(req, res){
  console.log('Request- /user/'+req.params.id);

  var u = Users.getUser(req.params.id);

  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  res.render('user_details', {user:u});
});

router.post('user/:id', function(req,res){
  console.log('POST Request- /user/'+req.params.id);
  console.log(req.body);
  var u={
    name: req.body.username.trim(),
    password: req.body.password.trim()
  }
})//create a user, would use put to update a user but could also use post



module.exports = router;
