const express = require('express')
const userSchema = require('../models/userSchema')
const productSchema = require('../models/productSchema')

const config = require('../config')
const isAdmin = require('../helpers/isAdmin')
const router = express.Router()

//get all product
router.get('/',(req,res)=>{
    productSchema.find().lean()
    .then(products => res.json(products))
    .catch(console.error)
})

//get product by Id
router.get('/:id',(req,res)=>{
    productSchema.findById(req.params.id).lean()
    .then(product => res.json(product))
    .catch(console.error)
})

//Create/Add by Admin
router.post('/',isAdmin,(req,res)=>{
    productSchema.create(req.body)
    .then(product=>res.status(201).json(product))
    .catch(err=>console.log(err))
})
//update by Admin
router.put('/:id',isAdmin,(req,res)=>{
    productSchema.findByIdAndUpdate(req.params.id,req.body,{upsert:true,new:true}).lean()
    .then(product => res.json(product))
    .catch(console.error)
})
//delete by Admin
router.delete('/:id',isAdmin,(req,res)=>{
    productSchema.findByIdAndDelete(req.params.id).lean()
    .then(() => res.json({msg:'product deleted'}))
    .catch(console.error)
})

module.exports = router