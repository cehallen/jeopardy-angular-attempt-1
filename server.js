var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var express = require('express');
// var router = express.Router();
var fs = require('fs');
var file = "../JeopardyDatabase/jeopardy.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);


// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// POST to respond with question/answer unit from user given keyword
app.post('/quizme', function(req, res) {
  var query = req.body.keyword;
  var sqlQuery = "SELECT * FROM clue WHERE text LIKE '%" + query + "%' ORDER BY RANDOM() LIMIT 1";
  var qAndA = 'nothing to see here';
  db.serialize(function() {
    db.each(sqlQuery, function(err, row) {
      if (err) {
        console.log(err);
      } else {
        qAndA = row
      }
    });
  });
  // db.close();
  res.send(qAndA);
  // res.send(query);
});

// from showtrakr, to shunt random urls to home.  not tested
app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// var debug = require('debug')('jeopardy1'); // what does this do?
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function() {
  // debug('Express server listening on port ' + server.address().port);
  console.log('Jeopardy-ing on port ' + app.get('port'));
});


module.exports = app;
