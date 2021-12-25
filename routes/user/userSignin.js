var express = require('express');
const session = require('express-session');
const { response } = require('../../app');
var router = express.Router();
var helper = require('../../helpers/connectionHelper')

router.get('/',function(req,res,next){
    console.log(req.session.status+"hellooo");
    if(req.session.status){
        res.redirect('/')
    }
    else{

        res.render('user/userSignin',{err:req.session.loginError}) 
        req.session.loginError = false;
    }
    
})

router.post('/form',function(req,res,next){
    var userDetail=req.body;
    helper.checkUser(userDetail).then((response)=>{

        if(response.user){

        req.session.user=response.user;
        req.session.status= response.status;

            res.redirect('/')
        }
      
        else{  
               req.session.loginError = "invalid username or password";
                res.redirect('/')

        }
    })
})

router.get('/destroy',function(req,res,next){
    req.session.destroy();
    res.redirect('/signin')
})

module.exports = router;