import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import gql from "graphql-tag";
import Navigation from './Navigation'

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const Main = () => (
  <ApolloProvider client={ client }>
	  	<Router>
	  	<div>
	  		<Navigation/>
      		<Route exact path="/" component={ Login }/>
      		<Route path="/signup" component={ Signup }/></div>
  		</Router>
  </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById("root"));