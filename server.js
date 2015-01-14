var express = require('express');
var server = express();

var messages = [];
var responses = [];

server.get('/',function(req, res){
    responses.push(res);
});

server.get('/:message',function(req, res){
    messages.push(req.params.message);

    debugger;

    responses.forEach(function(res){
        res.send(messages + '<script>window.location.reload()</script>');
    });

    res.send('el mensaje <b>'+ req.params.message + '</b> ha sido enviado');
});

server.listen(3000);
