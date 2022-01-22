const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/currenttime', function (req, res) {
	res.send('<h1>' + new Date().toISOString() + '</h1>');
}); //localhost:3000/currenttime

app.get('/', function (req, res) {
	res.send(
		'<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Send</button></form>'
	);
});

app.post('/store-user', function (req, res) {

	// The user input entered by the user, already translated (parsed) in JS code with middleware 'app.use' 
	const userName = req.body.username;

	// Defines the path: the overall path --> absolute path - tells where the file is
	// dirname/data/users.json --> cross platforms on any operating system
	const filePath = path.join(__dirname, 'data', 'users.json'); 

	// The file data interpreted as text (not JSON or JS)
	// this data must be transformed to work with it
	const fileData = fs.readFileSync(filePath);

  //The text data, that actually follows the JSON format, must be translated in a JS object or array
	// 'parse' - transforms the raw data (the text) in JS object or array
	const existingUsers = JSON.parse(fileData);

	//pushing the 'userName' into the 'existingUsers'
	existingUsers.push(userName);

	// Sync writes the file instantly 
	// 'writeFileSync' = path + userName (but username is raw data that must be transformed to be able to work with it)
	// 'writeFileSync' needs raw text, therefore, the 'existingUsers' must be transformed back into raw text
	fs.writeFileSync(filePath, JSON.stringify(existingUsers)); 

	res.send('<h1>Username stored!</h1>');
});

app.listen(3000);
