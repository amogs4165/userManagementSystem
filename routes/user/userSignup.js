var express = require('express');
const session = require('express-session');
var router = express.Router();
let helpers = require('../../helpers/connectionHelper')

router.get('/',function(req,res,next){
    if(req.session.status){
        res.redirect('/')
    }
    else{
        res.render('user/userSignup')
    }
   
})



router.post('/signupForm',function(req,res,next){
    console.log(req.body);
    var userData = req.body;
    helpers.newuserData(userData).then((status)=>{
        if (status){
            res.redirect('/signin');
        }
        else{
            res.redirect('/signup');
        }
    })
   
})

module.exports = router;