var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:timeStamp', function (req, res) {
  let date;
  if (req.params.timeStamp.includes('-')) {
    date = new Date(req.params.timeStamp.split('-'));
  } else {
    date = new Date(+req.params.timeStamp);
  }
  res.json({ unix: +date.valueOf(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(4043, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
