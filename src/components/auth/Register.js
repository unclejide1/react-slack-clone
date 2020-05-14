import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from '../../firebase';

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
    loading: false
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormValid = () => {
      let errors = []
      let error;
      if(this.isFormEmpty(this.state)){
          error = {message: 'Fill in all fields'};
          this.setState({errors: errors.concat(error)})
            return false;
      }
      else if(!this.isPasswordValid(this.state)){
        error = {message: 'Password is Invalid'};
        this.setState({errors: errors.concat(error)})
          return false;
      }
      else{
          return true;
      }
  }

  isFormEmpty = ({username, email, password, confirmPassword}) => {
      return !username.length || !email.length || !password.length || !confirmPassword.length
  }

  isPasswordValid = ({password, confirmPassword}) => {
      if(password.length  < 6 || confirmPassword.length < 6){
          return false
      }
      else if (password !== confirmPassword){
          return false;
      }
      else{
          return true;
      }
  }

displayErrors = errors => errors.map((error, i) => <p key = {i}>{error.message}</p>)

  hadleSubmit = event => {
    event.preventDefault();
      if(this.isFormValid()){
    this.setState({errors: [], loading: true})
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(createdUser => {
        console.log(createdUser)
        this.setState({email: '', password: '', username: '', confirmPassword: '', loading: false})
    })
    .catch(err => {
        console.error(err)
        this.setState({ errors: this.state.errors.concat(err) ,loading: false})
    })
    }
    
  }

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
  }

  render() {
      const {username, email, password, confirmPassword, errors, loading} = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="gem" color="orange" />
            Register for Dev-Connect
          </Header>
          <Form onSubmit={this.hadleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                type="text"
              />

              <Form.Input
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className = {this.handleInputError(errors, 'email')}
                type="email"
              />

              <Form.Input
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className = {this.handleInputError(errors, 'password')}
                type="password"
              />

              <Form.Input
                name="confirmPassword"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                onChange={this.handleChange}
                value={confirmPassword}
                className = {this.handleInputError(errors, 'password')}
                type="password"
              />

              <Button disabled={loading} className = {loading ? 'loading' : '' } color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
        {errors.length > 0 && (
            <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
            </Message>
        )}
          <Message>
            Already a user? <Link to="/login"> Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
