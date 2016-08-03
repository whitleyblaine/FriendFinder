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
    name: "Whitley Blaine",
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
  },
  {
    name: "Tito Bo Hemian",
    photo: "https://pbs.twimg.com/profile_images/83682624/TitoColore.JPG",
    scores: [
      "5",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "5",
      "1"
    ]
  },
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
  var newFriend = {};
  newFriend.name = req.body.name;
  newFriend.photo = req.body.photo;
  newFriend.scores = [req.body.q1, req.body.q2, req.body.q3, req.body.q4, req.body.q5, req.body.q6, req.body.q7, req.body.q8, req.body.q9, req.body.q10];

  console.log(req.body);

  // Calculate difference
  var differencesArr = [];
  var otherUser;
  var totalDifference;
  for (var i=0; i < friends.length; i++) {
    otherUser = friends[i];
    totalDifference = 0;
    for (var j = 0; j < otherUser.scores.length; j++) {
      var difference = Math.abs((parseInt(otherUser.scores[j]) - parseInt(newFriend.scores[j])));
      totalDifference += difference;
    };
    // console.log('total difference: ' + totalDifference);
    differencesArr.push(totalDifference);
    // console.log('differences array: ' + differencesArr);
  }
  // Compare
  var smallestDiff;
  var smallestDiffIndex;
  for (var i=0; i < differencesArr.length; i++) {
    if (i == 0) {
      smallestDiff = parseInt(differencesArr[i]);
      smallestDiffIndex = i;
    } else {
      if (parseInt(differencesArr[i]) < smallestDiff) {
        smallestDiff = parseInt(differencesArr[i]);
        smallestDiffIndex = i;
      }
    };
  }

  // console.log(smallestDiff);
  // console.log(smallestDiffIndex);
  // Push to array
  if (newFriend.name.length > 2 && newFriend.photo.length > 2 && newFriend.scores.indexOf("0") < 0 && newFriend.scores.indexOf(0) < 0) {
    friends.push(newFriend);
    res.json(friends[smallestDiffIndex]);
    console.log(res);
  } else {
    res.json({
    scores: [
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0"
    ]
  })
  };
})

app.use('/', function(req, res){
  res.sendFile(path.join(__dirname, 'app/public/home.html'));
})