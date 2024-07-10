// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  
    const date=new Date();
    const millis = date.getTime();
    const utcString = date.toUTCString();
    res.json({unix:millis,utc:utcString});
  
});
app.get('/api/:date',function (req,res){
  const inDate=new Date(req.params.date);
  const inDateNum=new Date(Number(req.params.date));
  const date=!isNaN(inDate.getTime());
  const dateNum=!isNaN(inDateNum.getTime());
  
 if(Number(req.params.date)==req.params.date && dateNum){
    const date=new Date(Number(req.params.date));
  const millis = date.getTime();
  const utcString = date.toUTCString();
  res.json({unix:millis,utc:utcString});
  }
  else if(date){
    const date=new Date(req.params.date);
    const millis = date.getTime();
    const utcString = date.toUTCString();
    res.json({unix:millis,utc:utcString});
  }
  else{
    res.json({error : "Invalid Date"});
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
