import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    quntity:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('products',productSchema)