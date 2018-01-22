//node packages

require("dotenv").config();
var spotifyRequest = require('node-spotify-api');
var request = require("request");
var spotify = require('spotify');
var inquirer = require('inquirer');
var Twitter = require("twitter");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new spotifyRequest(keys.spotify);


 var client = new Twitter({
  consumer_key: 'W2atbmM34l9wjlU3AaEijcPQH',
  consumer_secret: '1ias3F5CMNqieJQxLiItPjVdxdWQcIe378W45FE4y8VkTyOqhp',
  access_token_key: '953091860133826561-8i7IdgZsR3a8jrOmoWhO0ZIySIjn5Sk',
  access_token_secret: 'LOuiBS0Sfiht7GyZbzQWOsnFZlIX20rN9Wlrh4NNGPfiV'
});


// Stores all of the arguments in an array
var nodeArgs = process.argv;

//////Movie Function below///////

function createMovie(){
// Creates an empty variable for holding the movie name
var movieName = "";
// Loops through all the words in the node argument
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];
  }
}

// Runs a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function(error, response) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating

    var info = (JSON.parse(response.body));

    var movieInfo = "Title: " + info.Title + 
    "\nYear Release: " + info.Year +
    "\nIMDB Review: " + info.imdbRating + 
    "\nRotten Tomatos Rating: " + info.Ratings[1].Value +
    "\nCountry: " + info.Country + 
    "\nLanguage: " + info.Language + 
    "\nPlot: " + info.Plot + 
    "\nActors: " + info.Actors + 
    "\n----------";

    console.log(movieInfo);
  }

});

}


//////Twitter Function Below////////

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


/////Song Function Below/////


function searchSong() {

var newSong = ""

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    newSong = newSong + "+" + nodeArgs[i];

  }

  else {

    newSong += nodeArgs[i];
  }
}


spotify.search({ type: 'track', query: newSong, limit: 10 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
 
      var songInfo = "Artist: " + data.tracks.items[0].artists[0].name + 
      "\nSong Name: " + data.tracks.items[0].name +
      "\nPreview Link: " + data.tracks.items[0].preview_url +
      "\nAlbum: " + data.tracks.items[0].album.name +
      "\n----------";

      console.log(songInfo);
      });
};


 if(nodeArgs[2] == "movie-this") {
  createMovie();
}
else if(nodeArgs[2] == "my-tweets") {
  runTwitter();
}
else if(nodeArgs[2] == "spotify-this-song") {
  searchSong();
};
