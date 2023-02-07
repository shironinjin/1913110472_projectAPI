var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/index')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var stockRouter = require('./routes/stock')

const errorHandler = require('./middleware/errorHandle')
const passport = require('passport');

var app = express();

mongoose.connect(config.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use("/stock", stockRouter);
app.use(errorHandler)
module.exports = app;
