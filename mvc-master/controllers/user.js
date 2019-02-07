var express = require('express');
var router = express.Router();

var Users = require('../models/User');

router.get('/user/:id', function(req, res){
  console.log('Request- /user/'+req.params.id);

  var u = Users.getUser(req.params.id);

  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  res.render('user_details', {user:u});
});
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
