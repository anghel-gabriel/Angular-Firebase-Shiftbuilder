const express = require('express');
const PORT = "8080";

const app = express();

app.get('/', (req, res, next) => {
	console.log(req.url);
})

app.listen(PORT, ()=> {
	console.log('server started');
})
