var express = require('express');
var router = express.Router();
var dishesRouter=require('./dishesrouter')
// var Mongoclient = require('mongodb').MongoClient
// const assert = require('assert')
// var url='mongodb://localhost:27017/'
// var dbname="conFusion"

// Mongoclient.connect(url,(error,client)=>{
//   const db= client.db(dbname);
//   const collection = db.collection('dishes')
//   collection.insert({"name":"Breads","description":"healthy"},(err,result)=>{
//     assert.equal(err,null)
//     console.log(result.result)
//     collection.find({}).toArray((err,data)=>{
//       assert.equal(err,null)
//      // console.log(data)
//       collection.updateOne({"name":"Breads"},{$set:{"description":"Sweet Bread"}},(err,result)=>{
//         console.log(result.result)
//         db.dropCollection('dishes',(err,res)=>{
//           assert.equal(err,null)
//           //console.log(res)          
//         })
//       })
      
//     })
//   })
// })


const mongoose= require('mongoose');
var db = 'mongodb://localhost:27017/conFusion'
//const dishesSchema=require('../models/dishmodel')
//const connect= mongoose.connect(db)

// connect.then(()=>{  
//   dishesSchema.create({
//     name:"Dosa",
//     description:"super"
//   })  

// .then(inserteddata=>{   
//   console.log('Inserted data ', inserteddata)
//   return dishesSchema.findByIdAndUpdate(inserteddata.id,{$set:{description:'nice'}}, {new:true})
// })
// .then(updateddata=>{
//   console.log(updateddata)
//   updateddata.feedback.push({
//     points:3,
//     feedback:'good',
//     author:'ranjini'
//   })
//   return updateddata.save();
// })
// .then(selecteddata=>{
//   console.log('Selected data ', selecteddata)
//   return dishesSchema.remove({})
// })
// .then(removeddata=>{
//   console.log('Removed Data ', removeddata)
// })
// })
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
