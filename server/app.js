import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';

const PORT = 8080;
const ACCESS_URL = 'mongodb+srv://anghegabriel:parolaparola@shiftease.w0cvn0c.mongodb.net/?retryWrites=true&w=majority&appName=ShiftEase';
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api', userRouter);

const connectFn = async () => {
	try {
		await mongoose.connect(ACCESS_URL);
		console.log('Connected to MongoDb');
		app.listen(PORT);
		console.log('Server started');
	} catch (error) {
		console.log('Error connecting to database');
		console.log(error);
	}
};

await connectFn();