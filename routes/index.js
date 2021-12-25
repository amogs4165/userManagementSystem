var express = require('express');
const session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.status){
    res.render('index', { title: 'Express' });
  }
  else{
    res.redirect('/signin')
  }
  
});

module.exports = router;
