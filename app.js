const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const mysql = require('mysql');

const app = express();

const {getLoginPage,
	   loginPlayer,
	   getHomePage,
	   getInitialPage,
	   getPlayaQuestPage} = require('./routes/general');

const {getRegisterPage,
	registerPlayer} = require('./routes/register');

const {getGmPage,
	   getQuestPage,
	   getNewAdventurePage,
	   createAdventure,
	   getNewQuestPage, 
	   createQuest} = require('./routes/gm');

const {normalizePort} = require('./routes/function');

const port = normalizePort(process.env.PORT || '8080');

//conexão com o mongodb atlas
mongoose.connect('mongodb+srv://henrique:5vxSkrK3DgyhsBh8@treasure-hunt-v6ctl.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
  	.then(() => {
    	console.log('Successfully connected to MongoDB Atlas!');
  	})
  	.catch((error) => {
    	console.log('Unable to connect to MongoDB Atlas!');
    	console.error(error);
});

//coonfigurando a aplicação
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.port || port);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));

//roteamentos

app.get('/', getHomePage);

app.post('/login', loginPlayer);
app.get('/login', getLoginPage);

app.get('/inicio', getInitialPage);

app.post('/registro', registerPlayer);
app.get('/registro', getRegisterPage);

app.get('/play/adventure-:advId/quest-:qstId', getPlayaQuestPage);

app.get('/gm', getGmPage);

app.get('/gm/quest/:id', getQuestPage);

app.get('/gm/new-adventure', getNewAdventurePage);
app.post('/gm/new-adventure', createAdventure);

app.get('/gm/new-quest/adventure-:id', getNewQuestPage);
app.post('/gm/new-quest/adventure-:id', createQuest);

app.listen(port);

/*
npm install -g nodemon

npm install --save-dev nodemon

npm config get prefix

set PATH=%PATH%;C:\Users\sakai\AppData\Roaming\npm;
*/