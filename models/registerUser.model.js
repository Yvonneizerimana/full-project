
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
 const registerUser=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
    type:String,
    required:true
    },
    resetToken:{
        type:String,
        
    },
    tokenExpires:{
        type:Date,
       
    }

 })

 registerUser.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    this.confirmPassword=await bcrypt.hash(this.confirmPassword,salt);
    next();
 })


 export default mongoose.model("register",registerUser);