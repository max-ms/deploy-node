import React from 'react' 
var io = require('socket.io-client') 


const Tweet = ({userAvatarUrl, userName, tweetText}) => {
    return (
        <div className="tweet">
            <div className="left"><img src={userAvatarUrl} /></div>
            <div className="right">
                <div className="userName">{userName}</div>
                <div className="tweetText">{tweetText}</div>
            </div>    
        </div>
    )
} 

class TweetsApp extends React.Component {
    componentDidMount(){
        var socket = io();
        socket.on('data', (data) => {
            var newState = this.props.state;
            newState.tweets.push(data);
            this.setState(newState);
        })
    }

    render() {
        let key = 0;
        const tweets = this.props.state.tweets.map(t => 
            <Tweet key={key++} tweetText={t.text} userAvatarUrl={t.user.profile_image_url} userName={t.user.name} />
        );
        
        return (
            <div>
                <h1>#JavaScript</h1>
                <div className="tweets">
                {tweets}
                </div>
            </div>            
        )
    }
}

export default TweetsApp;