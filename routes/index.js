var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = "../JeopardyDatabase/jeopardy.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);



// /* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });


// POST to respond with question/answer unit from user given keyword
router.post('/quizme', function(req, res) {
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




module.exports = router;
