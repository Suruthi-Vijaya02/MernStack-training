const Product=require('../models/productModel');

//create product
const createProduct=async(req,res)=>{
    try{
        const product=await Product.create(req.body);
        res.status(201).json({
            success:true,message:"Product created successfully",product});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const getAllProduct=async(req,res)=>{
    try{
        const products= await Product.find();
        res.status(200).json({
            success:true,
            count:products.length,
            message:"Products fetched successfully",
            products});
       
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

const getProductByID=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            res.status(404).json({message:"Product not found"});
        }
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message:err.message});

    }
}

const updateProduct=async(req,res)=>{
    try{const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({
        success:true,
        message:"Product updated successfully",
        product
    })}
    catch(err){
        res.status(500).json({message:err.message});
    }
}

const deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);
        if(!product){
            res.status(404).json({message:"product not found"})
        }
        res.status(200).json({
            success:true,
            message:"Product deleted",
            product
        })
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
module.exports={createProduct, getAllProduct,getProductByID,updateProduct,deleteProduct};
