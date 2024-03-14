var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userApi = require('./routes/api/user');
var loginApi = require('./routes/api/login');
var ruserRouter = require('./routes/web/user');

const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const {DBHOST, DBPORT, DBNAME} = require('./config/config.js')

var app = express();

app.use(expressSession({
  bane: 'sid',
  secret: 'testing',
  saveUninitialized: false,
  resave: true,
  store: connectMongo.create({
      mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userApi);
app.use('/api', loginApi);

app.use('/', ruserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404/index')
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
