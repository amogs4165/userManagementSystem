var express = require('express');
var router = express.Router();
var helper = require('../../helpers/connectionHelper')

router.get('/',function(req,res,next){
    if(req.session.admin){
        res.redirect('/admin/panel')
    }
    else{
        res.render('admin/adminSignin')
    }    
})

router.get('/panel',function(req,res,next){

    if(req.session.admin){

        helper.getuserDetails().then((response)=>{

            console.log(response.userDetails)
            var userDetails = response.userDetails;

            res.render('admin/adminPanel',{userDetails})
        })
    }
    else{
        res.redirect('/admin')
    }
})
router.get('/destroy',function(req,res,next){
    req.session.destroy();
    res.redirect('/admin')
})

module.exports = router;