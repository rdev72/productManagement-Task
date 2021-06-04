const mongoose = require('mongoose')
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'

const userSchema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:mongoose.SchemaTypes.Email,unique:true,require:[true,"Email required"]},
    password:{type:String,},
    role:{type:String,enum:['User','Admin'],require:true,default:'User'}
})

module.exports = mongoose.model('user',userSchema)