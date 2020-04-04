
var express = require('express');
var compression = require('compression');
var app = express();
const path = require('path');
app.use(compression());
//app.use(express.static(__dirname+'/node-modules'));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/lib'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 5000 !');
});
