
//node packages
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

// twitter tokens and keys
 var client = new Twitter({
  consumer_key: 'W2atbmM34l9wjlU3AaEijcPQH',
  consumer_secret: '1ias3F5CMNqieJQxLiItPjVdxdWQcIe378W45FE4y8VkTyOqhp',
  access_token_key: '953091860133826561-8i7IdgZsR3a8jrOmoWhO0ZIySIjn5Sk',
  access_token_secret: 'LOuiBS0Sfiht7GyZbzQWOsnFZlIX20rN9Wlrh4NNGPfiV'
});

var nodeArgs = process.argv;


function runTwitter() {
 var params = {q: 'Rickibobbi23'};
  client.get('search/tweets', params, function(error, tweets, response) {
    if(error){
      console.log(error);
    }
    else {

    }
// going through tweets
    for (var i = 0; i < tweets.statuses.length; i++) {
    	console.log(tweets.statuses[i].text)
    }

 });

}
  
if(nodeArgs[2] == "my-tweets") {
	runTwitter();
}
else {
	console.log("NO!");
}

