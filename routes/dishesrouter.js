
const express=require('express')
const dishesrouter= express.Router();
const body=require('body-parser')
const dishesSchema=require('../models/dishmodel')
const authenticate= require('./authenticate')

dishesrouter.route('/')
.all((req,res,next)=>{
    next();
})
.post(authenticate.verifyuser,(req,res,next)=>{   
    dishesSchema.create(req.body)
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
    res.send(req.body)
})
.delete(authenticate.verifyuser,(req,res,next)=>{
     dishesSchema.remove({})
     .then((data)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
     })    
})
.get((req,res,next)=>{
    dishesSchema.find()
    .populate('feedback.author')
    .then((data)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})

dishesrouter.route('/:dishId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.post(authenticate.verifyuser,(req,res,next)=>{    
    var data=req.body;
    data.id=  req.params.dishId;      
    res.send(data);
    res.end();
})
.put(authenticate.verifyuser,(req,res,next)=>{    
    dishesSchema.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true})
    .then(data=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})
.delete(authenticate.verifyuser,(req,res,next)=>{
    dishesSchema.findByIdAndRemove(req.params.dishId)
    .then(data=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})
.get((req,res,next)=>{
    dishesSchema.findById(req.params.dishId)
    .then(data=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
        res.end();
    })
})


dishesrouter.route('/:dishId/feedback')
.post(authenticate.verifyuser,(req,res,next)=>{
    dishesSchema.findById(req.params.dishId)
    .then(dish=>{
        if(dish!=null){
            dish.feedback.author=req.user._id
            dish.feedback.push(req.body)
            dish.save()
            .then(data=>{
                dishesSchema.findById(data._id)
                .populate('feedback.author')
                .then(data=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data)
                    res.end();
                })
                
            })
        }else{
            Err= new Error('DishId ' +req.params.dishId+ 'not found')
            Err.status=404
            return next(Err)
        }
    })
})
.put(authenticate.verifyuser,(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plane');
    res.send("PUT operation not suported")
})
.delete(authenticate.verifyuser,(req,res,next)=>{
    dishesSchema.findById(req.params.dishId)
    .then(dish=>{
        if(dish!=null){
            for(i=0;i<dish.feedback.length;i++){
                dish.feedback.id(dish.feedback[i]._id).remove();
            }
            dish.save()
            .then(data=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.send(data)
                res.end();
            })
        }else{
            Err= new Error('DishId ' +req.params.dishId+ 'not found')
            Err.status=404
            return next(Err)
        }
    })
})
.get((req,res,next)=>{
    dishesSchema.findById(req.params.dishId)
    .populate('feedback.author')
    .then(data=>{
        if(data!=null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(data.feedback);
            res.end();
        }else{
            Err= new Error('DishId ' +req.params.dishId+ 'not found')
            Err.status=404
            return next(Err)
        }
    })
})

dishesrouter.route('/:dishId/feedback/:feedbackId')
.post(authenticate.verifyuser,(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plane');
    res.send("POST operation not suported")
})
.put(authenticate.verifyuser,(req,res,next)=>{
    dishesSchema.findById(req.params.dishId)
    .then(data=>{
        if(data!=null && data.feedback.id(req.params.feedbackId)!=null){
            data.feedback.id(req.params.feedbackId).points=req.body.points;
            data.feedback.id(req.params.feedbackId).feedback=req.body.feedback;
            data.feedback.id(req.params.feedbackId).author=req.body.author;
            
            data.save()
            .then(dish=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.send(dish);
                res.end();
            })
        }else{
            Err= new Error('DishId ' +req.params.dishId+ 'not found')
            Err.status=404
            return next(Err)
        }
    })
})
.delete(authenticate.verifyuser,(req,res,next)=>{
    dishesSchema.findById(req.params.dishId)
    .then(dish=>{
        if(dish!=null){            
            dish.feedback.id(req.params.feedbackId).remove();           
            dish.save()
            .then(data=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.send(data)
                res.end();
            })
        }else{
            Err= new Error('DishId ' +req.params.dishId+ 'not found')
            Err.status=404
            return next(Err)
        }
    })
})
.get((req,res,next)=>{
    dishesSchema.findById(req.params.dishId)
    .populate('feedback.author')
    .then(data=>{
        if(data!=null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(data.feedback.id(req.params.feedbackId));
            res.end();
        }else{
            Err= new Error('DishId ' +req.params.dishId+ 'not found')
            Err.status=404
            return next(Err)
        }
    })
})

module.exports = dishesrouter;
