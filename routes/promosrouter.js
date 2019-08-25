
const express=require('express')
const promosrouter= express.Router();
const body=require('body-parser')
const promoSchema=require('../models/promotionsmodel')
const authenticate=require('./authenticate')

promosrouter.route('/')
.post(authenticate.verifyuser,(req,res,next)=>{   
    promoSchema.create(req.body)
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
     promoSchema.remove({})
     .then((data)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
     })    
})
.get((req,res,next)=>{
    promoSchema.find()
    .then((data)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})


promosrouter.route('/:promoId')
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
    promoSchema.findByIdAndUpdate(req.params.promoId,{$set:req.body},{new:true})
    .then(data=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})
.delete(authenticate.verifyuser,(req,res,next)=>{
    promoSchema.findByIdAndRemove(req.params.promoId)
    .then(data=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})
.get((req,res,next)=>{
    promoSchema.findById(req.params.promoId)
    .then(data=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})

module.exports = promosrouter;
