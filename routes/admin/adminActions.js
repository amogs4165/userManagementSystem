var express = require('express')
var router = express.Router()
var helper = require('../../helpers/connectionHelper')

//--adminModify--

router.get('/usermodify/:id',function(req,res,next){
    var id = req.params.id
    helper.userDetails(id).then((response)=>{ 
        if(response){
            var user=response.userDetail
            res.render('admin/userUpdate',{user})
        }
        else{
            console.log("error occured")
        }
    })

})

router.get('/createuser',function(req,res,next){
    res.render('admin/createUser')
})

router.post('/newuser',function(req,res,next){
    var userDetails = req.body;
    helper.adminUsercreate(userDetails).then((response)=>{
        console.log(response)
        if(response){
            res.redirect('/admin/panel')
        }
        else{
            res.redirect('/admin/panel')
        }
    })
})

router.post('/userupdate/:id',function(req,res,next){
    console.log(req.params.id)
    var id = req.params.id
    console.log(id+"idddddd");
    var updatedData = req.body
    

    helper.userModify(id,updatedData).then((response)=>{
        if(response){
            res.redirect('/admin/panel')

        }
        else{
            res.redirect('/admin/panel')
        }
    })
})

router.get('/delete/:id',function(req,res,next){
    console.log(req.params.id)
    var id=req.params.id;
    helper.userDelete(id).then((response)=>{
        if(response){
            res.redirect('/admin/panel')
        }
        else{
            res.redirect('/admin/panel')
        }
    })
})

router.get('/block/:id',function(req,res,next){
    var id = req.params.id;
    helper.userBlock(id).then((response)=>{
        if(response){
            res.redirect('/admin/panel')
        }
        else{
            res.redirect('/admin/panel')
        }
    })
})

router.get('/unblock/:id',function(req,res,next){
    var id = req.params.id;
    helper.userUnblock(id).then((response)=>{
        if(response){
            res.redirect('/admin/panel')
        }
        else{
            res.redirect('/admin/panel')
        }
    })
})

module.exports = router;