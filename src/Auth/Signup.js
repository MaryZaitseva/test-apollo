import React, { Component } from 'react';
import { Query, graphql } from "react-apollo";
import { compose, withHandlers, withState } from 'recompose';
import gql from "graphql-tag";
import AuthForm from './Form';
import Notification from './Notification'
import 'semantic-ui-css/semantic.min.css';


const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      message 
      user{
        name 
        email
      }
    }
  }
`

const showMessage = (props, message) => {
  props.setMessageVisible(true);
  props.setMessage(message);
  setTimeout(() => props.setMessageVisible(false), 2000)
}


const enhance = compose(
  graphql(SIGNUP_MUTATION),
  withState('messageVisible', 'setMessageVisible', false),
  withState('message', 'setMessage', ''),
  withState('validFields', 'setValidFields', 0),
  withState('isFormValid', 'setFormValid', false),
  withHandlers({
    handleSubmit: props => (event, values) => {
      props.mutate({ variables: values })
        .then(({ data }) => {
            if(data.signup.message){ 
              showMessage(props, data.signup.message)
            }
        }).catch(err => console.log('error ' + err))
    },
    validateName: props => event => {
      let message;
      if(!event.target.value) message = 'Name is required';
      else {
        if(event.target.value.length > 50) message = 'Name is too long';
        else if(event.target.value.length < 2) message = 'Name is too short';
      }      
      message && showMessage(props, message); 
    },
    validateEmail: props => event => {
      let message;
      if (!event.target.value) {
        message = 'Email is required';
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
        message = 'Invalid email address';
      }
      message && showMessage(props, message); 
    },
    validatePassword: props => event => {
      let message;
      if (!event.target.value) {
        message = 'Password is required';
      } else if (event.target.value.length < 6) {
        message = 'Password must be at least 6 symbols';
      }
      message && showMessage(props, message); 
    },  
    validatePasswordConfirm: props => (event, password) => {
      let message = password == event.target.value ? '' : 'Passwords do not match';
      message && showMessage(props, message); 
    }
  })
)

const Signup = props => (
        <div>
        { props.messageVisible ? <Notification message={ props.message }/> : '' }
        <AuthForm  type='signup' 
          handleSubmit={ props.handleSubmit}  
          validateName = {props.validateName}
          validateEmail = {props.validateEmail}
          validatePassword = {props.validatePassword}
          validatePasswordConfirm = {props.validatePasswordConfirm} 
        />
        </div>
)



export default enhance(Signup);
