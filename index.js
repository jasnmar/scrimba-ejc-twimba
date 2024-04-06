import { tweetsData } from "./data.js";

console.log(tweetsData);

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener("click", function(event) {
    console.log(tweetInput.value)
})

document.addEventListener("click", function(event) {
    if(event.target.dataset.like) {
        handleLikeClick(event.target.dataset.like)
    }

})

function handleLikeClick(tweetID) {
    console.log(tweetID)

}

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
                            <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
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