import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
//console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


const tweetInput = document.getElementById("tweet-input")

document.addEventListener("click", function(event) {
    if(event.target.dataset.like) {
        handleLikeClick(event.target.dataset.like)
    } else if(event.target.dataset.retweet) {
        handleRetweetClick(event.target.dataset.retweet)
    } else if(event.target.dataset.reply) {
        handleReplyClick(event.target.dataset.reply)
    } else if(event.target.id==="tweet-btn") {
        handleTweetBtnClick(event.target)
    }

})

function handleLikeClick(tweetID) {

    const targetTweetObj = tweetsData.find(function(tweet) {
        if(tweet.uuid === tweetID) {
            if(tweet.isLiked) {
                tweet.likes--
            } else {
                tweet.likes++
            }
            tweet.isLiked = !tweet.isLiked
            render()
        }
    })

}
function handleRetweetClick(tweetID) {

    const targetTweetObj = tweetsData.find(function(tweet) {
        if(tweet.uuid === tweetID) {
            if(tweet.isRetweeted) {
                tweet.retweets--
            } else {
                tweet.retweets++
            }
            tweet.isRetweeted = !tweet.isRetweeted

            render()
        }
    })

}

function handleReplyClick(tweetID) {
    const repliesDiv = document.getElementById("replies-"+tweetID)
    if(repliesDiv.classList.contains('hidden')) {
        repliesDiv.classList.remove("hidden")
    } else {
        repliesDiv.classList.add("hidden")
    }
        
}

function handleTweetBtnClick(target) {
    const newTweet = {
        handle: '@Scrimba',
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    }

    console.log(newTweet)
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
            <div class="hidden" id="replies-${tweet.uuid}">
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