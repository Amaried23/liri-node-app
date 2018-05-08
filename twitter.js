
//node packages
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");


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

