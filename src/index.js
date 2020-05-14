import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';

import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class Root extends Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.history.push('/');
            }
        })
    }
render() {
return (
    
        <Switch>
            <Route exact path="/" component ={App}/>
            <Route path="/login" component ={Login}/>
            <Route path="/register" component ={Register}/>
        </Switch>
    
)
 }
}

const RootwithAuth = withRouter(Root);

ReactDOM.render(
<Router>
    <RootwithAuth />
</Router>, document.getElementById('root'));
registerServiceWorker();
