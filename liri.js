// DEPENDENCIES
// =====================================
// Read and set environment variables

require("dotenv").config();

// Import the node-spotify-api NPM package.
var spotifyRequest = require('node-spotify-api');

// Import the request npm package
var request = require("request");

var spotify = require('spotify');

var inquirer = require('inquirer');

// Import the Twitter NPM package.
var Twitter = require("twitter");

// Import the FS package for read/write.
var fs = require("fs");

// Import the API keys
var keys = require("./keys.js");

// Initialize the spotify API client using our client id and secret
var spotify = new spotifyRequest(keys.spotify);

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

 var client = new Twitter(keys.twitter);
 var params = {q: 'Rickibobbi23'};

  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
};


//Function for running a Spotify search


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

// Arguements entered into command line that pick which function to run
 if(nodeArgs[2] == "movie-this") {
  createMovie();
}
else if(nodeArgs[2] == "my-tweets") {
  runTwitter();
}
else if(nodeArgs[2] == "spotify-this-song") {
  searchSong();
};
