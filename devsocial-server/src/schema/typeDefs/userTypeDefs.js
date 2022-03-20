const { gql } = require('apollo-server');

const userTypeDefs = gql`
    extend type Query {
        "The hello world for user schema"
        sayHelloUser: String
        "Search for Users by text"
        searchUsers(searchInput: String!): [User!]!
    }

    type Mutation {
        "Register a new User"
        register(registerInput: RegisterInput): User!
        "Login a User"
        login(loginInput: LoginInput): User!
        "Add User to connections"
        addToConnections(username: String!): UserResponse!
    }

    type User {
        "MongoDB ID of the User"
        id: ID!
        "Username of the User"
        username: String!
        "Email of the User"
        email: String!
        "Date User is created"
        createdAt: String!
        "User connections"
        connections: [String!]
        "JWT Token generated for the User"
        token: String!
    }

    type UserResponse {
        "MongoDB ID of the User"
        id: ID!
        "Username of the User"
        username: String!
        "Email of the User"
        email: String!
        "Date User is created"
        createdAt: String!
        "User connections"
        connections: [String!]
    }

    input RegisterInput {
        "Username of the User"
        username: String!
        "Password of the User"
        password: String!
        "Repeated password of the User to validate password"
        confirmPassword: String!
        "Email of the User"
        email: String!
    } 

    input LoginInput {
        "Username of the User"
        username: String!
        "Password of the User"
        password: String!
    }
`;

module.exports = userTypeDefs;
