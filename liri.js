
//the request npm package 
var request = require("request");
var fs = require('fs');


// Stores all of the arguments in an array
var nodeArgs = process.argv;

function createMovie(){
// Creates an empty variable for holding the movie name
var movieName = "";
// Loops through all the words in the node argument
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

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

    var movieInfo = "Title: " + info.Title + "\nYear Release: " + info.Year +
    "\nIMDB Review: " + info.imdbRating + "\nCountry: " + info.Country + 
    + "\nLanguage: " + info.Language + "\nPlot: " + info.Plot + "\nActors: "
    + info.Actors + "\nRotten Tomatos Rating: " + info.Ratings[1].Value +
    "\n----------";

    console.log(movieInfo);
  }

});

}
 createMovie();