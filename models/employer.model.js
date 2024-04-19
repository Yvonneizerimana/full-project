
import mongoose from 'mongoose';
 const employerModel=new mongoose.Schema({
    names:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
   
    }
 })

 export default mongoose.model("employer",employerModel);