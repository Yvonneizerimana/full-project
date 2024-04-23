import imageModel from "../models/image.model.js";
import fileModel from "../models/file.model.js";

const images={
    image:async(req,res) => {
      try{
      if(!req.file){
        return res.status(404).json({message:" no file found"});
    }
    const imageFile=imageModel({
        filename:req.file.filename,
        filepath:req.file.path
    })

    const savedImage=await imageFile.save()
    res.status(200).json(savedImage)
      }
      catch(err){
console.log(err.message);
    }
},

files:async(req, res) => {
try{
    
}
catch(err){
  console.log(err.message);
  res.status(500).json({message:"Internal server error"});
}

}
}

export default images
