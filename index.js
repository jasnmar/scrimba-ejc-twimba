import { tweetsData } from "./data.js";

console.log(tweetsData);

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener("click", function(event) {
    console.log(tweetInput.value)
})

function getFeedHtml() {
    let feedHTML = ""
    tweetsData.forEach(tweet => {
        feedHTML += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet"></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>
        `
        
    });
    return feedHTML
}

function render() {
    const feed = document.getElementById("feed")
    feed.innerHTML = getFeedHtml()

}

render()