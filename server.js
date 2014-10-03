var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// db related
var fs = require('fs');
var file = "../JeopardyDatabase/jeopardy.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

// async related
var async = require('async');


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
app.use(express.static(path.join(__dirname, 'public'))); //this is super important

// NOT NEEDED I THINK.  IF IT BREAKS PUT IT BACK BUT THIS WAS JUST AN EXP FROM SOME WEBSITE
// app.use(function(req, res) {
//   // Use res.sendfile, as it streams instead of reading the file into memory.
//   res.sendfile('index.html');
// });



// GET to prompt for agegate.html before passing over to frontend app
// app.get('/', function(req, res) {
//   if (!req.cookies.over21) {
//     res.sendfile('./agegate.html');
//     return
//   } else {
//     res.sendfile('index.html');
//   }
// });

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

            // var sqlCategoryQuery = "SELECT * FROM category WHERE id = " + qAndA.category;
            // var category = null;
            // db.serialize(function() {
            //   db.each(sqlCategoryQuery, function(err, row) {
            //     if(err) {
            //       console.log(err);
            //     } else {
            //       category = row;
            //       qAndA.catName = category.name.toLowerCase(); // capitalize first letter w css
            //       console.log(qAndA);
            //     }
            //   });
            //   // console.log(qAndA);
            //   // res.send(qAndA);
            // });
            // res.send(qAndA);  // *****
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
            qAndA.catName = category.name.toLowerCase();
            callback(null, qAndA);
          }
        });
      });

      // callback(null, qAndA);
    }
  ], function(err, qAndA) {
    if (err) {
      res.send(err);
    } else {
      // console.log(qAndA);
      res.send(qAndA);
    }
  });
});

// experiment inspired by http://stackoverflow.com/questions/23616485/expressjs-order-of-app-router-and-express-static
app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendfile('index.html');
});

// // from showtrakr, to shunt random urls to home.  not tested.  doesn't the .otherwise in app.js take care of this?
// app.get('*', function(req, res) {
//   res.redirect('/#' + req.originalUrl);
// });

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
