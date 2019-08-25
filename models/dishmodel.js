
const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
const Currency= mongoose.Types.Currency;
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    points:{
        type:Number,
        min: 1,
        max: 5,
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},
{timestamps:true}
)

const dishes= new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    feedback:[feedbackSchema]
},
{timestamps:true}
)

//var dishSchema= mongoose.model('dish',dishes)

module.exports=mongoose.model('dishes',dishes)
