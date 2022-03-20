const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../validations/userValidations');
const { validateAuth } = require('../../validations/authValidations');

function generateToken({ _id, email, username }) {
    return jwt.sign({ _id, email, username }, process.env.SECRET_KEY);
};

module.exports = {
    // Queries for User Schema
    Query: {
        // Search for Users using text
        async searchUsers(_, { searchInput }) {
            try {
                const users = await User.find({ username: { '$regex': searchInput, '$options': 'i' } });
                return users;
            } catch (error) {
                console.log('Unable to search users, error encountered: ', error.message);
            }
        }
    },
    Mutation: {
        // Login a User
        async login(_, { loginInput }) {
            const { errors, valid } = validateLoginInput(loginInput);
            const { username, password } = loginInput;

            if (!valid) {
                console.log('Errors found, throwing error');
                throw new UserInputError('Errors', { errors });
            } else {
                console.log('Looking for username in DB:', username);
                const user = await User.findOne({ username });

                if (!user) {
                    console.log('User not found');
                    throw new UserInputError('User not found', { errors: {form: 'User does not exists'} });
                } else {
                    console.log('User found, comparing password');
                    const match = await bcrypt.compare(password, user.password);
                    if (match) {
                        console.log('passwords match');
                        const token = generateToken(user);
                        return { ...user._doc, id: user._id, token };
                    } else {
                        console.log('password mismatch, throwing user does not exists error');
                        throw new UserInputError('User not found', { errors: {form: 'User does not exists'} });
                    }
                }
            }
        },
        // Register a new User
        async register(_, { registerInput }) {
            let { username, email, password } = registerInput;
            const { errors, valid } = validateRegisterInput(registerInput);

            console.log('Looking for username in DB:', username);
            const user = await User.findOne({ username });

            if (user) {
                console.log('Username found, throwing error');
                throw new UserInputError('Username is taken', { errors: {username: 'This username is taken'} });
            } else if (!valid) {
                console.log('Errors found, throwing the errors:', errors);
                throw new UserInputError('Errors', { errors });
            } else {
                console.log('Registering the new user:', username);
                password = await bcrypt.hash(password, 12);
                const newUser = new User({ email, username, password, createdAt: new Date().toISOString() });
                const result = await newUser.save();
                const token = generateToken(result);
                return { ...result._doc, id: result._id, token };
            }
        },
        // Add User to connections
        async addToConnections(_, { username }, context) {
            try {
                const user = validateAuth(context);
                const loggedInUser = await User.findById(user._id);
                const userToConnect = await User.findOne({ username });
                const newConnections = loggedInUser.connections ? [...loggedInUser.connections] : [];
                newConnections.push(userToConnect._id);
                loggedInUser.connections = [...newConnections];
                const response = await loggedInUser.save();
                return { ...response._doc, id: response._doc._id };
            } catch (error) {
                console.log(`Something went wrong while adding ${username} to your connections`);
                console.log(error.message);
            }
        }
    }
};