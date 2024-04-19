import registerModel from '../models/registerUser.model.js'
import {validationResult} from 'express-validator'

const registerController={

    //register user
registerUser:async(req,res,next)=>{
    const errors=validationResult(req);
    try{
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
 const register=await registerModel.create(req.body)
  res.status(200).json(register)}
    catch(error){
next(error)
    }
}


}

export default registerController;

