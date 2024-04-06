import { tweetsData } from "./data.js";

console.log(tweetsData);

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener("click", function(event) {
    console.log(tweetInput.value)
})