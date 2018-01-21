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

var newSong = ""

for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

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
    console.log(data);

    //var songInfo = "Title: " + info.Title + "\nArtist: " + info.artist +
    //"\nAlbum: " + info.album + "\nPreviewlink: " + info.Previewlink +
    //"\n----------";

    //console.log(songInfo);
  });

