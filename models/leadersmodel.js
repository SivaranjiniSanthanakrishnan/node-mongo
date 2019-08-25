
const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
const Currency= mongoose.Types.Currency;
const Schema = mongoose.Schema;

const leaders= new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    abbr: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    featured:{
        type: Boolean,
        default:true
    }
},
{timestamps:true}
)

module.exports=mongoose.model('leaders',leaders)
