const mongoose = require("mongoose");

const productSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    }, category:{
        type:String,
        required:true,
         enum:["plants","seeds","essentials","flowers"]
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;