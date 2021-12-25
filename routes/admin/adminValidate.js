var express = require('express');
var router = express.Router();
var helper = require('../../helpers/connectionHelper')

router.post('/',function(req,res,next){
  
    adminCredential = req.body;
    helper.adminValidate(adminCredential).then((response)=>{
        if(response.status){
            req.session.admin=response.status;
            res.redirect('/admin/panel')
        }
        else{
            res.redirect('/admin')
        }
    })
    
})


module.exports = router;