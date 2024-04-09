import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
	
	MongoClient.connect('mongodb+srv://anghegabriel:parolaparola@shiftease.w0cvn0c.mongodb.net/?retryWrites=true&w=majority&appName=ShiftEase').then(client => {
		console.log('Database connection successful');
		callback(client);
	}).catch((err) => {
		console.log('Database connection failed');
	});
	
};

export default mongoConnect;