var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index.html');
});

app.get('/about', function(req, res){
  res.render('about.html');
});


app.get('/projects', function(req, res){
  res.render('projects.html');
});



var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
