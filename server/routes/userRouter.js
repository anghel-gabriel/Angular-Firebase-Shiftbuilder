import express from 'express';
import { postAddShift } from '../controllers/shiftsController.js';

const userRouter = express.Router();

userRouter.post('/add-product', postAddShift);

export default userRouter;