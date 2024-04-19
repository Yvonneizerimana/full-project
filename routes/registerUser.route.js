import express from 'express';
import registerController from '../controllers/registerUser.controller.js';
import registerUserValidator from '../middlewares/validation.js';
const registerRouter=express.Router();

registerRouter.route('/register').post(registerUserValidator,registerController.registerUser);

export default registerRouter;