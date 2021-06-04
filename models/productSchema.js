const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName:{type:String,require:true},
    productPrice:{type:Number,default:0,require:true}
})

module.exports = mongoose.model('product',productSchema)