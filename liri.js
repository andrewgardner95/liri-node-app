// Including npm packages
var request = require("request");
var fs = require("fs");
var twitter = require('twitter');
var spotify = require('spotify');

// the command is the third word in the terminal string
var command = process.argv[2];

// Store all of the arguments in an array
var nodeArgs = process.argv;

if (command === "my-tweets") {
	//Set up an empty array to hold the tweets.
	var results = [];

 	// storing twitter keys into a variable
 	var client = new twitter({
  		consumer_key: 'nkPsMKOGAWN75vp2NJLU1nJSb',
  		consumer_secret: 'XcjTSNhu44IJkji67Ca1i450955t7bddloAqfe3V4li3qNZNnp',
  		access_token_key: '847963513867845632-eO73nNW4EvxBSpGGZkzyH8PaVuI2LRD',
  		access_token_secret: '9QXd0AO5yq2qt3xWOPGBdh7ewTM7KKNPyXbAd4pUx6mwS',
	});

 	// passing through my twitter user name
  	var params = {
    	screen_name: 'andrew_ucsd'
  	};

  	// logging tweets from newest to oldest
  	client.get('statuses/user_timeline', params, function(error, tweets, response) {
    	if (!error) {
      		for (var i = 0; i < tweets.length; i++) {
        		results.push(tweets[i]);
        		console.log(tweets[i].text);
      		}
    	}
  	})
}

if (command === "spotify-this-song") {
	// Create an empty variable for holding the song title
	var song = '';

	// Loop through all the words in the node argument
	// And do a little for-loop magic to handle the inclusion of "+"s
	for (var i = 3; i < nodeArgs.length; i++) {
    	if (i > 3 && i < nodeArgs.length) {
    	song = song + "+" + nodeArgs[i];
  		}
  		else {
    	song += nodeArgs[i];
  		}
	}

	spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    // fetching JSON data and logging it
    var songInfo = data.tracks.items[0];
    console.log("Artist: " + songInfo.artists[0].name)
    console.log("Song: " + songInfo.name)
    console.log("Album: " + songInfo.album.name)
    console.log("Preview Link: " + songInfo.preview_url)
	});
}

if (command === "movie-this") {
	// Create an empty variable for holding the movie name
	var movie = '';

	// Loop through all the words in the node argument
	// And do a little for-loop magic to handle the inclusion of "+"s
	for (var i = 3; i < nodeArgs.length; i++) {
    	if (i > 3 && i < nodeArgs.length) {
    	movie = movie + "+" + nodeArgs[i];
  		}
  		else {
    	movie += nodeArgs[i];
  		}
	}

	// Run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true";

	request(queryUrl, function(error, response, body) {
  	// If the request is successful
  		if (!error && response.statusCode === 200) {
    		// Parse the body of the site and recover just the imdbRating
    		console.log("Title: " + JSON.parse(body).Title);
    		console.log("Year Released: " + JSON.parse(body).Year);
    		console.log("imdb Rating: " + JSON.parse(body).imdbRating);
    		console.log("Country: " + JSON.parse(body).Country);
    		console.log("Language: " + JSON.parse(body).Language);
    		console.log("Plot: " + JSON.parse(body).Plot);
    		console.log("Actors: " + JSON.parse(body).Actors);
    		console.log("RT Rating: " + JSON.parse(body).tomatoMeter);
    		console.log("RT URL: " + JSON.parse(body).tomatoURL);
  		}
	});
}

if (command === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {
		// obtaining the song name and storing it in a variable
		var autoCommand = data.split(',');
		var autoSong = autoCommand[1]

	// running the spotify search function to query I Want it That Way
	spotify.search({ type: 'track', query: autoSong }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    // fetching JSON data and logging it
    var songInfo = data.tracks.items[0];
    console.log("Artist: " + songInfo.artists[0].name)
    console.log("Song: " + songInfo.name)
    console.log("Album: " + songInfo.album.name)
    console.log("Preview Link: " + songInfo.preview_url)
	});


	});


}