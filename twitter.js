//variables we need to deal with it
var enterButton = document.getElementById("enterbutt");
var username = document.getElementById("usernamee");
var tweet = document.getElementById("tweett");
var charcounter = document.getElementById("charcounterss");
var ul = document.querySelector("ul");
var i = 0;
var j = 0;
var k = 0;
var m = 0;
// var l = 0;
var tweets = [];
var tweeet = {};
// var tweets_items = [];
// var usernames_items = [];

//fuction to add values of object in array
// function addEntry($username, $tweet) {
// 	var tweet = {username: $username, tweet: $tweet}; 
// 	tweets.unshift(tweet);
// 	console.log(tweets);
// }

//fuction check if you press enter key and shift key when you write tweet and prevent the default respone when enter or not these keys
tweet.addEventListener("keypress", (e) => {
	if (e.keyCode == 13 && !e.shiftKey) {
		e.preventDefault();
		return false;
	}
});

//fuction keep track the no of tweet's char and check if equal 250 and take substring of tweet equals 250 chars if no of chars > 250
tweet.onkeyup = function () {
	var totchars = this.value.length;
	if (totchars <= 250) {
		charcounter.innerHTML = "No of Characters: " + (totchars);
	}
	else {
		charcounter.innerHTML = "No of Characters: " + (250);
		this.value = this.value.substring(0, 250);


	}
};

//fuction returns length of username
function usernameLength() {
	return username.value.length;
}

//fuction returns length of tweet
function tweetLength() {
	return tweet.value.length;
}

//present the content of newsfeed
function createTweet($username, $tweet) {
	var li = document.createElement("li");

	var usenameSpan = document.createElement("span");
	usenameSpan.innerHTML = "@" + $username;
	// localStorage.setItem("usernames_items"+[m], $username);

	var pDiv = document.createElement("div");
	pDiv.className = "ml58px";

	var p = document.createElement("p");
	p.id = "tweets_items" + [m];
	p.innerHTML = $tweet;
	// localStorage.setItem("tweets_items"+[l], $tweet);

	var retweetI = document.createElement("i");
	retweetI.classList.add("fa", "fa-retweet");

	var retweetButton = document.createElement("button");
	retweetButton.id = "retweet_Buttons" + [i];
	retweetButton.className = "retweet";
	retweetButton.appendChild(retweetI);

	var likeI = document.createElement("i");
	likeI.classList.add("fa", "fa-heart");

	var likeButton = document.createElement("button");
	likeButton.id = "like_Buttons" + [j];
	likeButton.className = "like";
	likeButton.appendChild(likeI);

	var bDiv = document.createElement("div");
	bDiv.className = "mt10px";
	bDiv.appendChild(retweetButton);
	bDiv.appendChild(likeButton);

	pDiv.appendChild(p);
	pDiv.appendChild(bDiv);

	li.innerHTML += usenameSpan.outerHTML + pDiv.outerHTML;
	ul.prepend(li); //adds li to ul
	i += 1;
	j += 1;
	k += 1;
	m+=1;
	// l+=1;

	// addEntry($username, $tweet);

	username.value = ""; //Reset text input field
	tweet.value = ""; //Reset textare field
	charcounter.innerHTML = 0;

	var retweeticon = document.getElementById("retweet_Buttons" + [i - 1]);
	var likicon = document.getElementById("like_Buttons" + [j - 1]);
	var tweetItem = document.getElementById("tweets_items" + [m - 1]);

	//retweet button handle click event listener
	retweeticon.addEventListener("click", function () {
		// createTweet(localStorage.getItem('usernames_items'+[m-1]), localStorage.getItem('tweets_items'+[l-1]));
		tweeet = {username: $username, tweet: $tweet};
        tweets.push(tweeet);
        localStorage.setItem('tweets', JSON.stringify(tweets));
	    var retrievedTweets = JSON.parse(localStorage.getItem('tweets'));
	    console.log(retrievedTweets);
	    createTweet(retrievedTweets[k].username, retrievedTweets[k].tweet);
		
	});

	//retweet button handle click event listener
	likicon.addEventListener("click", function () {
		if(tweetItem.classList.contains("tweet-color")){
			tweetItem.classList.remove("tweet-color");
		}
		else{
			tweetItem.classList.add("tweet-color");
		}
		
	});


}

//add to newsfeed
function addListAfterClick() {
	if (tweetLength() > 0 && usernameLength() > 0) { //makes sure that an empty username or empty tweet doesn't create a li
	tweeet = {username: username.value, tweet: tweet.value}; 
	// Parse the serialized data back into an aray of objects
    // tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    tweets.push(tweeet);
    // Alert the array value
    // alert(tweets);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
	var retrievedTweets = JSON.parse(localStorage.getItem('tweets'));
	console.log(retrievedTweets);
	createTweet(retrievedTweets[k].username, retrievedTweets[k].tweet);
	}
}

//submit button handle click event listener
enterButton.addEventListener("click", addListAfterClick);





