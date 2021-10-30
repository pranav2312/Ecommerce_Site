const mongoose = require('mongoose')
const productschema = new mongoose.Schema({
    product_id:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    images:{
        type:Object,
         required:true
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    checked:{
        type:Boolean,
        default:false
    },
   
    sold:{
        type:Number,
        default:0
    },
    email:{
        type:String,

    },
    mobileno:{
        type:String,

    },
   

},{
    timestamps:true
})
module.exports = mongoose.model("Products",productschema)