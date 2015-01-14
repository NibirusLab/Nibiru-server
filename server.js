var express = require('express.io'),
    swig = require('swig');
var server = express();
server.http().io();

//Static files
server.use(express.static(__dirname + '/public'));

//Config views
server.engine('html',swig.renderFile);
server.set('view engine','html');
server.set('views',__dirname + '/app/views');

var messages = [];
var responses = [];

server.get('/',function(req, res){
    //responses.push(res);
    res.render('index');
});

server.get('/hashtag/:message',function(req, res){
    messages.push(req.params.message);

    responses.forEach(function(res){
        res.send(messages + '<script>window.location.reload()</script>');
    });

    res.send('el mensaje <b>'+ req.params.message + '</b> ha sido enviado');
});

server.listen(5000);
