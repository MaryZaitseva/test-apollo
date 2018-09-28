const { ApolloServer, gql } = require('apollo-server');
const _ = require('lodash');

const typeDefs = gql`

  type Query{
    info: String
    users: [String]
  }

  type Mutation{
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    message: String
    user: User
  }

  type User {
    id: String
    name: String
    email: String
  }
`;

let users = [{
  id: 0,
  name: 'User One',
  email: 'user1@example.com',
  password: 'hashedPassword'
}]

let idCount = 0;

const resolvers = {
  Query: {
    info: () => 'Some info',
    users: () => (users.map(item => item.name))
  },
  Mutation: {
    signup: (root, { name, email, password }) => {
      const user = { id: idCount++, name, email, password }
      users.push(user)
      return _.random(0, 1) ? {message: 'ok', user} : {message: 'not ok', user: null}
    },
    login: (root, { email, password }) => {
      const user = users.find(item => (item.email === email && item.password === password))
      return user ? {message: 'ok', user} : {message: 'not ok', user: null}
  }
}
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});