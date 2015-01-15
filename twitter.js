var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'ZgXsHK9NL8a0wYU289OPY2AxD',
  consumer_secret: 'W9JihvSrbQguqiB4cptzjcbHZtPq7DNRCEDIs2JcwyTtyq5Ns0',
  access_token_key: '597785489-6h2SrO4W36m5gRZyy6oHt6JseAp09Fe5qWogKtfL',
  access_token_secret: 'ht3NQRArJCCno9JL3KzAVj4qHbLhC5f324r3j3xx15XP8'
});


// @see configuration above for the client variable

client.stream('statuses/filter', {track: 'barcelona'}, function(stream) {

    stream.on('data', function(tweet) {
        //console.log(tweet.text);
        console.log("****USUARIO: " + tweet.user.name +"\n\n"+ "****TEXTO: "+tweet.text +"\n\n" + "****COORD: " + tweet.coordinates + tweet.geo);
    });

});