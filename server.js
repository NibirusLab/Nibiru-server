var express = require('express.io'),
    swig = require('swig'),
    Twitter = require('twitter'),
    _ = require('underscore');
var server = express();
server.http().io();

//Static files
server.use(express.static(__dirname + '/public'));

//Config views
server.engine('html',swig.renderFile);
server.set('view engine','html');
server.set('views',__dirname + '/app/views');

//twitter
var config = require(__dirname+'/config.json');

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

//Map
var hashtagMap = require(__dirname + '/app/map/twitter');

hashtagMap(server,config,client);



server.get('/',function(req, res){
    res.render('index');
});

server.io.route('envio',function(req){
    req.io.emit('recivo', {
        message : 'serverReady'
    });
});

server.listen(3000);
