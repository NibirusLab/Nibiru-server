var geocoder = require('geocoder');


var hashtagMap = function(server,config,client){
    //console.log('prueba');

    server.get('/tweet/:hashtag',function(req,res){
        //send to all users
        client.stream('statuses/filter', {track: req.params.hashtag}, function(stream) {
            stream.on('data', function(tweet) {
                if(tweet.coordinates != null){
                    server.io.broadcast('loadGeo',{lng : tweet.coordinates.coordinates[0], lat : tweet.coordinates.coordinates[1]});
                    //console.log("COORDINATES\n" + tweet.coordinates.coordinates[0] +"/"+ tweet.coordinates.coordinates[1]+"\n\n");
                }else if(tweet.location != null){
                        geocoder.geocode(tweet.location,function ( err, data ) {
                            try{
                                server.io.broadcast('loadGeo',{lng: data.results[0].geometry.location.lng, lat : data.results[0].geometry.location.lat});
                                //console.log("TWEET LOCATION\n" + tweet.coordinates.coordinates[0] +"/"+ tweet.coordinates.coordinates[1]+"\n\n");
                            }catch(err){
                                //console.log(err + " #" + tweet.location);
                            }
                        });
                    }else if(tweet.place != null){
                        geocoder.geocode(tweet.place.name +", "+ tweet.place.country,function ( err, data ) {
                            try{
                                server.io.broadcast('loadGeo',{lng: data.results[0].geometry.location.lng, lat : data.results[0].geometry.location.lat});
                                //console.log("PLACES 2\n" + data.results[0].geometry.location.lng+ "/" + data.results[0].geometry.location.lat+"\n\n");
                            }catch(err){
                                //console.log(err + " #" + tweet.place.full_name);
                            }
                        });
                    }else if(tweet.place != null){
                        server.io.broadcast('loadGeo',{lng : tweet.place.bounding_box.coordinates[0][0][0], lat : tweet.place.bounding_box.coordinates[0][0][1]});
                        //console.log("PLACES\n" + tweet.place.bounding_box.coordinates[0][0][0] +"/"+ tweet.place.bounding_box.coordinates[0][0][1]+"\n\n");
                    }else if(tweet.user.location != null){
                        geocoder.geocode(tweet.user.location,function ( err, data ) {
                            try{
                                server.io.broadcast('loadGeo',{lng: data.results[0].geometry.location.lng, lat : data.results[0].geometry.location.lat});
                                console.log("USER LOCATION\n: " + tweet.user.location +"\n" + "COORD: " + data.results[0].geometry.location.lng +"/"+ data.results[0].geometry.location.lat+"\n\n");
                            }catch(err){
                                //console.log(err + " @" + tweet.user.name + "\n ***PLACE*** "+tweet.user.location);
                            }
                        });
                    }

            });

        });
    });

};

module.exports = hashtagMap;
