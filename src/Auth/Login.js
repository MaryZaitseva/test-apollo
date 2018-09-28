import React, { Component } from 'react';
import { Query, graphql } from "react-apollo";
import { compose, withHandlers, withState } from 'recompose';
import gql from "graphql-tag";
import AuthForm from './Form';
import Notification from './Notification'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
  graphql(LOGIN_MUTATION),
  withState('messageVisible', 'setMessageVisible', false),
  withState('message', 'setMessage', ''),
  withHandlers({
    handleSubmit: props => (event, values) => {
      props.mutate({ variables: values })
        .then(({ data }) => {
            if(data.login.message){ 
              showMessage(props, data.login.message)
            }
        }).catch(err => console.log('error: ' + err))
    }
  })
)

const Login = props => (
    <div>
    { props.messageVisible ? <Notification message={ props.message }/> : '' }
    <AuthForm  type='login' handleSubmit={ props.handleSubmit }/>
    </div>
);

export default enhance(Login);
