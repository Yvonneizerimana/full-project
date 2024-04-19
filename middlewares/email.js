import mailer from  'nodemailer'
import registerUserModel from '../models/registerUser.model'

const sendEmail=async(req,res,next) => {
    let testAccount =await nodemailer.createTestAccount();

    let transporter=await nodemailer.createTransport({
         
    })}