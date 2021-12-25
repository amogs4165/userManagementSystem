var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require('mongodb');
var dataBase = require('./config/connection')
var session = require('express-session')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signinRouter = require('./routes/user/userSignin');
var signupRouter = require('./routes/user/userSignup');
var adminRouter = require('./routes/admin/adminLogin');
var adminvalidateRouter = require('./routes/admin/adminValidate');
var adminactionsRouter = require('./routes/admin/adminActions');

var app = express();

// view engine setup

app.use(session({secret:'key',cookie:{maxAge:6000000}}))

app.use((req,res,next)=>{
  res.set('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


dataBase.connect((err)=>{
  if(err){
    console.log("**DataBase Connection Failed**")
  }
  else{
    console.log("**DataBase Connected**")
  }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/admin', adminRouter);
app.use('/adminvalidate', adminvalidateRouter);
app.use('/adminaction', adminactionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
