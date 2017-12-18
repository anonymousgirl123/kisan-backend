import express from 'express';
import path from 'path';
import keys from './twilioKeys';
import bodyParser from 'body-parser';
var cors = require('cors');
const app = express();
app.use(cors());
app.use('/', express.static('public'));

app.post('/sendsms', bodyParser.json(), (req, res) => {console.log("server", req.body);
  var client = require('twilio')(keys.sid, keys.token);
  client.sendMessage({
    to: '+91'+req.body.recipient,
    from: '+14024137673',
    body: req.body.message
  }, function (err, responseData) {
    if (!err) {
      //console.log("inside smslist", smsList);
      res.json({"From": responseData.from, "text": req.body, "status": 200});
    }
    else{
      res.json({"error" : "failed to send the OTP"})
    }
  });
});

app.listen(process.env.PORT || 8080);