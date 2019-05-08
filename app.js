const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const app = express();

var server = require('http').createServer(app);

const {getHomePage} = require('./routes/general');
const {getGmPage, createQuest} = require('./routes/gm');
const {normalizePort} = require('./routes/function');

const port = normalizePort(process.env.PORT || '8080');

const db = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hunt',
	multipleStatements: true
});

//conectar com o bd
db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('Connected to database\n');
});

global.db = db;//global para uso do banco de dados em outros arquivos

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.port || port);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));

app.get('/', getHomePage);
app.get('/gm', getGmPage);
app.post('/gm', createQuest);

server.listen(port);