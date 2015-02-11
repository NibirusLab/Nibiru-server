var express = require('express.io'),
    swig = require('swig'),
    Twitter = require('twitter'),
    _ = require('underscore');
var server = express();
server.http().io();

server.set('port', (process.env.PORT || 5000));
//Static files
server.use(express.static('./public'));

//Config views
server.engine('html',swig.renderFile);
server.set('view engine','html');
server.set('views','./app/views');

//twitter
var config = require('./config.json');

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

//Map
var hashtagMap = require('./app/map/twitter');

hashtagMap(server,config,client);



server.get('/',function(req, res){
    res.render('index');
});

server.io.route('envio',function(req){
    req.io.emit('recivo', {
        message : 'serverReady'
    });
});

// server.listen(3000);
server.listen(server.get('port'), function() {
    console.log("Node app is running at localhost:" + server.get('port'));
});
