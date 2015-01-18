var express = require('express.io'),
    swig = require('swig'),
    _ = require('underscore'),
    geocoder = require('geocoder');
var server = express();
server.http().io();

//Static files
server.use(express.static(__dirname + '/public'));

//Config views
server.engine('html',swig.renderFile);
server.set('view engine','html');
server.set('views',__dirname + '/app/views');

server.get('/',function(req, res){
    res.render('index');
});

server.io.route('envio',function(req){
    req.io.emit('recivo', {
        message : 'serverReady'
    });
});

//twitter
var Twitter = require('twitter');

var config = require(__dirname+'/config.json')

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

server.get('/tweet/:hashtag',function(req,res){
    //send to all users
    client.stream('statuses/filter', {track: req.params.hashtag}, function(stream) {

        stream.on('data', function(tweet) {
            if(tweet.coordinates != null){
                server.io.broadcast('loadGeo',{lng : tweet.coordinates.coordinates[0], lat : tweet.coordinates.coordinates[1]});
                console.log("COORDINATES\n****CITY: " + tweet.user.location +"\n" + "****COORD: " + tweet.coordinates.coordinates[0] +" / "+ tweet.coordinates.coordinates[1]+"\n\n");
            }else{
                if(tweet.user.location != null){
                    geocoder.geocode(tweet.user.location,function ( err, data ) {
                        try{
                            if(data.results[0] != null && data.status == 'OK'){
                                server.io.broadcast('loadGeo',{lng: data.results[0].geometry.location.lng, lat : data.results[0].geometry.location.lat});
                                console.log("LOCATION\n****CITY: " + tweet.user.location +"\n" + "****COORD: " + data.results[0].geometry.location.lng +" / "+ data.results[0].geometry.location.lat+"\n\n");
                            }
                        }catch(err){}
                    });
                }else{
                    if(tweet.place != null){
                        server.io.broadcast('loadGeo',{lng : tweet.place.bounding_box.coordinates[0], lat : tweet.place.bounding_box.coordinates[1]});
                        console.log("PLACES\n****CITY: " + tweet.user.location +"\n" + "****COORD: " + tweet.place.bounding_box.coordinates[0][0][0] +" / "+ tweet.place.bounding_box.coordinates[0][0][1]+"\n\n");
                    }else{
                        console.log("OTHER\n\n")
                    }
                }
            }
        });

    });
});

server.listen(3000);
