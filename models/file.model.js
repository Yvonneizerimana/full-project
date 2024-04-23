import {model,Schema} from "mongoose";

const fileSchema=new Schema({
    filename:{
        type:String,
        required:true,
    },
    filepath:{
           type:String,
           required:true,
    }
})

export default model("files",fileSchema)