//node packages

require("dotenv").config();
var spotifyRequest = require('node-spotify-api');
var request = require("request");
var spotify = require('spotify');
var inquirer = require('inquirer');
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new spotifyRequest(keys.spotify);
var nodeArgs = process.argv;


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

if(nodeArgs[2] == "spotify-this-song") {
	searchSong();
}
else {
	console.log("NO!");
}


 