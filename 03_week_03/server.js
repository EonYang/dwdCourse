// let port = process.env.PORT || 8300;
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var config = require('./config.js');
var db = mongojs(config.username + ':' + config.passsword + "@ds043350.mlab.com:43350/testdata01");

app.set('view engine', 'ejs');

// var posts = [];
app.listen(3000, function() {
  console.log('listening on port 3000!')
})


app.use(express.static('public'))

app.get('/postNew', function(req, res) {
  let newpost = req.query.textfield;
  db.submissions.save({
    "submissions": newpost
  }, function(err, saved) {
    if (err || !saved) {
      console.log('date didn\'t save');
    } else {
      console.log('saved to db');
    }
  })
  // posts.push(newpost);
  console.log('newpost: ' + newpost);
  res.redirect('/display')
})

app.get('/display', function(req, res) {
  db.submissions.find({}, function(err, saved) {
    if (err || !saved) {
      console.log('date didn\'t save');
    } else {
      console.log(saved);
      res.render('display.ejs', {saved:saved});
    }
  })
})
