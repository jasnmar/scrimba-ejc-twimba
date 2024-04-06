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
    } else if(event.target.dataset.retweet) {
        handleRetweetClick(event.target.dataset.retweet)
    }

})

function handleLikeClick(tweetID) {
    console.log(tweetID)
    const targetTweetObj = tweetsData.find(function(tweet) {
        if(tweet.uuid === tweetID) {
            if(tweet.isLiked) {
                tweet.likes--
            } else {
                tweet.likes++
            }
            tweet.isLiked = !tweet.isLiked
            console.log(tweet)
            render()
        }
    })

}
function handleRetweetClick(tweetID) {
    console.log(tweetID)
    const targetTweetObj = tweetsData.find(function(tweet) {
        if(tweet.uuid === tweetID) {
            if(tweet.isRetweeted) {
                tweet.retweets--
            } else {
                tweet.retweets++
            }
            tweet.isRetweeted = !tweet.isRetweeted
            console.log(tweet)
            render()
        }
    })

}

function getFeedHtml() {
    let feedHTML = ""
    tweetsData.forEach(tweet => {
        let likeIconClass = ''
        let retweetIconClass = ''

        if(tweet.isLiked) {
            likeIconClass = 'liked'
        }
        if(tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        let repliesHTML = ''

        if(tweet.replies.length>0) {
            console.log(tweet.uuid)
            tweet.replies.forEach(reply => {
                repliesHTML += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>`
            })
        }

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
                            <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div id="replies-${tweet.uuid}">
                ${repliesHTML}
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