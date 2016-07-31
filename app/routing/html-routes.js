// Routes
app.use('/', function(req, res){
  res.send('../public/home.html');
})

app.get('/survey', function(req, res){
  res.send('../public/survey.html')
})