/**
 * Created by dcorns on 12/9/14.
 */
'use strict';
var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var app = express();

app.use(bodyparser.json());

app.get('/',function(req, res){
  var authHead = req.get('authorization');
  console.log(authHead);
  if(authHead) {
    if (authHead === 'Basic dGhlVXNlcjp0aGVQYXNzd29yZA==') {
      res.status(200);
      res.sendFile(__dirname + '/index.html');
    }
    else {
      res.set('WWW-Authenticate', 'Basic realm=\"Authentication Required\"');
      res.status(401);
      res.send();
    }
  }
  else{
      res.set('WWW-Authenticate', 'Basic realm=\"Authentication Required\"');
      res.status(401);
      res.send();
  }
});

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function () {
  console.log('server running on port 3000');
});