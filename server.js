'use strict';

// подключение модулей.
var express = require('express');
var http = require('http');
var app = express();

var session = require('express-session')({
        secret: "cakeIsALie",
        resave: true,
        saveUninitialized: true
    });
var sharedsession = require('express-socket.io-session');

var bodyParser = require('body-parser');
var morgan = require("morgan");

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// подключим логгер
app.use(morgan('dev'));

// подключим body-parser для обработки тела запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// установим папку public как статическую
app.use(express.static(__dirname + '/public'));

// вьюхи
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(session);

app.get('/', function(req, res) {
  req.session.myCustomData = { userID:Math.floor(Math.random()*100) };
  res.render('index', {header : "Home page!", msg:"hello", session: req.session });
});

// запуск сервера на порту 8080
var port = process.env.PORT || 8080;
var server = app.listen(port, function(err){
  if (err) throw err;
  console.log("Started Express-server on port " + port + "..." );
});

var io = require('socket.io').listen(server);

io.use(sharedsession(session));

io.sockets.on('connection', function(socket){
    
    io.sockets.emit("init", {});
    
    socket.on("send", function(data){      
      socket.emit("message", 
        { msg: data, userID : socket.handshake.session.myCustomData.userID });  
    });
});
