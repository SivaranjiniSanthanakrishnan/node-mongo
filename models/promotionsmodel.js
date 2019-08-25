
const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
const Currency= mongoose.Types.Currency;
const Schema = mongoose.Schema;

const promotions= new Schema({
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
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    }
},
{timestamps:true}
)

module.exports=mongoose.model('promotions',promotions)
