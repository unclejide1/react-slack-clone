import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from '../../firebase';
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";

class Messages extends Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        messages: [],
        messagesLoading: true,
        currentUser: this.props.currentUser
    }

    componentDidMount(){
        const {channel, currentUser} = this.state;

        if(channel && currentUser){
            this.addListeners(channel.id)
        }

    }

    addListeners = channelId => {
        this.addMessageListener(channelId)
    }

    addMessageListener = channelId => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val())
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            })
        }) 
         
    }

    displayMessages = messages => (
        messages.length > 0 && messages.map(message => (
            <Message
                key ={message.timestamp}
                message = {message}
                user = {this.state.currentUser}
            />
        ))
    )
    render(){
        const {messagesRef, messages, channel, currentUser} = this.state;
        return (
            <React.Fragment>
                <MessagesHeader/>
                <Segment>
                    <Comment.Group className="messages">
                        {this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>

        <MessageForm messagesRef = {messagesRef} currentChannel ={channel} currentUser = {currentUser}/>

            </React.Fragment>
        )
    }
}

export default Messages;