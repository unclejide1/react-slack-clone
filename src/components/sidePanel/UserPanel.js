import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import firebase from "../../firebase";

class UserPanel extends Component {

    state ={
        user: this.props.currentUser
    }

    
    dropdownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'sign-out',
            text: <span onClick={this.handleSignOut}>Sign Out</span>
        },

    ]

    handleSignOut = () =>{
        firebase
        .auth()
        .signOut()
        .then(() => console.log("signed out"));
    }
    
    render(){
        return (
            <Grid style={{background: '#4c3c4c'}}>
                <Grid.Column>
                    <Grid.Row style={{padding: '1.2em', margin: 0}}>
                        {/* app header */}
                        <Header inverted floated="left" as="h3">
                            <Icon name ="code"/>
                            <Header.Content>Dev-Connect</Header.Content>

                        </Header>
                    </Grid.Row>
                    {/* user dropdown */}
                    <Header style={{padding: '0.25em'}} as="h4" inverted>
                        <Dropdown trigger={
                            <span>{this.state.user.displayName}</span>}
                            options={this.dropdownOptions()}/>
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}


export default UserPanel;