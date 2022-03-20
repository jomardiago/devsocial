const { gql } = require('apollo-server');
const _ = require('lodash');

// Type Definitions
const userTypeDefs = require('./typeDefs/userTypeDefs');
const postTypeDefs = require('./typeDefs/postTypeDefs');

// Resolvers
const userResolvers = require('./resolvers/userResolvers');
const postResolvers = require('./resolvers/postResolvers');

// Base schema for common definitions
const baseSchema = gql`
    type Query {
        _empty: String
    }
`;

module.exports = {
    typeDefs: [
        baseSchema, 
        userTypeDefs,
        postTypeDefs
    ],
    resolvers: _.merge(
        {},
        userResolvers,
        postResolvers
    )
};
