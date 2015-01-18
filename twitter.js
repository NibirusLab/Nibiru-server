var Twitter = require('twitter');

var config = require(__dirname+'/config.json')

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});


// @see configuration above for the client variable

client.stream('statuses/filter', {track: 'barcelona'}, function(stream) {

    stream.on('data', function(tweet) {
        //console.log(tweet.text);
        console.log("****USUARIO: " + tweet.user.name +"\n\n"+ "****CITY: " + tweet.user.location +"\n\n"+"****TEXTO: "+tweet.text +"\n\n" + "****COORD: " + tweet.coordinates + tweet.geo);
    });

});
