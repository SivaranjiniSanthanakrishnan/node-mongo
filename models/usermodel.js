const mongoose= require('mongoose')
const Schema = mongoose.Schema
const passportmongoose= require('passport-local-mongoose')
const user= new Schema({
    admin:{
        type:String,
        default:false
    }
})

user.plugin(passportmongoose)

module.exports=mongoose.model('User',user)