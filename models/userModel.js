import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
   
    address:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    contry:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    cart:{
        type:Array,
        default:[],
    },
    temp:{
        type:Array,
        default:[],
    },
    isBlock:{
        type:Boolean,
        default:false,
    },
    buy:{
        type:Array,
        default:[],
    },
    role:{
        type:Number,
        default:0
    }

},{timestamps:true})

export default mongoose.model('users',userSchema)