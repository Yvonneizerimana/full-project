import {model,Schema} from "mongoose";

const imageSchema=new Schema({
    filename:{
        type:String,
        required:true,
    },
    filepath:{
           type:String,
           required:true,
    }
})

export default model("images",imageSchema)