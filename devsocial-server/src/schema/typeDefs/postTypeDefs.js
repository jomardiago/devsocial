const { gql } = require('apollo-server');

const postTypeDefs = gql`
    extend type Query {
        "The hello world for post schema"
        sayHelloPost: String
        "Fetch all posts"
        posts: [Post!]
        "Fetch posts by User"
        postsByUser(userId: String!): [Post!]
    }

    type Mutation {
        "Creates a new Post"
        createPost(postInput: PostInput!): Post!
    }

    type Post {
        "MongoDB ID of the Post"
        id: ID!
        "Content of the Post"
        content: String!
        "User that created the Post"
        user: User!
        "Date Post is created"
        createdAt: String!
    }

    input PostInput {
        "Content of the Post"
        content: String!
    }
`;

module.exports = postTypeDefs;
