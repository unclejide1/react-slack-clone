import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";

class DirectMessages extends Component {
    state = {
        // user: this.props.currentUser,
        users: [],
        // channelName: '',
        // channelDetails: '',
        // activeChannel: '',
        // channnelsRef: firebase.database().ref('channels'),
        // modal: false,
        // firstLoad: true
    }
    render(){
        const {users} = this.state;
        return (
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                        <Icon name="mail"/> DIRECT MESSAGES
                    </span>{' '}
                    ({users.length}) 
                </Menu.Item>
                {/* users to send direct messages  */}

            </Menu.Menu>
        )
    }
}

export default DirectMessages;