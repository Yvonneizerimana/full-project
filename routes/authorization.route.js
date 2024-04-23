import express from 'express';
const authoRouter=express.Router();
import authoController from '../controllers/authorization.controller.js'
 import employerController from '../controllers/employer.controller.js';
import registering from '../middlewares/authoCheck.js';

authoRouter.route('/login').post(authoController.loginUser);
authoRouter.route('/forgotPassword').post(authoController.forgotPassword);
// authoRouter.route('/resetPassword').post(authoController.resetPassword);
authoRouter.post('/employer',registering,employerController.create)
authoRouter.route('/logout').get(authoController.logout);
authoRouter.route('/reset-password/:resetToken').post(authoController.changePassword);
authoRouter.route('/reset-password/:resetToken').get(authoController.resetPassword);

export default authoRouter;