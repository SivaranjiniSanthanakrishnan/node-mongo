var express = require('express');
var router = express.Router();
const body= require('body-parser')
const userSchema=require('../models/usermodel')
const passport=require('passport')
const authenticate=require('../routes/authenticate')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req,res,next)=>{
 
  userSchema.register(new userSchema({username:req.body.user}), req.body.password,(err,user)=>{
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }else{      
        passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
    })
  }
})
})

router.post('/login',passport.authenticate('local'),(req,res)=>{
  var token=authenticate.createToken({'_id':req.user._id})
  console.log(token)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({status:'OK',token:token})
})

router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  //res.clearCookies('session-id')
  res.redirect('/')
})
module.exports = router;
