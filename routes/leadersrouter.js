
const express=require('express')
const leadersrouter= express.Router();
const body=require('body-parser')
const leaderSchema=require('../models/leadersmodel')
const authenticate=require('./authenticate')

leadersrouter.route('/')
.post(authenticate.verifyuser,(req,res,next)=>{   
    leaderSchema.create(req.body)
    .then((data)=>{        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    },err=>{
        console.log(err)
    }).catch((err)=>{
        console.log(err)
    })
})
.put(authenticate.verifyuser,(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plane');
    res.send("PUT operation not suported")
})
.delete(authenticate.verifyuser,(req,res,next)=>{
     leaderSchema.remove({})
     .then((data)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
     })    
})
.get((req,res,next)=>{
    leaderSchema.find()
    .then((data)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})

leadersrouter.route('/:leaderId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.post(authenticate.verifyuser,(req,res,next)=>{    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plane');
    res.send("POST operation not suported")
})
.put(authenticate.verifyuser,(req,res,next)=>{    
    leaderSchema.findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new:true})
    .then(data=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})
.delete(authenticate.verifyuser,(req,res,next)=>{
    leaderSchema.findByIdAndRemove(req.params.leaderId)
    .then(data=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})
.get((req,res,next)=>{
    leaderSchema.findById(req.params.leaderId)
    .then(data=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})

module.exports = leadersrouter;
