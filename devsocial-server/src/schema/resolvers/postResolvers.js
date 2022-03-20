const { UserInputError } = require('apollo-server');
const { validateAuth } = require('../../validations/authValidations');
const Post = require('../../models/Post');
const User = require('../../models/User');

module.exports = {
    // Queries for Post Schema
    Query: {
        // get all posts by user and connections
        async posts(_, __, context) {
            const user = validateAuth(context);

            if (user) {
                const loggedInUser = await User.findById(user._id);
                const ids = loggedInUser.connections ? [user._id, ...loggedInUser.connections] : user._id;
                const loggedInUserPosts = await Post.find({ user: ids }).sort({ createdAt: -1 });
                return loggedInUserPosts;
            }
        },
        // get all posts by user
        async postsByUser(_, { userId }, context) {
            const user = validateAuth(context);

            if (user) {
                const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
                return posts;
            }
        }
    },
    // Mutations for Post Schema
    Mutation: {
        async createPost(_, { postInput }, context) {
            const { content } = postInput;
            
            if (content.trim() === '') {
                console.log('post content is empty');
                throw new UserInputError('Errors', { content: 'Content is required' });
            }

            const user = validateAuth(context);

            if (user) {
                console.log('saving post');
                const newPost = Post({
                    content,
                    user: user._id,
                    createdAt: new Date().toISOString()
                });

                const post = await newPost.save();
                return post;
            }
        }
    },
    Post: {
        // Get the User that created the Post
        async user({ user }) {
            try {
                const response = await User.findById(user);
                return response;
            } catch (error) {
                console.log('Unable to fetch user with id:', user);
                console.log('Fetch error: ', error.message);
            }
        }
    }
};
