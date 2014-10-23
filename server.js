var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// db related
var fs = require('fs');
var file = "JeopardyDatabase/jeopardy.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
var async = require('async');
var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// POST to respond with question/answer unit from user given keyword
app.post('/api/quizme', function(req, res) {
  var query = req.body.keyword;
  var sqlQuery = "SELECT * FROM clue WHERE text LIKE '%" + query + "%' ORDER BY RANDOM() LIMIT 1";

  async.waterfall([
    function(callback) {
      var qAndA = 'nothing to see here';
      callback(null, qAndA);
    },
    function(qAndA, callback) {
      db.serialize(function() {
        db.each(sqlQuery, function(err, row) {
          if (err) {
            console.log(err);
          } else {
            qAndA = row;
            console.log(qAndA); // works √
            callback(null, qAndA);
          }
        });
      });
      // callback(null, qAndA);
    },
    function(qAndA, callback){
      console.log(qAndA);
      var sqlCategoryQuery = "SELECT * FROM category WHERE id = " + qAndA.category;
      var category = null;
      db.serialize(function() {
        db.each(sqlCategoryQuery, function(err, row) {
          if (err) {
            console.log(err);
          } else {
            category = row;
            string = category.name;
            qAndA.catName = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            callback(null, qAndA);
          }
        });
      });
    }
  ], function(err, qAndA) {
    if (err) {
      res.send(err);
    } else {
      res.send(qAndA);
    }
  });
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
