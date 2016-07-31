// Dependencies
// ===========================================================
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');


// Configure app to use bodyParser, allowing us to get data from a post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


var PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});
// =======
// Example friends
var friends = [

  {
    name: "Whitley Example",
    photo: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/12994575_221772898190563_919417995338863377_n.jpg?oh=fdf78295b001a89511f675df5c83c905&oe=58149CCD",
    scores: [
      "1",
      "5",
      "3",
      "4",
      "5",
      "3",
      "5",
      "3",
      "3",
      "2"
    ]
  }
];

// HTML Routes
app.get('/survey', function(req, res){
  res.sendFile(path.join(__dirname, 'app/public/survey.html'));
})


// API Routes
app.get('/api/friends', function(req, res) {
  res.json(friends);
})

app.post('/api/friends', function(req, res) {
  var newFriend = req.body;
  friends.push(newFriend);
  res.json(friends);
})

app.use('/', function(req, res){
  res.sendFile(path.join(__dirname, 'app/public/home.html'));
})

