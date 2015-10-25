'use strict';

// подключение модулей
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require("morgan");

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();  

// подключим логгер
app.use(morgan('dev'));

// подключим body-parser для обработки тела запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// установим папку public как статическую
app.use(express.static(__dirname + '/public'));

// порт приложения
var port = process.env.PORT || 8080;

// запуск сервера на порту 8080
app.listen(port, function(err) {
  if (err) throw err;
  console.log("Listening on port " + port + "..." );
});

exports = module.exports = app;   