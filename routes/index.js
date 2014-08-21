var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = "../JeopardyDatabase/jeopardy.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);


/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  var sqlQuery
  var keyword = req.body.keyword;
  var qAndA =
});




module.exports = router;
