var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var request = require("request");

var keys = require("./keys.js");

var fs = require("fs");

var twit = new Twitter(keys);

var spot = new Spotify({
	id: '3e9f43ee58744483920bbc02aab61a84',
	secret: '845fb7746fe0425b94b9726ac89ce643'
})

function getArgs(){
	var title = "";
	for(var i = 3; i < process.argv.length; i++){
		title += process.argv[i] + " ";
	}
	return title;
}
function getTwit(){
	var params = {
		// values that contain keys which are twitter calls for the specific information
		user_id: 'reallyFernando', 
		count: 20
	};
	// this is an object which returns information from the twitter API
	twit.get('statuses/user_timeline', params, function(error, tweets, response) {
		// throw an error if we catch an error  
  		if (error) {
    		console.log(error);
		}
		// console loggging the information to be displayed
		console.log(tweets[0].text + " " + tweets[0].created_at);
	});

}
function getSpot(title){
	spot.search({ type: 'track', query: title }, function(err, data){
        
        var data = data.tracks.items[0];
        
        console.log(data.name); //song track name
        console.log(data.album.href); //url 
        console.log(data.album.name); //album name
        
    
        for(var j =0; j < data.artists.length; j++){
            console.log(data.artists[j].name); //artist's name
        }
    
    });

}
function getMovie(title){
	omdb.searchForMovie(title, {
  type: 'movie',
  r: 'json',
  page: 1
}).then(function(results) {
	console.log(results);
  // results is an array of movie objects
})	

}


var omdbAPI = "40e9cece";
var omdb = require('omdb-js')(omdbAPI);
// assinging the third index of process.argv to the command variable 
var command = process.argv[2];
// check wether this statement is true
if (command === "my-tweets") {
// setting the variable params as an object that contains values
	getTwit();
}else if (command === "spotify-this-song"){
	var title = "The Sign Ace of Base";
	if(process.argv[3]){
		title = getArgs();
	}
	 getSpot(title);

        
	

}else if (command === "movie-this"){
	var title = "The Matrix";
	if(process.argv[3]){
		var title = getArgs();
	}

getMovie(title);
	


}else if (command === "do-what-it-says"){

	fs.readFile('random.txt', "utf8", function(err, data){
        console.log(data);
        var temp = data.split(",");
        console.log(temp);

        if ( temp[0] === "my-tweets") {
        	getTwit();
        }
        else if (temp[0] === "spotify-this-song") {
        	getSpot(temp[1]);
        }
        else if (temp[0] === "movie-this") {
        	getMovie(temp[1]);
        }


    });

}else{
	console.log("Enter a valid command");
}







