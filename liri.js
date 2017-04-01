// grab twitter keys and store them in a variable
var twitterKeys = require("./keys.js");

// Include the request npm package
var request = require("request");
// Load the fs package to read and write
var fs = require("fs");

// the command is the third word in the terminal string
var command = process.argv[2];

// Store all of the arguments in an array
var nodeArgs = process.argv;

if (command === "my-tweets") {
	console.log("dogs");
}

if (command === "spotify-this-song") {
	console.log("cats");
}

if (command === "movie-this") {
	// Create an empty variable for holding the movie name
	var movie = '';

	for (var i = 3; i < nodeArgs.length; i++) {
    	if (i > 3 && i < nodeArgs.length) {
    	movie = movie + "+" + nodeArgs[i];
  		}
  		else {
    	movie += nodeArgs[i];
  		}
	}

	// Run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

	request(queryUrl, function(error, response, body) {
  	// If the request is successful
  		if (!error && response.statusCode === 200) {
    		// Parse the body of the site and recover just the imdbRating
    		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    		console.log("Title: " + JSON.parse(body).Title);
    		console.log("Year Released: " + JSON.parse(body).Year);
    		console.log("imdb Rating: " + JSON.parse(body).imdbRating);
    		console.log("Country: " + JSON.parse(body).Country);
    		console.log("Language: " + JSON.parse(body).Language);
    		console.log("Plot: " + JSON.parse(body).Plot);
    		console.log("Actors: " + JSON.parse(body).Actors);
    	//	console.log("RT Rating: " + JSON.parse(body).Ratings.Source);
    	//	console.log("RT URL: " + JSON.parse(body).Title);
  		}
	});
}

if (command === "do-what-it-says") {
	console.log("donkeys");
}